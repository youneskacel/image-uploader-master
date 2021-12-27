import App from './App.js'

const port = process.env.PORT || 4000

App.listen(port,()=> {
    console.log('connected to Server')
})