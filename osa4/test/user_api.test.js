const supertest = require("supertest")
const { app, server } = require("../index")
const api = supertest(app)
const User = require("../model/user")
const testHelper = require("./test_helper")

const path = "/api/users"

describe("given that there are users in database", async () => {

  beforeAll(async () => {
    await User.remove({})
    let users = testHelper.initialUsers.map(u => new User(u))
    await Promise.all(users.map(u => u.save()))
  })

  describe(`GET ${path}`, async () => {

    test("returns those users as json", async () => {
      let usersInDb = await testHelper.findAllUsers()

      let res = await api
        .get(path)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")

      let usernames = res.body.map(u => u.username)
      let names = res.body.map(u => u.name)

      expect(res.body.length).toBe(usersInDb.length)
      usersInDb.forEach(u => {
        expect(usernames).toContain(u.username)
        expect(names).toContain(u.name)
      })
    })
  })

  describe(`POST ${path}`, async () => {

    test("succeeds with valid input, returning newly added user as json", async () => {
      let usersBefore = await testHelper.findAllUsers()
      let newUser = testHelper.getRandomUser()

      await api
        .post(path)
        .send(newUser)
        .expect(201)
        .expect("Content-Type", "application/json; charset=utf-8")

      let usersAfter = await testHelper.findAllUsers()
      let usernames = usersAfter.map(u => u.username)
      let names = usersAfter.map(u => u.name)

      expect(usersAfter.length).toBe(usersBefore.length + 1)
      expect(usernames).toContain(newUser.username)
      expect(names).toContain(newUser.name)
    })

    test("succeeds even if 'adult' missing (defaults to true)", async () => {
      let newUser = {
        "username" : "bmcboatf",
        "password" : "qwerty123",
        "name" : "Boaty McBoatface"
      }

      await api
        .post(path)
        .send(newUser)
        .expect(201)
        .expect("Content-Type", "application/json; charset=utf-8")

      let usersInDb = await testHelper.findAllUsers()
      let user = usersInDb.filter(u => u.username === newUser.username)[0]

      expect(user.name).toBe(newUser.name)
      expect(user.adult).toBe(true)
    })

    test("fails if 'username' already exists, returning 400", async () => {
      let usersBefore = await testHelper.findAllUsers()

      let users = testHelper.initialUsers
      let i = Math.floor(Math.random() * users.length)
      let newUser = users[i]

      let res = await api
        .post(path)
        .send(newUser)
        .expect(400)

      let usersAfter = await testHelper.findAllUsers()

      expect(res.body).toEqual({ error : "username must be unique" })
      expect(usersAfter.length).toBe(usersBefore.length)
    })

    test("fails if 'username', 'password' or 'name' < 3 chars, returning 400", async () => {
      let usersBefore = await testHelper.findAllUsers()

      testHelper.invalidUsers
        .forEach(async (u) => {
          await api
            .post(path)
            .send(u)
            .expect(400)
      })

      let usersAfter = await testHelper.findAllUsers()
      expect(usersAfter.length).toBe(usersBefore.length)
    })
  })
})

afterAll(() => {
  server.close()
})
