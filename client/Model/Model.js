import Controller from '../Controller/Controller';

let Model = (function() {
    return {
        getPhotoPost: function(id) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', `/getPost?id=${id}`, false);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
                xhr.send(JSON.stringify(filterConfig));
            });
        },

        getPhotoPosts: function(skip, top, filterConfig) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', `/getPhotoPosts?skip=${skip}&top=${top}`, false);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(Controller.getPostsFromModel(xhr.responseText));
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
                xhr.send(JSON.stringify(filterConfig));
            });
        },

        addPhotoPost: function(post) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', `/addPhotoPost`, false);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(true);
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
                xhr.send(JSON.stringify(post));
            });
        },

        removePhotoPost: function(id) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('DELETE', `/removePhotoPost?id=${id}`, false);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(Controller.succsessExecute());
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                }
                xhr.send();
            });

        },

        editPhotoPost: function(id, newPost) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('PUT', `/editPhotoPost?id=${id}`, false);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(Controller.succsessExecute());
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
                xhr.send(JSON.stringify(newPost));
            });
        },

        isUser: function(LogIn, Password) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', `/GetUser?LogIn=${LogIn}&Password=${Password}`, false);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(Controller.correctPassword(LogIn));
                    } else {
                        reject(Controller.wrongPassword());
                    }
                };
                xhr.send();
            });
        },

        uploadPhoto: function(file, id) {
            return new Promise(function(resolve, reject) {
                var formData = new FormData();
                formData.append('file', file);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', `/fileupload?id=${id}`);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(Controller.copmpletedUpload(xhr.responseText));
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
                xhr.send(formData);
            });
        },
    }
})();

export default Model;
