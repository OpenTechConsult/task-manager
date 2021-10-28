require('../src/db/mongoose')
const Task = require('../src/model/task')

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return { task, count}
}


deleteTaskAndCount('617165119c47d52ca26d15ef').then((result) => {
    console.log(result.count)
    console.log(result.task)
}).catch((err) => {
    console.log(err)
})