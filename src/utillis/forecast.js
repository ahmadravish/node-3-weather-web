const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/290040eee89c322dd502c1a470d2b41f/'+latitude+','+longitude+'?units=si';
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect!',unndefined)
        }else if(response.body.error){
            callback('unable to find location!',undefined)
        }else{
            callback(undefined,
                'temperature is: '+response.body.currently.temperature+' chance of precipitaion is: '+response.body.currently. precipProbability

            )
         }
     })
}
module.exports=forecast