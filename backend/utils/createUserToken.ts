
const createUserToken = (user) => {
    return { name: user.username, userId: user.id, email: user.email }
}

module.exports = createUserToken