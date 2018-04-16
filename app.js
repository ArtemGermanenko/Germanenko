const express = require('express');
const fs = require('fs');
const way = 'public/server/data/posts.json';
var bodyParser = require('body-parser');
const change = require('./public/UI/js/script.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public/UI'));


function getPhotoPosts() {
    let posts = fs.readFileSync(way);
    posts = JSON.parse(posts.toString());
    return posts;
}

app.get('/getPost', (req, res) => {
    let posts = getPhotoPosts();
    posts.getPost = change.getPhotoPost;
    let post = posts.getPost(req.query.id.toString());
    post ? res.send(post) : res.send(404).end();
})


app.post('/getPhotoPosts', (req, res) => {
    let posts = getPhotoPosts();
    const skip = req.query.skip;
    const top = req.query.top;
    const filterConfig = req.body;
    posts.getPhotoPosts = change.getPhotoPosts;

    if (skip < 0 || top < 0 || filterConfig === undefined) {
        res.statusCode = 400;
        res.end();
    } else {
        new_posts = posts.getPhotoPosts(new Number(skip), new Number(top), filterConfig);
        res.statusCode = 200;
        res.send(JSON.stringify(new_posts));
        res.end();
    }
});

app.post('/addPhotoPost', (req, res) => {
    let post = req.body;
    let posts = getPhotoPosts();

    posts.addPhotoPost = change.addPhotoPost;

    if (posts.addPhotoPost(post)) {
        res.statusCode = 200;
        fs.writeFile(way, JSON.stringify(posts));
        res.send(post);
        res.end();
    } else {
        res.statusCode = 400;
        res.end();
    }
});

app.delete('/removePhotoPost', function(req, res) {
    let posts = getPhotoPosts();

    posts.removePhotoPost = change.removePhotoPost;

    if (posts.removePhotoPost(req.query.id.toString())) {
        fs.writeFile(way, JSON.stringify(posts));
        res.send(posts);
        res.end();
        res.statusCode = 200;
    } else {
        res.statusCode = 400;
        res.end();
    }
});

app.put('/editPhotoPost', (req, res) => {
    let posts = getPhotoPosts();
    let post = req.body;

    posts.editPhotoPost = change.editPhotoPost;

    if (posts.editPhotoPost(req.query.id, post)) {
        res.statusCode = 200;
        fs.writeFile(way, JSON.stringify(posts));
        res.send(posts);
        res.end();
    } else {
        res.statusCode = 400;
        res.end();
    }
});


const server = app.listen(3030, () => {
    console.log(`Server on port ${server.address().port}`);
});