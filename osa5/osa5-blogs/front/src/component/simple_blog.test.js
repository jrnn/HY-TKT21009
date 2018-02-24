import React from "react"
import { shallow } from "enzyme"
import SimpleBlog from "./simple_blog"

describe("<SimpleBlog />", () => {
  let blog
  let blogComponent
  let mockHandler

  beforeEach(() => {
    blog = {
      title : "Everything there is to know about boats",
      author : "Boaty McBoatface",
      likes : 1337
    }

    mockHandler = jest.fn()
    blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  it("renders title, author and no. of likes", () => {
    let contentDiv = blogComponent.find(".content")
    let likesDiv = blogComponent.find(".likes")

    expect(contentDiv.text())
      .toContain(blog.title, blog.author)
    expect(likesDiv.text())
      .toContain(blog.likes)
  })

  it("calls event handler twice when like-button is clicked twice", () => {
    let likeButton = blogComponent.find("button")

    likeButton.simulate("click")
    expect(mockHandler.mock.calls.length).toBe(1)

    likeButton.simulate("click")
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
