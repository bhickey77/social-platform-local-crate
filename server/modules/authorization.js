function isAdmin(user) {
    return user.user_type === 'admin'; 
}

module.exports = { isAdmin };