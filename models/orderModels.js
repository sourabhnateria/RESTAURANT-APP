const mongoose = require('mongoose')

//schema
const ordersSchema = new mongoose.Schema({
    foods:[{type:mongoose.Schema.Types.ObjectId, ref:'foods'}],
    payments:{},
    buyer:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    status:{type:String, enum:['preparing','prepare','on the way','delivered'], default:'preparing'}

    },
    {timestamps:true}
);

//export
module.exports =mongoose.model('orders',ordersSchema);