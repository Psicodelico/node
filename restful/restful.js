const express = require('express');
const app = express();
// const articles = [{title: 'Example'}];
const bodyParser = require('body-parser');
const Article = require('./db').Article;
const read = require('node-readability');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/articles', (req, res, next)=>{
    Article.all((err, articles)=>{
        if(err) return next(err);
        res.send(articles);
    });
});

app.get('/articles/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('Fetching:', id);
    Article.find(id, (err, article)=>{
        if(err) return next(err);
        res.send(article);
    })
});

app.post('/articles', (req, res, next)=>{
    /* articles.push(article);
    res.send(article); */
    /* const article = { title: req.body.title };
    Article.create(article, (err, article)=>{
        if(err) return next(err);
        res.send('OK');
    }); */
    const url = req.body.url;
    read(url, (err, result)=>{
        if(err || !result) res.status(500).send('Error downloading article');
        Article.create({
            title: result.title,
            content: result.content
        }, (err, article)=>{
            if(err) return next(err);
            res.send('OK');
        });
    });
});
/*
 * 自上而下匹配路由 
 */
app.delete('/articles/clear', (req, res, next)=>{
    Article.clear((err)=>{
        if(err) return next(err);
        res.send({message: 'All Deleted'});
    });
});

app.delete('/articles/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('Deleting:', id);
    Article.delete(id, (err)=>{
        if(err) return next(err);
        res.send({message: 'Deleted'});
    });
    /* delete articles[id];
    res.send({ message: 'Deleted'}); */
});

app.listen(app.get('port'),()=>{
    console.log('App started on port', app.get('port'));
});

module.exports = app;

/*
 * 可以使用postman测试 
 */