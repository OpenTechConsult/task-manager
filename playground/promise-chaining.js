require('../src/db/mongoose')
const User = require('../src/model/user')

// 6171ed1c09e97976ecd2e4ad

User.findByIdAndUpdate('6171ed1c09e97976ecd2e4ad', { age: 39 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 39 })
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})