const express = require('express');
const fs = require('fs');
var busboy = require('connect-busboy');
var bodyParser = require('body-parser');
const controller = require('./server/Controller');
const multer = require('multer');
const upload = multer();

const pathPosts = 'server/data/posts.json';
const pathUsers = 'server/data/users.json';
const pathImages = '/server/data/img/';
const path = '/data/img/';

const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/client/`));
app.use(express.static(`${__dirname}/server/`));
app.use(busboy());

function getPhotoPosts() {
    let posts = fs.readFileSync(pathPosts);
    return JSON.parse(posts.toString());
}

function getUsers() {
    let users = fs.readFileSync(pathUsers);
    return JSON.parse(users.toString());
}

function deletePhoto(photoPath) {
    fs.unlink('./server/' + photoPath, () => {});
}

app.post('/fileupload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    let fileFormat;
    req.busboy.on('file', function(fieldname, file, filename) {
        let index = filename.indexOf('.');
        fileFormat = filename.substring(index, filename.length + 1);
        let idImg = req.query.id;
        fstream = fs.createWriteStream(__dirname + pathImages + idImg + fileFormat);
        file.pipe(fstream);
        fstream.on('close', function() {
            res.send(path + req.query.id + fileFormat);
        });
    });
})

app.get('/getUser', (req, res) => {
    let users = getUsers();
    const LogIn = req.query.LogIn;
    const Password = req.query.Password;
    users.getUser = controller.getUser;

    if (users.getUser(LogIn, Password)) {
        res.statusCode = 200;
        res.end();
    } else {
        res.statusCode = 204;
        res.end();
    }
});

app.get('/getPost', (req, res) => {
    let posts = getPhotoPosts();
    posts.getPost = controller.getPhotoPost;
    let post = posts.getPost(req.query.id.toString());
    post ? res.send(post) : res.send(404).end();
});


app.post('/getPhotoPosts', (req, res) => {
    let posts = getPhotoPosts();
    const skip = req.query.skip;
    const top = req.query.top;
    const filterConfig = req.body;
    posts.getPhotoPosts = controller.getPhotoPosts;
    new_posts = posts.getPhotoPosts(new Number(skip), new Number(top), filterConfig);
    res.statusCode = 200;
    res.send(new_posts);
    res.end();
});

app.post('/addPhotoPost', (req, res) => {
    let post = req.body;
    let posts = getPhotoPosts();

    posts.addPhotoPost = controller.addPhotoPost;
    if (posts.addPhotoPost(post)) {
        res.statusCode = 200;
        fs.writeFile(pathPosts, JSON.stringify(posts), (error) => {
            / * ошибка обработки * /
        });
        res.send(posts);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

app.delete('/removePhotoPost', function(req, res) {
    let posts = getPhotoPosts();

    posts.removePhotoPost = controller.removePhotoPost;
    posts.getPhotoPost = controller.getPhotoPost;


    let postToDelete = posts.getPhotoPost(req.query.id.toString());
    if (posts.removePhotoPost(req.query.id.toString())) {
        deletePhoto(postToDelete.photoLink);
        fs.writeFile(pathPosts, JSON.stringify(posts), (error) => {
            / * ошибка обработки * /
        });
        res.send(posts);
        res.statusCode = 200;
    } else {
        res.statusCode = 404;
        res.end();
    }
});

app.put('/editPhotoPost', (req, res) => {
    let posts = getPhotoPosts();
    let post = req.body;

    posts.editPhotoPost = controller.editPhotoPost;

    if (posts.editPhotoPost(req.query.id.toString(), post)) {
        res.statusCode = 200;
        fs.writeFile(pathPosts, JSON.stringify(posts), (error) => {
            / * ошибка обработки * /
        });
        res.send(posts);
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

const server = app.listen(3030, () => {
    console.log(`Server on port ${server.address().port}`);
});
