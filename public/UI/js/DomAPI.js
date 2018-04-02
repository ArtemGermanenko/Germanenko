 //DOMAPI TASK5

 let username;

 let DomAPI = (function() {
     return {
         createPhotoPost: function(post) {
             if (main_module.validatePhotoPost(post)) {
                 const data = new Date(post.createdAt);
                 const postHTML = `<div class="top_margin">${post.author}
                                    <i class="date">${data.getHours()}:${data.getMinutes()} / ${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}</i>
                                   </div>
                                    <img src="${post.photoLink}" class="photo">
                                   <div class="bottom_margin">
                                    ${ document.getElementsByClassName('username')[0].textContent === "Guest" ?  `` :
                                   `${post.likes.find(like => like === username) ?  `<i class="likered material-icons md-48" onclick="create_elements.button_dislike(${post.id})">favorite_border</i>` : 
                                   `<i class="like material-icons md-48" onclick="create_elements.button_like(${post.id})">favorite_border</i>`}`}
                                    <p class="hashtags">${post.hashTags}</p>
                                    ${username === post.author ? `<i class="edit material-icons md-48" onclick="create_elements.edit_post(${post.id})">create</i>` : ``}
                                    </div>
                                    <p class="comments">${post.description}</p>`;
                 return postHTML;
             } else {
                 return false;
             }
         },

         addPhotoPost: function(photoPost) {
             photoPost.createdAt = new Date();
             if (main_module.addPhotoPost(photoPost)) {
                 return true;
             } else {
                 return false
             };
         },

         removePhotoPost: function(id) {
             if (main_module.removePhotoPost(id)) {
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
                 create_elements.createDivPosts();
                 return true;
             } else {
                 return false;
             }
         },

     }
 })();

 function displayPosts(skip, top, filterConfig) {
     DomAPI.showPosts(main_module.getPhotoPosts(skip, top, filterConfig));
 }

 function addPhotoPost(post) {
     if (DomAPI.addPhotoPost(post)) {
         return true;
     } else {
         return false;
     }
 }

 function removePhotoPost(id) {
     if (DomAPI.removePhotoPost(id)) {
         create_elements.delete_and_create();
         displayPosts(0, indexation.get_index(), undefined);
         return true;
     } else {
         return false;
     }
 }

 function editPhotoPost(id, newPost, filterConfig) {
     if (DomAPI.editPhotoPost(id, newPost)) {
         create_elements.delete_and_create();
         displayPosts(0, indexation.get_index(), undefined);
         return true;
     } else {
         return false;
     }
 }

 displayPosts(0, 10, undefined);