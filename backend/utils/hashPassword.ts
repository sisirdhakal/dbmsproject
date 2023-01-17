const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    const test = await bcrypt.hash(password, salt)

    return test
}
const comparePassword = async (givenPassword, userPassword) => {

    return bcrypt.compare(givenPassword, userPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}