require('../src/db/mongoose')
const Task = require('../src/model/task')

// 61729f1cf43e5395c3c6b248

Task.findByIdAndDelete('61729f1cf43e5395c3c6b248').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => { 
    console.log(result)
}).catch((err) => {
    console.log(err)
})