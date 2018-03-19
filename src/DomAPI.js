//module
let DomAPI = (function() {

    const user = 'Artem Germanenko';

    if (user) {
        document.getElementsByClassName('username')[0].childNodes[0].textContent = user;
    } else {
        document.getElementsByClassName('username')[0].childNodes[0].textContent = 'Guest';
        document.querySelector('.add.material-icons.md-48').remove();
        let sign_in = document.createElement('div');
        sign_in.classList.add('exit');
        sign_in.classList.add('material-icons');
        sign_in.classList.add('md-48');
        sign_in.textContent = 'add';
        document.querySelector('.exit.material-icons.md-48').replaceWith(sign_in);
    }

    return {
        createPhotoPost: function(post) {
            if (main_module.validatePhotoPost(post)) {
                const postHTML = `
                <div class="top_margin">
                 ${post.author}
                 <i class="date">${post.createdAt}</i>
                </div>
                <img src="${post.photoLink}" class="photo">
                <div class="bottom_margin">
                 <i class="like material-icons md-48">favorite_border</i>
                 <p class="hashtags">${post.hashTags}</p>
                  ${user === post.author ? `<i class="edit material-icons md-48">create</i>` : ``}
                </div>
                <p class="comments">${post.description}</p>`;
                return postHTML;
            } else {
                return false;
            }
        },

        addPhotoPost: function(photoPost) {
            this.createDivPosts();

            photoPost.createdAt = new Date();
            if (main_module.addPhotoPost(photoPost)) {
                this.createPhotoPost(photoPost);
                return true;
            } else {
                return false
            };
        },

        removePhotoPost: function(id) {
            if (main_module.removePhotoPost(id)) {
                this.createDivPosts();
                return true;
            } else {
                return false
            };
        },

        showPosts: function(photoPosts) {
            let section = document.getElementById("posts");
            let block = document.getElementsByClassName("my-flex-container")[0];
            let detail;
            for (let i = 0; i < photoPosts.length; i++) {
                detail = document.createElement('div');
                detail.classList.add('my-flex-block');
                detail.classList.add('shadow');
                detail.id = photoPosts[i].id;
                detail.innerHTML = this.createPhotoPost(photoPosts[i]);
                block.appendChild(detail);
            }
            section.appendChild(block);
        },

        editPhotoPost: function(id, post) {
            if (main_module.editPhotoPost(id, post)) {
                this.createDivPosts();
                return true;
            } else {
                return false;
            }
        },

        createDivPosts: function() {
            const divHTML = `
            <div class="my-flex-container">
            </div> `;
            let element = document.getElementById("posts");
            element.innerHTML = divHTML;
        },
    }
})();

function displayPosts(skip, top, filterCongig) {
    DomAPI.showPosts(main_module.getPhotoPosts(skip, top, filterCongig));
}

function addPhotoPost(post) {
    if (DomAPI.addPhotoPost(post)) {
        displayPosts();
        return true;
    } else {
        return false;
    }
}

function removePhotoPost(id) {
    if (DomAPI.removePhotoPost(id)) {
        displayPosts();
        return true;
    } else {
        return false;
    }
}

function editPhotoPost(id, newPost) {
    if (DomAPI.editPhotoPost(id, newPost)) {
        displayPosts();
        return true;
    } else {
        return false;
    }
}