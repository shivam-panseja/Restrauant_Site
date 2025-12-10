const mongoose = require('mongoose')

 const  dbConnect = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log('Databse connected', process.env.MONGO_URL)
    }catch (error) {
        console.log('Database error')
        console.log('Database error', process.env.MONGO_URL)
    }
}
module.exports = dbConnect