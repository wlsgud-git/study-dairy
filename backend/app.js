import express from 'express'
import Bodyparser from 'body-parser'
import {config} from './config.js'

const app = express()

app.use()

app.use((req, res, next)=>{

})

app.use((error, req, res, next)=>{

})

// app.get('/', (req, res)=>{

// })

app.listen(config.http.port, ()=>{
    console.log("study dairy start!!!")
})