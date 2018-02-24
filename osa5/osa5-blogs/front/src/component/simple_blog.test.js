import React from "react"
import { shallow } from "enzyme"
import SimpleBlog from "./simple_blog"

describe("<SimpleBlog />", () => {
  it("renders title, author and no. of likes", () => {
    let blog = {
      title : "Everything there is to know about boats",
      author : "Boaty McBoatface",
      likes : 1337
    }

    let blogComponent = shallow(<SimpleBlog blog={blog} />)
    let contentDiv = blogComponent.find(".content")
    let likesDiv = blogComponent.find(".likes")

    expect(contentDiv.text())
      .toContain(blog.title, blog.author)
    expect(likesDiv.text())
      .toContain(blog.likes)
  })
})
