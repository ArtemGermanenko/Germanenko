import Controller from '../Controller/Controller';

const Model = (function () {
  return {
    getPhotoPost(id) {
      return new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/getPost?id=${id}`);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(xhr.responseText);
          } else {
            const error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };
        xhr.send();
      }));
    },

    getPhotoPosts(skip, top, filterConfig) {
      return new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/getPhotoPosts?skip=${skip}&top=${top}`);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(xhr.responseText);
          } else {
            const error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };
        xhr.send(JSON.stringify(filterConfig));
      }));
    },

    addPhotoPost(post) {
      return new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/addPhotoPost');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(true);
          } else {
            const error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };
        xhr.send(JSON.stringify(post));
      }));
    },

    removePhotoPost(id) {
      return new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/removePhotoPost?id=${id}`);
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(true);
          } else {
            const error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };
        xhr.send();
      }));
    },

    editPhotoPost(id, newPost) {
      return new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `/editPhotoPost?id=${id}`);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(true);
          } else {
            const error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };
        xhr.send(JSON.stringify(newPost));
      }));
    },

    isUser(LogIn, Password) {
      return new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const body = JSON.stringify({
          username: LogIn,
          password: Password,
        });
        xhr.open('POST', '/login');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(LogIn);
          } else {
            reject(Controller.wrongPassword());
          }
        };
        xhr.send(body);
      }));
    },

    logOut() {
      return new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', '/logout');
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(true);
          }
        };
        xhr.send();
      }));
    },

    uploadPhoto(file, id) {
      return new Promise(((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/fileupload?id=${id}`);
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(xhr.responseText);
          } else {
            const error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };
        xhr.send(formData);
      }));
    },
  };
}());

export default Model;
