const express= require('express')
const path= require('path')
const hbs= require('hbs')

const app= express()

const filepath= path.join(__dirname,'../public')
const viewpath= path.join(__dirname,'../templates/views')
const partialpath= path.join(__dirname,'../templates/partials')

app.use(express.static(filepath))

app.set('view engine','hbs')
app.set('views', viewpath)

hbs.registerPartials(partialpath) 

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'AJ'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'AJ'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        text: 'This is some useful text!',
        name: 'AJ'
    })
})

// app.get('',(req,res) => {
//     res.send('<h1>Welcome to Express!</h1>');
// });

// app.get('/help',(req,res) => {
//     res.send([{
//         name: 'John'
//     },
//     {
//         name: 'Jonas'
//     }
//     ]);
// });

// app.get('/about',(req,res) => {
//     res.send('<h2>About Page</h2>');
// });

const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({error: 'Please type in the address'})
    }
    geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({error: error});
        }
        // can use data.lattitude or data.longitude
        forecast(28143,(error,data) => {
            if(error) {
                return res.send({error: error});
            }
            res.send({
                location: req.query.address,
                data: data
            });
        });
    }); 
    // res.send({
    //     location: req.query.address
    // });
});
app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({error: 'Pls type in the address'})
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Help Page not Found',
        name: 'AJ'
    })
})
app.get('/*',(req,res) => {
    res.render('404',{
        title: 'Error 404',
        name: 'AJ'
    })
})
app.listen(3000, () => {
    console.log("Server running at port 3000!");
});
