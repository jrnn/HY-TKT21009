const listHelper = require("../util/list_helper")

let blogs = [
  {
    id : "5a6e4f4396835953594a35a2",
    title: "this is the water, and this is the well",
    author: "dougie coop",
    likes: 13
  },
  {
    id: "5a6e57ea9fb74e62b9ccea28",
    title: "Krabby patty appreciators",
    author: "Spengebeb Squrupunts",
    likes: 42
  },
  {
    id: "5a6e665ea930976ccd9649e5",
    title: "Infinite Twin Peaks theories and speculation",
    author: "dougie coop",
    likes: 31
  },
  {
    id: "5a6f088d9578aa0fcf60ba12",
    title: "Quadrupleroundhousekicking people in the face so hard they turn into doors",
    author: "Jackiechuck Channorris",
    likes: 43
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
    expect(result).toBe(129)
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
    expect(result).toEqual(blogs[3])
  })

})

describe("mostBlogs", () => {

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

describe("mostLikes", () => {

  test("of empty list is null : 0", () => {
    let result = listHelper.mostLikes([])
    expect(result).toEqual(
      {
        author : null,
        likes : 0
      }
    )
  })

  test("of list of one is <author> : <likes>", () => {
    let result = listHelper.mostLikes([blogs[1]])
    expect(result).toEqual(
      {
        author : "Spengebeb Squrupunts",
        likes : 42
      }
    )
  })

  test("returns correct author from list of many", () => {
    let result = listHelper.mostLikes(blogs)
    expect(result).toEqual(
      {
        author : "dougie coop",
        likes : 44
      }
    )
  })

})
