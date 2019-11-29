require("../src/db/mongoose")
const Task = require("../src/models/task")

/* Task.findByIdAndDelete("5ddd2d6f662cc14a2003b22b").then((task) => {
    
    console.log(task)

    return Task.countDocuments( {completed: false})
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
}) */

const delTaskAndCount = async (id) => {
    const task  = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})

    return count
}

delTaskAndCount("5dde5eb5d60c5a49503359ad").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})