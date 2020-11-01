const mongoose = require('mongoose');
const { Schema } = mongoose;

const MaqSchema = new Schema({
    marca:{type:String, required:true},
    modelo:{type:String, required:true},
    tipo:{type:String, required:true},
    patente:{type:String, required:true},
    horometro:{type:Number, required:true , default:0},
    estado:{type:String, required:true , default:"Disponible"},
    mantencion:{type:Number, required:true , default:0},
})

module.exports = mongoose.model('Maq', MaqSchema);