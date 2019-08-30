const request=require('request')
const geocode=(adress,callback)=>{
    const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token=pk.eyJ1IjoicmF2aXNoYWhtYWQ1MiIsImEiOiJjanpjZ2R2emowMmk4M25wZXNqaWIzOTY2In0.lUKlJ6zO9gqBJ-W3V9YmMA'
    request({url:geocodeurl,json:true},(error,response)=>{
        if(error){
            callback('unable to connect!',undefined)
        }
        else if(response.body.features.length===0){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}
module.exports=geocode