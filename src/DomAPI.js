//module
let DomAPI = (function() {

    let user = 'Artem Germanenko';

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
                let postHTML = `
                <div class="top_margin">
                ${post.author}
                <i class="date">${post.createdAt}</i>
                </div>
                <img src="${post.photoLink}"
                class="photo">

                ${
                    post.author === user ?
                    `
                    <div class="bottom_margin">
                    <i class="like material-icons md-48">favorite_border</i>
                    <p class="hashtags">${post.hashTags}</p>
                    <i class="edit material-icons md-48">create</i>
                    </div>
                    `
                    :
                    `
                    <div class="bottom_margin">
                    <i class="like material-icons md-48">favorite_border</i>
                    <p class="hashtags">${post.hashTags}</p>
                    </div>
                    `
                }
                <p class="comments">
                ${post.description}
                </p>`;
                return postHTML;
            } else {
                return false;
            }
        },


        addPhotoPost: function(photoPost) {
            photoPost.createdAt = new Date();
            if (main_module.addPhotoPost(photoPost)) {
                createPhotoPost(photoPost);
                return true;
            } else return false;
        },

        removePhotoPost: function(id) {
            if (main_module.removePhotoPost(id)) {
                return true;
            } else return false;
        },

        showPosts: function(photoPosts) {
            let section = document.getElementById('posts');
            let size = photoPosts.length;
            if (size % 2 === 0) {
                size = size / 2;
            } else {
                size = size / 2 - 0.5 + 1;
            }
            let index = 0;
            let block;
            let detail;
            for (let i = 0; i < size; i++) {
                block = document.createElement('div');
                block.classList.add('my-flex-container');

                detail = document.createElement('div');
                detail.classList.add('my-flex-block');
                detail.classList.add('shadow');
                detail.id = photoPosts[index].id;
                detail.innerHTML = this.createPhotoPost(photoPosts[index]);
                block.appendChild(detail);
                index++;
                if (index !== photoPosts.length) {
                    detail = document.createElement('div');
                    detail.classList.add('my-flex-block');
                    detail.classList.add('shadow');
                    detail.id = photoPosts[index].id;
                    detail.innerHTML = this.createPhotoPost(photoPosts[index]);
                    block.appendChild(detail);
                    index++;
                }
                section.appendChild(block);
            }
        },

        editPhotoPost(id, post) {
            let postToEdit = document.getElementById(id);
            if (postToEdit) {
                let elem = document.createElement('div');
                elem.classList.add('shadow');
                elem.id = id;
                elem.innerHTML = this.createPhotoPost(post);
                postToEdit.replaceWith(elem);
            }
        }
    }
})();

function displayPosts() {
    let section = document.getElementById('posts');
    while (section.lastChild)
        section.lastChild.remove();
    DomAPI.showPosts(main_module.getPhotoPosts(0, 10, undefined));
}

function addPhotoPost(post) {
    if (main_module.addPhotoPost(post)) {
        let feed = document.getElementById('posts');

        while (feed.lastChild)
            feed.lastChild.remove();

        DomAPI.showPosts(main_module.getPhotoPosts());
        return true;
    } else return false;
}

function removePhotoPost(id) {
    if (DomAPI.removePhotoPost(id)) {
        displayPosts();
        return true;
    }
    return false;
}

function editPhotoPost(id, newPost) {
    if (main_module.editPhotoPost(id, newPost)) {
        DomAPI.editPhotoPost(id, main_module.getPhotoPost(id));
        return true;
    } else
        return false;
}