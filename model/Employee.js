const Mongoose= require("mongoose");
const EmployeeSchema = new Mongoose.Schema(
    {
    name:String,
    location:String,
    position:String,
    salary:String
    }
)
const EmployeeModel=Mongoose.model
          ('Employees',EmployeeSchema)

module.exports=EmployeeModel;