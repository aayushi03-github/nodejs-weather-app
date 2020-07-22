 const axios = require('axios')

 const forecast = (latitude , longitude , callback) => {
    const url ='http://api.weatherstack.com/current?access_key=c58247fa8739892df3afbae320bfbd7a&query='+latitude+',' +longitude+'&units=m'

    axios.get(url , {json:true})
     .then((response)=>{
       // const data = JSON.parse(response)
              callback(undefined,
                 response.data.current.weather_descriptions[0]+ ". It is currently " + response.data.current.temperature + " degress out. It feels like " +
                 response.data.current.feelslike +" degree out. \n There is a " + response.data.current.precip + "% chance of rain." 
                            + "The Wind Speed is :" +response.data.current.wind_speed+"km/h. The Humidity is:"
                          + response.data.current.humidity+ "%." )
                        //console.log(response.data)
                   
      }).catch((error) => {
           if (error) {
                callback('Unable to connect to weather service!', undefined)
              }
         })
 }
 module.exports = forecast
 
 //const url ='http://api.weatherstack.com/current?access_key=c58247fa8739892df3afbae320bfbd7a&query=28.7041,77.1025'
