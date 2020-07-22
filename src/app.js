const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')

const app = express() 
const port = process.env.PORT || 3000

// define paths for express config
const  publicdirPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup hamdlebars engine and views location
app.set('view engine','hbs')
app.set('views' , viewspath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdirPath))

app.get('',(req , res)=>{
    res.render('index',{
        title: 'Lets Check Weather',
        name: 'Jindal Softwares'
    })
})

app.get('/about',(req ,res )=>{
    res.render('about',{
        title: 'About',
        name: 'Jindal Softwares'
    })
})
app.get('/help',(req ,res )=>{
    res.render('help',{
        title: 'Help',
        name :'Jindal Softwares',
        helpText: 'this is some helpful text'
    })
})

app.get('/products',(req , res) =>{
    if(!req.query.search)
    {
    return res.send({
         error:'you must provide a serach term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather' ,(req ,res) =>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!!!'
        })
    }
        geocode(req.query.address,(error,{latitude, longitude , location} ={}) =>{
            if(error){
               return res.send({error})
            }
            forecast(latitude, longitude ,(error , forecastData) => {
              if(error){
                return res.send({error})
              }
              res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            })
          })
})

app.get('*' ,(req , res) =>{
    res.render('404', {
        title:'404',
        name:'Jindal Softwares',
        errormsg:'page not found'
    })
})

app.listen(port ,()=>{
    console.log('server is running on port '+ port)
})