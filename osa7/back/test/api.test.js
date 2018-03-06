const supertest = require("supertest")
const { app, server } = require("../index")
const api = supertest(app)
const jwt = require("jsonwebtoken")
const Blog = require("../model/blog")
const User = require("../model/user")
const helper = require("./api_test_helper")

describe("Given that there are users and blogs in db", async () => {

  beforeAll(async () => {
    await Blog.remove()
    await User.remove()

    let blogs = helper.initialBlogs.map(b => new Blog(b))
    let users = helper.initialUsers.map(u => new User(u))

    let i = 0
    blogs.forEach(b => {
      i %= users.length
      b.user = users[i]._id
      users[i].blogs = users[i].blogs.concat(b._id)
      i++
    })

    await Promise.all(blogs.map(b => b.save()))
    await Promise.all(users.map(u => u.save()))
  })

  describe("User API (incl. login)", async () => {

    describe("GET /api/users", async () => {

      test("returns those users as json", async () => {
        let usersInDb = await helper.findAllUsers()

        let res = await api
          .get("/api/users")
          .expect(200)
          .expect("content-type", "application/json; charset=utf-8")

        let usernames = res.body.map(u => u.username)
        let names = res.body.map(u => u.name)

        usersInDb.forEach(u => {
          expect(usernames).toContain(u.username)
          expect(names).toContain(u.name)
        })
        expect(res.body.length).toBe(usersInDb.length)
      })
    })

    describe("POST /api/users", async () => {

      test("succeeds with valid input, returning new user as json", async () => {
        let usersBefore = await helper.findAllUsers()
        let user = helper.getNewUser()

        await api
          .post("/api/users")
          .send(user)
          .expect(201)
          .expect("content-type", "application/json; charset=utf-8")

        let usersAfter = await helper.findAllUsers()
        let usernames = usersAfter.map(u => u.username)
        let names = usersAfter.map(u => u.name)

        expect(usersAfter.length).toBe(usersBefore.length + 1)
        expect(usernames).toContain(user.username)
        expect(names).toContain(user.name)
      })

      test("succeeds if 'adult' missing (defaults to true)", async () => {
        let user = {
          username : "amcchild",
          name : "Adult McChildface",
          password : "qwerty123"
        }

        await api
          .post("/api/users")
          .send(user)
          .expect(201)

        let userInDb = await User
          .find({ username : user.username })

        expect(userInDb.length).toBe(1)
        expect(userInDb[0].name).toBe(user.name)
        expect(userInDb[0].adult).toBe(true)
      })

      test("fails if 'username' already exists, returning 400", async () => {
        let usersBefore = await helper.findAllUsers()
        let user = helper.getExistingUser()

        await api
          .post("/api/users")
          .send(user)
          .expect(400)

        let usersAfter = await helper.findAllUsers()
        expect(usersAfter.length).toBe(usersBefore.length)
      })

      test("fails if other attributes missing or < 3 chars, returning 400", async () => {
        let usersBefore = await helper.findAllUsers()

        helper.invalidUsers.forEach(async (u) => {
          await api
            .post("/api/users")
            .send(u)
            .expect(400)
        })

        let usersAfter = await helper.findAllUsers()
        expect(usersAfter.length).toBe(usersBefore.length)
      })
    })

    describe("POST /api/login", async () => {

      test("succeeds with valid credentials, returning correct token", async () => {
        let user = helper.getExistingUser()
        let { username, password } = user
        user = await User.findOne({ username })

        let res = await api
          .post("/api/login")
          .send({ username, password })
          .expect(200)

        let token = jwt
          .verify(res.body.token, process.env.SECRET)

        expect(user._id.toString()).toEqual(token.id)
        expect(username).toEqual(token.username)
      })

      test("fails with invalid credentials, returning 401", async () => {
        let user = helper.getExistingUser()
        let { username, password } = user

        await api
          .post("/api/login")
          .send({ username, password : "trustno1" })
          .expect(401)

        await api
          .post("/api/login")
          .send({ username : "knock_knock", password })
          .expect(401)
      })
    })
  })

  describe("Blog API", async () => {

    describe("GET /api/blogs", async () => {

      test("returns those blogs as json", async () => {
        let blogsInDb = await helper.findAllBlogs()

        let res = await api
          .get("/api/blogs")
          .expect(200)
          .expect("content-type", "application/json; charset=utf-8")

        let titles = res.body.map(b => b.title)
        let authors = res.body.map(b => b.author)
        let likes = helper.totalLikes(res.body)

        blogsInDb.forEach(b => {
          expect(titles).toContain(b.title)
          expect(authors).toContain(b.author)
        })
        expect(res.body.length).toBe(blogsInDb.length)
        expect(likes).toBe(helper.totalLikes(blogsInDb))
      })
    })

    describe("GET /api/blogs/:id", async () => {

      test("with valid id returns that blog as json", async () => {
        let blog = await helper.findOneBlog()

        let res = await api
          .get(`/api/blogs/${blog.id}`)
          .expect(200)
          .expect("content-type", "application/json; charset=utf-8")

        expect(res.body.title).toEqual(blog.title)
        expect(res.body.author).toEqual(blog.author)
        expect(res.body.likes).toBe(blog.likes)
      })

      test("with nonexisting id returns 404", async () => {
        await api
          .get(`/api/blogs/${new Blog()._id}`)
          .expect(404)
      })

      test("with invalid id returns 400", async () => {
        await api
          .get("/api/blogs/nuuskamuikkunen")
          .expect(400)
      })
    })

    describe("POST /api/blogs", async () => {

      test("succeeds with valid input and token, returning new blog as json", async () => {
        let blogsBefore = await helper.findAllBlogs()
        let blog = helper.getNewBlog()
        let user = await helper.findOneUser()
        let token = helper.createToken(user)

        let res = await api
          .post("/api/blogs")
          .set("authorization",`bearer ${token}`)
          .send(blog)
          .expect(201)

        let blogsAfter = await helper.findAllBlogs()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        expect(res.body.user.toString()).toEqual(user.id.toString())
        expect(res.body.title).toEqual(blog.title)
        expect(res.body.author).toEqual(blog.author)
      })

      test("fails if token missing or invalid (not logged in)", async () => {
        let blogsBefore = await helper.findAllBlogs()
        let blog = helper.getNewBlog()
        let user = await helper.findOneUser()

        let token = jwt
          .sign({ id : user.id, username : user.username },
          "whoops_i_do_not_know_the_secret_word")

        await api
          .post("/api/blogs")
          .set("authorization",`bearer ${token}`)
          .send(blog)
          .expect(401)

        await api
          .post("/api/blogs")
          .send(blog)
          .expect(401)

        let blogsAfter = await helper.findAllBlogs()
        expect(blogsAfter.length).toBe(blogsBefore.length)
      })

      test("succeeds if 'likes' missing (defaults to 0)", async () => {
        let user = await helper.findOneUser()
        let token = helper.createToken(user)
        let blogsBefore = await helper.findAllBlogs()
        let blog = {
          title : "This blog shall pass even though no one likes it",
          author : "Forever McAloneface",
          url : "https://tr00news.herokuapp.com/"
        }

        let res = await api
          .post("/api/blogs")
          .set("authorization",`bearer ${token}`)
          .send(blog)
          .expect(201)

        expect(res.body.user.toString()).toEqual(user.id.toString())
        expect(res.body.title).toEqual(blog.title)
        expect(res.body.likes).toEqual(0)

        let blogsAfter = await helper.findAllBlogs()
        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
      })

      test("fails if other attributes missing, returning 400", async () => {
        let user = await helper.findOneUser()
        let token = helper.createToken(user)
        let blogsBefore = await helper.findAllBlogs()

        helper.invalidBlogs.forEach(async (b) => {
          await api
            .post("/api/blogs")
            .set("authorization",`bearer ${token}`)
            .send(b)
            .expect(400)
        })

        let blogsAfter = await helper.findAllBlogs()
        expect(blogsAfter.length).toBe(blogsBefore.length)
      })
    })

    describe("PUT /api/blogs/:id", async () => {

      test("with valid id updates only 'likes' for that blog", async () => {
        let blog = await helper.findOneBlog()
        let newLikes = blog.likes + Math.floor(Math.random() * 65536)

        await api
          .put(`/api/blogs/${blog._id}`)
          .send({
            likes : newLikes,
            title : "only likes can be changed",
            user : null
          }).expect(200)

        let res = await api
          .get(`/api/blogs/${blog._id}`)
          .expect(200)

        expect(res.body.likes).toBe(newLikes)
        expect(res.body.title).toEqual(blog.title)
        expect(res.body.user).not.toBe(null)
      })

      test("with nonexisting id returns 404", async () => {
        await api
          .put(`/api/blogs/${new Blog()._id}`)
          .send({ likes : 404 })
          .expect(404)
      })

      test("with invalid id returns 400", async () => {
        await api
          .put("/api/blogs/nuuskamuikkunen")
          .send({ likes : 400 })
          .expect(400)
      })

      test("fails if 'likes' missing or invalid", async () => {
        let blogBefore = await helper.findOneBlog()
        let invalidInputs = [
          {
            title : "How to update likes without specifying likes",
            author : "Jonne McJonneface"
          },
          { likes : -1337.666 },
          { likes : "this is a shit blog, no one likes it" }
        ]

        invalidInputs.forEach(async (i) => {
          await api
            .put(`/api/blogs/${blogBefore._id}`)
            .send(i)
            .expect(400)
        })

        let blogAfter = await Blog.findById(blogBefore._id)
        expect(blogBefore).toEqual(blogAfter)
      })
    })

    describe("DELETE /api/blogs/:id", async () => {

      test("deletes blog with user, if logged in as that user", async () => {
        let blogsBefore = await helper.findAllBlogs()
        let i = Math.floor(Math.random() * blogsBefore.length)
        let blog = blogsBefore[i]

        let user = await User.findById(blog.user)
        let token = helper.createToken(user)

        await api
          .delete(`/api/blogs/${blog.id}`)
          .set("authorization",`bearer ${token}`)
          .expect(204)

        let blogsAfter = await helper.findAllBlogs()
        expect(blogsAfter.length).toBe(blogsBefore.length - 1)
        expect(blogsAfter).not.toContain(blog)
      })

      test("deletes blog without user, if logged in as any user", async () => {
        let blog = await new Blog(helper.getNewBlog()).save()
        let blogsBefore = await helper.findAllBlogs()
        let user = await helper.findOneUser()
        let token = helper.createToken(user)

        await api
          .delete(`/api/blogs/${blog._id}`)
          .set("authorization",`bearer ${token}`)
          .expect(204)

        let blogsAfter = await helper.findAllBlogs()
        let blogIds = blogsAfter.map(b => b.id.toString())

        expect(blogsAfter.length).toBe(blogsBefore.length - 1)
        expect(blogIds).not.toContain(blog._id.toString())
      })

      test("fails if not logged in or if incorrect user, returning 401", async () => {
        let user = await helper.findOneUser()
        let token = helper.createToken(user)
        let blogsBefore = await helper.findAllBlogs()
        let blog = blogsBefore
          .filter(b => b.user.toString() !== user._id.toString())[0]

        await api
          .delete(`/api/blogs/${blog.id}`)
          .expect(401)

        await api
          .delete(`/api/blogs/${blog.id}`)
          .set("authorization",`bearer ${token}`)
          .expect(401)

        let blogsAfter = await helper.findAllBlogs()
        expect(blogsAfter.length).toBe(blogsBefore.length)
      })
    })
  })
})

afterAll(() => server.close())
