const routes = require("express").Router()

const uploadControlle = require("../controllers/UploadController")
routes.post("/",uploadControlle.uploadFile)
module.exports = routes
