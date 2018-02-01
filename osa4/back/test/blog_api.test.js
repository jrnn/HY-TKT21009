const supertest = require("supertest")
const { app, server } = require("../index")
const api = supertest(app)
const Blog = require("../model/blog")
const listHelper = require("../util/list_helper")
const testHelper = require("./test_helper")
const path = "/api/blogs"

describe("given that there are blogs in database", async() => {

  beforeAll(async () => {
    await Blog.remove()
    let blogs = testHelper.initialBlogs.map(b => new Blog(b))
    await Promise.all(blogs.map(b => b.save()))
  })

  describe(`GET ${path}`, async() => {

    test("returns those blogs as json", async () => {
      let blogsInDb = await testHelper.findAll()

      let res = await api
        .get(path)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")

      let titles = res.body.map(b => b.title)
      let authors = res.body.map(b => b.author)
      let likes = listHelper.totalLikes(res.body)

      expect(res.body.length).toBe(blogsInDb.length)
      expect(likes).toBe(listHelper.totalLikes(blogsInDb))
      blogsInDb.forEach(b => {
        expect(titles).toContain(b.title)
        expect(authors).toContain(b.author)
      })
    })
  })

  describe(`GET ${path}/:id`, async () => {

    test("with valid id returns individual blog as json", async () => {
      expect(1).toBe(1)
    })

    test("with nonexisting id returns 404", async () => {
      expect(1).toBe(1)
    })

    test("with invalid id returns 400", async () => {
      expect(1).toBe(1)
    })
  })

  describe(`DELETE ${path}/:id`, async () => {

    test("with valid id deletes ONLY the blog in question", async () => {
      expect(1).toBe(1)
    })

    test("with invalid id nonetheless returns 204", async () => {
      expect(1).toBe(1)
    })
  })
})

describe("regardless of what is in database", async () => {

  describe(`POST ${path}`, async () => {

    test("succeeds with valid input, returning newly added blog as json", async () => {
      let blogsBefore = await testHelper.findAll()
      let newBlog = testHelper.getRandom()

      await api
        .post(path)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", "application/json; charset=utf-8")

      let blogsAfter = await testHelper.findAll()
      let titles = blogsAfter.map(b => b.title)
      let authors = blogsAfter.map(b => b.author)

      expect(blogsAfter.length).toBe(blogsBefore.length + 1)
      expect(titles).toContain(newBlog.title)
      expect(authors).toContain(newBlog.author)
    })

    test("succeeds even if 'likes' missing (defaults to 0)", async () => {
      let newBlog = testHelper.getRandom()
      delete newBlog.likes

      await api
        .post(path)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", "application/json; charset=utf-8")

      let blogsInDb = await testHelper.findAll()
      let blog = blogsInDb.filter(b => b.author === newBlog.author)[0]

      expect(blog.title).toEqual(newBlog.title)
      expect(blog.likes).toBe(0)
    })

    test("fails if 'title', 'author' or 'url' missing, returning 400", async () => {
      let blogsBefore = await testHelper.findAll()

      testHelper.invalidBlogs
        .forEach(async (b) => {
          await api
            .post(path)
            .send(b)
            .expect(400)
      })

      let blogsAfter = await testHelper.findAll()
      expect(blogsAfter.length).toBe(blogsBefore.length)
    })
  })
})

afterAll(() => {
  server.close()
})
