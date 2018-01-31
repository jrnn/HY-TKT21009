const supertest = require("supertest")
const { app, server } = require("../index")
const api = supertest(app)
const Blog = require("../model/blog")
const listHelper = require("../util/list_helper")

let path = "/api/blogs"
let blogs = [
  {
    title : "this is the water, and this is the well",
    author : "dougie coop",
    likes : 13
  },
  {
    title : "Krabby patty appreciators",
    author : "Spengebeb Squrupunts",
    likes : 42
  },
  {
    title : "Infinite Twin Peaks theories and speculation",
    author : "dougie coop",
    likes : 31
  },
  {
    title : "Quadrupleroundhousekicking people in the face so hard they turn into doors",
    author : "Jackiechuck Channorris",
    likes : 43
  }
]

beforeAll(async () => {
  await Blog.remove()

  let blogObjects = blogs.map(b => new Blog(b))
  let blogPromise = blogObjects.map(b => b.save())

  await Promise.all(blogPromise)
})

describe("blog api GET requests", () => {

  test("blogs are returned as json", async () => {
    await api
      .get(path)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
  })

  test("all blogs are returned", async () => {
    let res = await api.get(path)
    expect(res.body.length).toBe(blogs.length)
  })

  test("specific data is found in returned collection", async () => {
    let res = await api.get(path)

    let titles = res.body.map(b => b.title)
    let authors = res.body.map(b => b.author)
    let likes = listHelper.totalLikes(res.body)

    expect(titles).toContain("Krabby patty appreciators")
    expect(authors).toContain("Jackiechuck Channorris")
    expect(likes).toBe(listHelper.totalLikes(blogs))
  })

})

describe("blog api POST requests", () => {

  test("valid blog can be posted", async () => {
    let newBlog = {
      title : "tr00news : resolutely reject fake news",
      author : "Beardy McBeardface",
      url : "https://tr00news.herokuapp.com/",
      likes : 1337
    }

    await api
      .post(path)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8")

    let res = await api.get(path)
    let authors = res.body.map(b => b.author)

    expect(res.body.length).toBe(blogs.length + 1)
    expect(authors).toContain("Beardy McBeardface")
  })

  test("if 'likes' missing, defaults to 0", async () => {
    let newBlog = {
      title : "this blog passes through even though no one likes it",
      author : "Forever McAlone",
      url : "https://tr00news.herokuapp.com/"
    }

    await api
      .post(path)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8")

    let res = await api.get(path)
    let blog = res.body.filter(b => b.author === "Forever McAlone")

    expect(blog[0].likes).toBe(0)
  })

})

afterAll(() => {
  server.close()
})
