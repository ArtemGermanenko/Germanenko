//SAVE INFORMATION IN LOCALSTORAGE

let autoSave = (function() {     

    return {
        save: function(post) {
            let photo_posts = JSON.parse(localStorage.getItem('posts'));
            let index = photo_posts.findIndex(element => element.id === post.id);
            photo_posts[index] = post;
            localStorage.removeItem('posts');
            Posts = JSON.stringify(photo_posts);
            localStorage.setItem('posts', Posts);
        },

        save_new: function(post){
            let photo_posts = JSON.parse(localStorage.getItem('posts'));
            photo_posts.push(post);
            localStorage.removeItem('posts');
            Posts = JSON.stringify(photo_posts);
            localStorage.setItem('posts', Posts);
        },

        save_remove: function(id){
             let photo_posts = JSON.parse(localStorage.getItem('posts'))
             let index = photo_posts.findIndex(element => element.id === id);
             console.log(photo_posts[index]);
             photo_posts.pop(index);
             Posts = JSON.stringify(photo_posts);
            localStorage.setItem('posts', Posts);
        }
    }
})();


///////////////////////////////////////////////////////////////////////
// IF IT IS U FIRST LOAD UNCOMMENT THIS TO LOAD POSTS FROM JSON FILE //
//             localStorage.setItem('posts', Posts);                 //
///////////////////////////////////////////////////////////////////////
let photoPosts = JSON.parse(localStorage.getItem('posts'));