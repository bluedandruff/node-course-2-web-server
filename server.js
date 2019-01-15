const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('unable to append to server.log')
        }
    })
    next()
});
var maintenanceMode = false;
if(maintenanceMode === true){
    app.use((req, res, next)=>{
        res.render('maintenance.hbs')
    })
};
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

hbs.registerHelper('projectMessage', (text)=>{
    return text.toUpperCase()
})

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        welcomeMessage: 'This is a test message for project. I really have nothing to say.',
        pageTitle: 'Projects', 
    })
})

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to the test page',
        pageTitle: 'Example Title', 
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res)=>{
    res.send({
        error_message: 'Unable to get request'    
    })
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
});