const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
  user:{
   type : mongoose.Schema.Types.ObjectId,
   required : true,
   ref : 'User' 
  },
  product:{
    type: String,
    required : [true, "Please select a product"],
    enum: ['iPhone', 'Macbook', 'Windows', 'Andriod', 'Laptop', 'Linux', 'Tab']
  },
  description:{
    type: String,
    required: [true, "Please enter a description of the ticket issue"]
  },
  status:{
    type: String,
    required: true,
    enum: ['new', 'open', 'closed'],
    default: 'new'
  }
},
{
timestamps: true,
}
)

module.exports = mongoose.model('Ticket', ticketSchema)