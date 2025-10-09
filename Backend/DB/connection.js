const mongoose =  require('mongoose')


const DBConnection = (str)=>{
    return mongoose.connect(str)
}

module.exports = DBConnection