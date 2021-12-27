import mongoose from 'mongoose'


const imageSch = new mongoose.Schema({
    name: {
        type : String,
        default : 'image'+Date.now()
    },
    description : {
        type : String,
        default : 'description'+Date.now()
    },
    img :{
        data : Buffer,
        contentType : String
    }

}, {
    timestamps : true
})

const Image = mongoose.model('Image' , imageSch )

export default Image