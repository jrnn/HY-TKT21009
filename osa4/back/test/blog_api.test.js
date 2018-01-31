const supertest = require("supertest")
const { app, server } = require("../index")
const api = supertest(app)
const Blog = require("../model/blog")
const listHelper = require("../util/list_helper")

let blogs = [
  {
    title: "this is the water, and this is the well",
    author: "dougie coop",
    likes: 13
  },
  {
    title: "Krabby patty appreciators",
    author: "Spengebeb Squrupunts",
    likes: 42
  },
  {
    title: "Infinite Twin Peaks theories and speculation",
    author: "dougie coop",
    likes: 31
  },
  {
    title: "Quadrupleroundhousekicking people in the face so hard they turn into doors",
    author: "Jackiechuck Channorris",
    likes: 43
  }
]

beforeAll(async () => {
  await Blog.remove()

  let blogObjects = blogs.map(b => new Blog(b))
  let blogPromise = blogObjects.map(b => b.save())

  await Promise.all(blogPromise)
})

describe("blog api GET requests", () => {

  let path = "/api/blogs"

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

afterAll(() => {
  server.close()
})
