import React from "react"
import { mount } from "enzyme"

import App from "./app"
import Blog from "./component/blog"
import blogService from "./service/blog_service"
import Form from "./component/form"

describe("<App />", () => {
  let app
  let user = { username : "tmctestf", name : "Testy McTestface" }

  describe("when not logged in", () => {
    beforeEach(() => {
      window.localStorage.clear()
      app = mount(<App />)
    })

    it("renders only login form", () => {
      app.update()

      let formComponents = app.find(Form)
      let blogComponents = app.find(Blog)

      expect(formComponents.length).toBe(1)
      expect(formComponents.text()).toContain("username", "password")
      expect(blogComponents.length).toBe(0)
    })
  })

  describe("when logged in", () => {
    beforeEach(() => {
      window.localStorage.setItem("loggedBlogged", JSON.stringify(user))
      app = mount(<App />)
    })

    it("renders all blogs it gets from blog_service", () => {
      app.update()

      let blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(blogService.blogs.length)

      blogService.blogs.forEach(blog => {
        expect(app.text()).toContain(blog.title, blog.author)
      })
    })
  })
})
