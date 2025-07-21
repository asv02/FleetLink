const express = require('express')
const vehicleValidator = require('../utils/vehicleValidator');
const Vehicle = require('../modal/Vehicle');
const router = express.Router()


router.post('/api/vehicles',async(req,res)=>
    {
        try
        {
            const Name = req.body.Name;
            const Capacity = parseInt(req.body.Capacity)
            const Tyres = parseInt(req.body.Tyres)
            
            vehicleValidator({Name,Capacity,Tyres})
            const vehicle = new Vehicle(
                {
                    Name,Capacity,Tyres:parseInt(Tyres)
                })
            await vehicle.save()
            res.status(201).json({message:"Vehicle Registered Successfully",vehicle:vehicle});
        }
        catch(err)
        {
            console.log(`Error in Registering vehicle.${err.message}`)
        }
    })


module.exports = router;