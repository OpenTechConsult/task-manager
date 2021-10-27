require('../src/db/mongoose')
const User = require('../src/model/user')

// 6171ed1c09e97976ecd2e4ad

// User.findByIdAndUpdate('6171ed1c09e97976ecd2e4ad', { age: 39 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 39 })
// }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('6171ed1c09e97976ecd2e4ad', 42).then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err);
})