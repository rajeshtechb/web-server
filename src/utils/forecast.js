
const request = require('request')

const forecast = (longtitude, latitude ,callback) =>{

    const url= 'http://api.weatherstack.com/current?access_key=6ea5aeb1fbeda5883dd4abdcf0ed7827&query='+longtitude+","+latitude

    request({url , json : true}, (error , {body})=>{
        if(error){
            callback('Not able to reach the service',undefined)           
        }else if(body.current.weather_descriptions ==0){          
            callback('Not find the address location',undefined)          
        }else{            
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature +' degrees out . It feels like '+body.current.feelslike +' degrees out')
        }
    })
}

module.exports = forecast