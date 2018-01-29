const listHelper = require("../util/list_helper")

let blogs = [
  {
    id : "5a6e4f4396835953594a35a2",
    title: "this is the water, and this is the well",
    author: "dougie coop",
    url: "http://localhost:3003/api/blogs",
    likes: 13
  },
  {
    id: "5a6e57ea9fb74e62b9ccea28",
    title: "Krabby patty appreciators",
    author: "Spengebeb Squrupunts",
    url: "http://localhost:3003/api/blogs",
    likes: 42
  },
  {
  id: "5a6e665ea930976ccd9649e5",
  title: "Infinite Twin Peaks theories and speculation",
  author: "dougie coop",
  url: "http://localhost:3003/api/blogs",
  likes: 31
  }
]

describe("dummy", () => {

  test("dummy is called", () => {
    let result = listHelper.dummy([])
    expect(result).toBe(1)
  })

})

describe("totalLikes", () => {

  test("of empty list is zero", () => {
    let result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test("of one is the value itself", () => {
    let result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(blogs[0].likes)
  })

  test("of many is calculated right", () => {
    let result = listHelper.totalLikes(blogs)
    expect(result).toBe(86)
  })

})

describe("favoriteBlog", () => {

  test("of empty list is undefined", () => {
    let result = listHelper.favoriteBlog([])
    expect(result).toEqual(undefined)
  })

  test("returns the blog itself from list of one", () => {
    let result = listHelper.favoriteBlog([blogs[2]])
    expect(result).toEqual(blogs[2])    
  })

  test("returns correct blog from list of many", () => {
    let result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[1])
  })

})

describe("mostLikes", () => {

  test("of empty list is null : 0", () => {
    let result = listHelper.mostBlogs([])
    expect(result).toEqual(
      {
        author : null,
        blogs : 0
      }
    )
  })

  test("of list of one is <author> : 1", () => {
    let result = listHelper.mostBlogs([blogs[1]])
    expect(result).toEqual(
      {
        author : "Spengebeb Squrupunts",
        blogs : 1
      }
    )
  })

  test("returns correct author from list of many", () => {
    let result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(
      {
        author : "dougie coop",
        blogs : 2
      }
    )
  })

})
