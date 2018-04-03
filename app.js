const express = require('express');
const fs = require('fs');
const way = 'public/server/data/posts.json';
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(express.static('public/UI'));


function getPhotoPosts() {
    let posts = fs.readFileSync(way);
    posts = JSON.parse(posts.toString());
    return posts;
}


module.exports.getPhotoPosts = getPhotoPosts;


app.get('/getPost/:id', (req, res) => {
    let posts = getPhotoPosts();

    let post = posts.find((post) => req.params.id === post.id);
    post ? res.send(post) : res.send(404).end();
});


app.get('/getPosts', (req, res) => {
    let posts = getPhotoPosts();
    posts ? res.send(posts) : res.status(404).end();
});


app.post('/add', (req, res) => {
    let post = req.body;
    let posts = getPhotoPosts();

    let index = posts.findIndex(function(element) {
        return element.id.toString() === req.body.id.toString();
    });

    if (index !== -1 || !posts) {
        res.end();
        res.statusCode = 400;
    } else {
        posts.push(post);
        fs.writeFile(way, JSON.stringify(posts));
        res.send(post);
        res.end();
        res.statusCode = 200;
    }
});


app.delete('/delete/:id', function(req, res) {
    let posts = getPhotoPosts();

    let index = posts.findIndex(function(element) {
        return element.id.toString() === req.params.id.toString();
    });

    if (index === -1 || !posts) {
        res.end();
        res.statusCode = 400;
    } else {
        posts.splice(index, 1);
        fs.writeFile(way, JSON.stringify(posts));
        res.send(posts);
        res.end();
        res.statusCode = 200;
    }
});

app.put('/edit/:id', (req, res) => {
    let posts = getPhotoPosts();
    let post = req.body;

    let index = posts.findIndex(function(element) {
        return element.id === req.params.id.toString();
    });

    if (index === -1 || !posts) {
        res.end();
        res.statusCode = 400;

    } else {
        let editedPost = Object.assign({}, posts[index]);

        if (post.hasOwnProperty('description')) {
            editedPost.description = post.description;
        }
        if (post.hasOwnProperty('photoLink')) {
            editedPost.photoLink = post.photoLink;
        }
        if (post.hasOwnProperty('hashTags')) {
            editedPost.hashTags = post.hashTags;
        }

        posts[index] = editedPost;

        fs.writeFile(way, JSON.stringify(posts));
        res.send(posts);
        res.end();
        res.statusCode = 200;
    }
});


const server = app.listen(3030, () => {
    console.log(`Server on port ${server.address().port}`);
});