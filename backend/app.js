import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import {config} from './config.js'

const app = express()
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(config.http.port, ()=>{
    console.log("study dairy start!!!")
})