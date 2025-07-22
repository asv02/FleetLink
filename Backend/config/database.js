const mongoose = require('mongoose')

const connectDb = async () => {
    try { await mongoose.connect('mongodb+srv://rocktheway2akash:GrWPOgfFnWpQZxKx@fleetlink.j7scb1a.mongodb.net/FleetLink?retryWrites=true&w=majority&appName=FleetLink&family=4') }
    catch (err) {
        console.log(`Something went wrong while connecting database... ${err.message}`)
        throw err;
    }
}

module.exports = connectDb;