const express = require('express')
const connectDb = require('../config/database')
const VehicleRouter = require('../routers/vehicle')
const BookingRouter  = require('../routers/booking')
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',VehicleRouter)
app.use('/',BookingRouter)

connectDb().then(() => {
    app.listen(3000, () => {
        console.log('listening on port 3000....')
    })
})
.catch((err)=>
    {
        console.log(`There was problem with connecting database... ${err.message}`)
        throw err;
    })
