const express = require('express')
const connectDb = require('../config/database')
const VehicleRouter = require('../routers/vehicle')
const BookingRouter  = require('../routers/booking')
const cors = require('cors')

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:1234',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
))

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
