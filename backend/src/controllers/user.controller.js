const modelUser = require("../models/user.model")
const jwt = require("jsonwebtoken")


class ControllerUser {
    createUser = async(req, res) => {
        try {
            const user = new modelUser(req.body)
            user.token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
            await user.encryptPassword()
                // await user.encryptIp()
            const savedUser = await user.save()
            res.status(200).json(user)
        } catch (error) {
            console.log(error.message)
            res.status(401).json(error)
        }
    }
    login = async(req, res) => {
        try {
            const [users] = await modelUser.find({ mail: req.body.mail })
            const validate = await users.comparePassword(req.body.password)
            if (validate) {
                res.status(200).json(users)
            } else {
                res.status(200).json("Error en password")
            }
        } catch (error) {
            res.status(400).json(error.menssage)
        }


    }
}

const controllerUser = new ControllerUser()
module.exports = controllerUser