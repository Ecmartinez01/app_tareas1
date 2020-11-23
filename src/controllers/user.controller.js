const modelUser = require("../models/user.model")
const jwt = require("jsonwebtoken")
const createSearchParams = require("../utils/createSearchParams")



class ControllerUser {
    createUser = async(req, res) => {
        try {
            const user = new modelUser(req.body)
            user.token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
            await user.encryptPassword()
            const savedUser = await user.save()
            res.status(200).json(user)
        } catch (error) {
            console.log(error.message)
            res.status(401).json(error)
        }
    }


    loginUsers = async(req, res) => {
        try {
            //const user = req.user
            const datos = createSearchParams(req.query)
            const user = req.user
            if (user) {
                const validate = await user.comparePassword(datos.password)
                    //await user.comparePassword(datos.password)

                if (validate) {
                    console.log("todo esta bien" + validate);
                    res.status(200).json(user)
                } else {
                    res.status(200).json("Error en password")
                }
            } else {
                res.status(200).json("No se encontro al usuario")
            }

        } catch (error) {
            console.log(error);
        }
    };

}

const controllerUser = new ControllerUser()
module.exports = controllerUser