const jwt = require("jsonwebtoken")
const knex = require("../config/databas")

const createToken = ({ id }) => {
    return jwt.sign(id, "praveenwertyuidfghrtyufdfghuruik")
}

const varifiToken = async (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1]
        const id = jwt.verify(token, "praveenwertyuidfghrtyufdfghuruik")
        const user = await knex("user").where({ id })
        req.userData = user
        next()
    } else {
        res.send("nahi hua token expaire ho gya")
    }
}

module.exports = {createToken ,varifiToken}