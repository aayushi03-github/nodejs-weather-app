const axios = require('axios')

const geocode = (address , callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYWF5dXNoaTAzIiwiYSI6ImNrY2FzbGNkZzFscnoyeXFldzNyb3ZkcGkifQ.sWPxWqRsJ9vtHOWikzT77A&limit=1'
  
 axios.get(url)
   .then((response)=> {
     if(response.data.features.length === 0){
      callback('unable to find location.Try another search', undefined)
     } else  {
       callback(undefined , {
         latitude : response.data.features[0].center[1],
         longitude : response.data.features[0].center[0],
         location : response.data.features[0].place_name
       })
     }
   })
   .catch((error) => {
        if(error)
        {
          callback('Unable to connect location services', undefined)
        }
   })
   }
  
   module.exports = geocode