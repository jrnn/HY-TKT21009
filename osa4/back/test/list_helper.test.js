const listHelper = require("../util/list_helper")

describe("dummy", () => {

  test("dummy is called", () => {
    let blogs = []
    let result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

})

describe("totalLikes", () => {

  let blogs = [
    {
      id : "5a6e4f4396835953594a35a2",
      title: "this is the water, and this is the well",
      author: "dougie coop",
      url: "http://localhost:3003/api/blogs",
      likes: 42
    },
    {
      id: "5a6e57ea9fb74e62b9ccea28",
      title: "Krabby patty appreciators",
      author: "Spengebeb Squrupunts",
      url: "http://localhost:3003/api/blogs",
      likes: 13
    },
    {
    id: "5a6e665ea930976ccd9649e5",
    title: "Infinite Twin Peaks theories and speculation",
    author: "dougie coop",
    url: "http://localhost:3003/api/blogs",
    likes: 31
    }
  ]

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
