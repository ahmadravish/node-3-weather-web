const express=require('express')
const path=require('path')
const hbs=require('hbs')

const request=require('request');
const geocode=require('./utillis/geocode')
const forecast=require('./utillis/forecast.js')

const app=express()
const port=process.env.PORT || 3000

//define paths
const publicpath=path.join(__dirname, '../public')
const viewPath=path.join(__dirname,'/templates/views')
const partialPath=path.join(__dirname,'/templates/partials')



//setup handlebars and locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(publicpath))

//request pages

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'ravish'
    })
})

app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        helptext:'this is some text',
        title:'help',
        name:'ravish don'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ravish',
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})
app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send({
        error:'You must provide an adress!'
        })
    } 

    geocode(req.query.address,(error,data)=>{
        if(error){
       return res.send({error:'error'})
        }
    
        forecast(data.latitude,data.longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error:'error'})
            }
            res.send({location:data.location,
                forecast:forecastdata,
                address:req.query.address
            })
           
        })
    
    })

})

//error pages 

app.get('/help/*',(req,res)=>{
    res.render('eror',{
        title:'404',
        errorMessage:'help article not found',
        name:'Ravish'
    })
  })


app.get('*',(req,res)=>{
  res.render('eror',{
      title:'404',
      errorMessage:'page not found',
      name:'Ravish'
  })
})


app.listen(port,()=>{
    console.log('server is up on port!'+ port)
})

