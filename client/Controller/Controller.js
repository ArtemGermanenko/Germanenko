import Model from '../Model/Model';
import View from '../View/View';
import {
    Indexation
} from '../Components/index';

export let _username;

class Post {
    constructor(id, author, description, photoLink, hashTags, createdAt, likes) {
        this.id = id;
        this.createdAt = createdAt;
        this.photoLink = photoLink;
        this.author = author;
        this.description = description;
        this.hashTags = hashTags;
        this.likes = likes;
    }
}

let Controller = (function() {

    let posts;
    let isDownload = false;
    let imgId;
    let id;

    return {
        getPostsFromModel: function(data) {
            if (data) {
                posts = JSON.parse(data);
                return true;
            } else {
                return false;
            }
        },

        startPage: function() {
            View.startPage();
            View.eventFilt();
        },

        displayPosts: function(skip, top, filterConfig) {
            if (top === 'all') {
                top = Indexation.getSize();
            }
            if (top === 'last') {
                top = Indexation.getIndex();
            }

            Model.getPhotoPosts(skip, top, filterConfig).then(
                response => {},
                error => { /*error page*/ }
            );

            View.showPosts(posts);
            View.addEvents(posts);
        },

        clickButtonLoginMain: function() {
            _username = null;
            View.displayPageLogin();
        },

        wrongPassword: function() {
            View.makeRed();
        },

        correctPassword: function(username) {
            _username = username;
            View.mainPage(_username);
        },

        succsessExecute: function() {
            View.afterRemove();
            Controller.displayPosts(0, Indexation.getIndex(), undefined);
        },

        clickButtonLoginLogin: function() {
            const username = View.getLogin();
            const password = View.getPassword();
            if (username === "" || password === "" || username === 'Guest' || password === 'Press Enter if you are not registered') {
                _username = null;
                View.mainPage(_username);
            } else {
                Model.isUser(username, password)
                .then(
                    response => {},
                    error => { /*error page*/ }
                );
            }
        },

        clickButtonExit: function() {
            View.afterButtonExit();
            _username = null;
            Controller.displayPosts(0, 10, undefined);
        },

        clickButtonLoad: function() {
            let index = Indexation.getIndex();
            Controller.displayPosts(index, 9, undefined);
            if (index + 9 >= Indexation.getSize()) {
                View.removeLoad();
            } else {
                Indexation.addIndex(9);
            }
        },

        clickButtonEdit: function(id) {
            return function() {
                View.editInputs(id);
            };
        },

        clickButtonRemove: function(id) {
            return function() {
                View.removeFilterEdit();
                Model.removePhotoPost(id)
                .then(
                    response => {},
                    error => { /*error page*/ }
                );
            };
        },

        clickButtonReadyEdit: function(id, post) {
            return function() {
                const post = View.getInputsEdit();
                Model.editPhotoPost(id, post)
                .then(
                    response => {},
                    error => { /*error page*/ }
                );
                View.removeFilterEdit();
            };
        },

        clickButtonFilt: function() {
            const filterConfig = View.getFilterConfig();
            Model.getPhotoPosts(0, Indexation.getSize(), filterConfig).then(
                response => {},
                error => { /*error page*/ }
            );
            if (posts.length === 0) {
                View.createMessageFilter();
            } else {
                View.succsessExecute();
                View.showPosts(posts);
                View.removeLoad();
            }
        },

        clickButtonAdd: function() {
            View.displayAddPage();
        },

        clickButtonEnterAdd: function() {
            const inputData = View.getInputDataAddEnter();
            if (inputData.Description) {
                View.makeBlueInputDescription();
                if (inputData.array.length !== 1 || inputData.array[0].toString() !== '') {
                    View.makeBlueInputHtags();
                    if (isDownload) {
                        let likes = [];
                        const post = new Post(`${id}`, _username, inputData.Description, `.${imgId}`, inputData.array, new Date(), likes);
                        Model.addPhotoPost(post).then(
                            response => {},
                            error => { /*error page*/ }
                        );
                        View.mainPage(_username);
                        isDownload = false;
                        imgId = undefined;
                    }
                } else {
                    View.makeRedInputHtags();
                }
            } else {
                View.makeRedInputDescription();
            }
        },

        uploadPhoto: function(file) {
            id = new Date().getTime();
            Model.uploadPhoto(file, id).then(
                response => {},
                error => { /*error page*/ }
            );
        },

        copmpletedUpload: function(idImg) {
            isDownload = true;
            imgId = idImg;
        },

    }
})();

export default Controller;
