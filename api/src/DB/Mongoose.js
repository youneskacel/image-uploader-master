import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/images_upload',{
    useUnifiedTopology: true,
    useNewUrlParser: true
},()=> console.log('connected to DB'))