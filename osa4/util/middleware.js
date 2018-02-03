const tokenGitter = (req, res, next) => {
  let auth = req.get("authorization")

  if (auth && auth.toLowerCase().startsWith("bearer "))
    req.token = auth.substring(7)

  next()
}

module.exports = { tokenGitter }
