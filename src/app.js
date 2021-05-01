const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// This is to handle bar template
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('',(req, res) =>{
    res.render('index',{
        title : 'Weather app',
        name : 'Rajesh '
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title : 'About Me',
        name : 'Rajesh'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        content : ' This my help page',
        title: 'help',
        name : 'Rajesh'
    })
})
app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return res.send("Error in Address")
    }

    geocode(req.query.address,(error, {latitude, longtitude}={}) =>{
  
        if(error){
          res.send({error})
        }else{
          forecast( longtitude, latitude, (error , data) =>{
              if(error){
                  return res.send({error})
              }

            res.send({
                forecastData : data
                
            })
          })
        }
    })

    
})

app.get('*',(req,res) =>{
    res.send('404 Page not found')
})

app.listen(4000, ()=>{
    console.log('Sever is listening 4000')
})