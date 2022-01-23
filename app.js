const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article'); 
const methodOverride = require('method-override');  
const articleRouter = require('./routes/articles');  
const app = express(); 

mongoose.connect('mongodb://localhost/blog').then(() => console.log('MongoDb Connected'))
.catch((err) => console.log(err)); 

app.set('view engine', 'ejs'); 

app.use(express.urlencoded({extended: false})); 
app.use(methodOverride('_method')); 

app.get('/', async (req, res) => {
    
    const articles = await Article.find().sort({createdAt: 'desc'}); 

    res.render('articles/index', { articles: articles }); 
})

console.log('Server has started at port 5000'); 

app.use('/articles', articleRouter); 

app.listen(5000); 