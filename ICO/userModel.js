var mongoose = require('mongoose');
var userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:Boolean,
    sT :String,
    forgotToken:{default:'',type:String},
    isAdmin:Boolean

});

var User=module.exports=mongoose.model('user',userSchema);
module.exports.get=function(callback,limit){
    User.find(callback).limit(limit);
}

const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});