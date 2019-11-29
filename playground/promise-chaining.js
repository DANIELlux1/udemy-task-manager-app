require("../src/db/mongoose")
const User = require("../src/models/user")

/* User.findByIdAndUpdate("5ddd34b5e8d83b47182671be", {age: 1}).then((user) => {
    console.log(user)

    return User.countDocuments( {age: 1})
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
}) */


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})

    return count
}

updateAgeAndCount("5ddd34b5e8d83b47182671be", 22).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})