const mongoose = require('mongoose')
const validator = require("validator");

const VehicleSchema = new mongoose.Schema(
    {
         Name:
         {
            type:String,
            maxLength:50,
            validate(value)
            {
               if(!validator.isAlphanumeric(value))
                  {  console.log(value);
                     console.log(typeof value);
                     console.log(validator.isAlpha(value));
                     throw new Error('Name should contain only letters');
                  }
            }
         },
         Capacity:
         {
            type:Number,
         },
         Tyres:
         {
            type:Number
         }
    },{timestamps:true})

module.exports = mongoose.model('Vehicle',VehicleSchema)