import React from "react"
import { shallow } from "enzyme"
import Blog from "./blog"

describe("<Blog />", () => {
  let user = {
    username : "bmcboatf",
    name : "Boaty McBoatface"
  }
  let blog = {
    id : "426661337",
    title : "Everything there is to know about boats",
    author : "Boaty McBoatface",
    url : "https://boats.is.love/boats/is/life",
    likes : 1337,
    user
  }
  let blogComponent

  beforeEach(() => {
    blogComponent = shallow(
      <Blog blog={blog} user={user} handleRemove={jest.fn()} />
    )
  })

  it("renders blog attributes in the right places", () => {
    let headerDiv = blogComponent.find(".tests-header")
    let detailsDiv = blogComponent.find(".tests-details")

    expect(headerDiv.text())
      .toContain(blog.title, blog.author)
    expect(detailsDiv.text())
      .toContain(blog.url, blog.likes, blog.user.name)
  })

  it("by default shows only title and author", () => {
    let detailsDiv = blogComponent.find(".tests-details")

    expect(detailsDiv.getElement().props.style)
      .toEqual({ display : "none" })
  })

  it("shows details by clicking on title/author", () => {
    let headerDiv = blogComponent.find(".tests-header")
    headerDiv.simulate("click")

    let detailsDiv = blogComponent.find(".tests-details")
    expect(detailsDiv.getElement().props.style)
      .toEqual({ display : "" })
  })
})
