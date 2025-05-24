const bcrypt = require("bcrypt")

const encryptPassword = (password)=>{

    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password,salt)
    return hashedPassword;
}
const comparePassword = (plainPass,hashedPass)=>{

    return bcrypt.compareSync(plainPass,hashedPass)

}

module.exports = {
    encryptPassword,
    comparePassword
}