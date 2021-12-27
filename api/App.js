import express from 'express'
import multer from 'multer'
import Image from './src/model/image.js'
//import './src/DB/Mongoose.js'
import fs from 'fs'
import path, { dirname } from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const App = express()
App.use(cors())
App.use(express.json())
App.use(express.urlencoded({ extended: true }));
App.use(express.static('../client/build'));
App.use(function(req, res) {
    const dirname = path.join(dirname(fileURLToPath(import.meta.url)),"../client/build/index.html")
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const storage = multer.diskStorage({
    destination : (req , file , callback) =>{
        callback(null,'pictures')
    },
    filename : (req , file , callback) => {
        callback(null , file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage : storage})

App.post('/upload', upload.single('image') , (req,res)=> {
    const file = req.file
    const path = `${dirname(fileURLToPath(import.meta.url))}\\pictures\\${file.filename}`
    // file = {...file,
    //     completePath : path}
        console.log(file)
    if(!file){
       return res.status(400).json({
            message : 'please upload a file'
        })
    }
   // res.send(file)
    res.status(200).send({...file,completePath : path})
})

App.post('/uploadmongo' , upload.single('image'),async (req,res) => {
    const newImg = new Image({
        name : req.body.name,
        description : req.body.description,
        img : {
            
            data : fs.readFileSync(req.file.path),
            contentType : 'image/png',
            
        }
        
    })
    
    try{
        await newImg.save()
        res.status(200).json({
            message : 'upload successfully',
            data : newImg
        })
    }catch(err){
        throw new Error(err)
    }
})

App.get('/getmongopic' ,async (req,res) => {
    try{
        const images = await Image.find()
        // res.status(200).json({
            
        //     data : images
        // })
        res.contentType(images[0].img.contentType)
        console.log(images[0].img.contentType)
        res.send(images)
        
    }catch(err){
        throw new Error(err)
    }
})

export default App