//IN THIS FILE THERE ARE MERODS TO CREATE ELEMENT&BUTTONS 

class Post {
    constructor(author, description, photoLink, hashTags, createdAt, likes) {
        this.id = String(indexation_of_id.get_index());
        this.createdAt = createdAt;
        this.photoLink = photoLink;
        this.author = author;
        this.description = description;
        this.hashTags = hashTags;
        this.likes = likes;
    }
}

let create_elements = (function() {
    return {
        createHTMLLogin: function() {
            let login =
                document.createElement('div');
            login.setAttribute('id', 'login-form');
            login.innerHTML = `
    <h1>Authorization</h1>
    <fieldset>
    <form action="javascript:void(0);" method="get">
    <input class="email" required value="Guest" onBlur="if(this.value==='')this.value='Guest'" onFocus="if(this.value==='Guest')this.value='' ">
    <input class="password" required value="Press Enter if you are not registered" onBlur="if(this.value==='')this.value='Press Enter if you are not registered'" onFocus="if(this.value==='Press Enter if you are not registered')this.value='' ">
    <input type="submit" value="Enter" onclick="add_created_HTML.Main_Page(document.getElementsByClassName('email')[0].value, document.getElementsByClassName('password')[0].value)">
    </form>
    </fieldset>`;
            return login;
        },

        changeUser: function(user) {
            let buttons = document.getElementsByClassName('material-icons');
            for (var i = buttons.length - 1; i >= 0; i--) {
                buttons[i].remove();
            }

            if (user) {
                document.getElementsByClassName('username')[0].textContent = user;
                this.createButtonAdd();
                this.createButtonExit();
            } else {
                document.getElementsByClassName('username')[0].textContent = 'Guest';
                this.createButtonLogIn();
            }
        },

        createDivPosts: function() {
            let divPost = document.createElement('div');
            divPost.setAttribute('id', 'posts');
            divPost.innerHTML = '<div class="my-flex-container"></div>';
            document.getElementById("main").insertBefore(divPost, document.getElementsByClassName('load_more')[0]);
        },


        delete_and_create: function() {
            document.getElementById('posts').remove();
            create_elements.createDivPosts();
        },

        createFilters: function() {
            let filter_HTML = document.createElement('div');
            filter_HTML.classList.add('filter');
            filter_HTML.innerHTML = `
 <p class="filter_text">Filters:</p>
 <input type="text" class="input_name" placeholder="Username">
 <input type="text" class="input_name" placeholder="#Hashtag,#Hashtag">
 <input type="text" class="input_name" placeholder="Date: dd.mm.yyyy">
 <button class="input_name btn_filter" onclick="create_elements.btn_filtration()">FILT</button>`;
            document.getElementById("main").appendChild(filter_HTML);
        },

        btn_filtration: function() {
            let posts = document.getElementsByClassName('my-flex-container')[0];

            while (posts.lastChild) {
                posts.lastChild.remove();
            }

            let user = document.getElementsByClassName('input_name')[0];
            let hTags = document.getElementsByClassName('input_name')[1];
            let date = new Date(document.getElementsByClassName('input_name')[2].value);
            var array = hTags.value.split(',.');

            let posts_to_show = main_module.getPhotoPosts(0, photoPosts.length, {
                author: user.value,
                hashTags: array,
                createdAt: date
            });
            if (posts_to_show.length !== 0) {
                displayPosts(0, photoPosts.length, {
                    author: user.value,
                    hashTags: array,
                    createdAt: date
                });
                const load = document.getElementsByClassName('load_more')[0];
                if (load) {
                    load.remove();
                }
            } else {
                this.create_message_filter();
            }
        },

        createButtonLoad: function() {
            const load_button = document.createElement('button');
            load_button.classList.add('load_more');
            load_button.setAttribute('onclick', ' add_created_HTML.Load_more_button()');
            load_button.textContent = 'Load more';
            document.getElementById("main").appendChild(load_button);
        },

        createButtonAdd: function() {
            let button_add = document.createElement('button');
            button_add.classList.add('add');
            button_add.classList.add('material-icons');
            button_add.classList.add('md-48');
            button_add.textContent = 'add';
            button_add.setAttribute('onclick', 'add_created_HTML.Add_photo_post()');
            let header = document.getElementsByTagName('Header')[0];
            header.insertBefore(button_add, header.children[1]);
        },

        createButtonExit: function() {
            let button_exit = document.createElement('button');
            button_exit.classList.add('exit');
            button_exit.classList.add('material-icons');
            button_exit.classList.add('md-48');
            button_exit.textContent = 'close';
            button_exit.setAttribute('onclick', 'add_created_HTML.Log_in()');
            let header = document.getElementsByTagName('Header')[0];
            header.insertBefore(button_exit, header.children[1]);
        },

        createButtonLogIn: function() {
            let button_in = document.createElement('button');
            button_in.classList.add('exit');
            button_in.classList.add('material-icons');
            button_in.classList.add('md-48');
            button_in.textContent = 'add';
            button_in.setAttribute('onclick', 'add_created_HTML.Log_in()');
            let header = document.getElementsByTagName('Header')[0];
            header.insertBefore(button_in, header.children[1]);
        },

        getDate: function() {
            let date = new Date();
            document.getElementsByClassName('date_footer')[0].textContent = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
        },

        button_like: function(id) {
            let post = main_module.getPhotoPost(id.toString());
            post.likes.push(username);
            let like = document.getElementById(id).getElementsByClassName('like')[0];
            like.setAttribute('onclick', `create_elements.button_dislike(${id})`);
            like.classList.remove('like');
            like.classList.add('likered');
            autoSave.save(post);
        },

        button_dislike: function(id) {
            let post = main_module.getPhotoPost('' + id);
            const index = post.likes.indexOf(username);
            delete post.likes[index];
            let like = document.getElementById(id).getElementsByClassName('likered')[0];
            like.setAttribute('onclick', `create_elements.button_like(${id})`);
            like.classList.remove('likered');
            like.classList.add('like');
            autoSave.save(post);
        },

        del_btn_add_exit: function() {
            const add = document.getElementsByClassName('add')[0];
            const exit = document.getElementsByClassName('exit')[0];
            if (add) {
                add.remove();
            }
            if (exit) {
                exit.remove();
            }
        },

        create_message_filter: function() {
            const message = document.createElement('p');
            message.classList.add('filter_error')
            message.textContent = 'The search has not given any results!';
            let main = document.getElementById('main');
            const button = document.createElement('button');
            button.classList.add('btn_error');
            button.textContent = 'Return';
            button.setAttribute('onclick', 'add_created_HTML.Main_Page(username, "")');

            while (main.lastChild) {
                main.lastChild.remove();
            }

            main.appendChild(message);
            main.appendChild(button);

            let buttons = document.getElementsByClassName('material-icons');
            for (var i = buttons.length - 1; i >= 0; i--) {
                buttons[i].remove();
            }

            document.getElementsByClassName('username')[0].textContent = '';
        },

        edit_post: function(id) {
            let editor = document.getElementsByClassName('editor')[0];
            if (editor) {
                editor.remove();
            }
            let edit = document.createElement('div');
            edit.classList.add('editor');
            edit.innerHTML = `<p class="filter_text">Edit:</p>
        <input type="text" class="input_name" placeholder="Description">
        <input type="text" class="input_name" placeholder="#Hastag,,#Hashtag">
        <input type="text" class="input_name" placeholder="URL of new Photo">
        <button class="input_name btn_filter" onclick="create_elements.btn_edit(${id})">Ready</button>
         <button class="input_name btn_filter" onclick="create_elements.remove_post(${id})">Remove</button>`;
            document.getElementsByClassName('filter')[0].appendChild(edit);
        },

        btn_edit: function(id) {
            let Description = document.getElementsByClassName('input_name')[4];
            let hTags = document.getElementsByClassName('input_name')[5];
            let URL = document.getElementsByClassName('input_name')[6];
            var array = hTags.value.split(',');
            editPhotoPost(id.toString(), {
                description: Description.value,
                hashTags: array,
                photoLink: URL.value
            });
            document.getElementsByClassName('editor')[0].remove();
            add_created_HTML.Main_Page(username, undefined);
            autoSave.save(main_module.getPhotoPost(id.toString()));
        },

        create_add: function() {
            const addHTML = `<div id='posts'>
   <div class="my-flex-container">
      <div class="my-flex-block shadow add-p">
         <div class="top_margin">
            ${username}
            <i class="date">${new Date()}</i>
         </div>
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Kvadrato.svg/1200px-Kvadrato.svg.png" class="photo">
         <div class="bottom_margin">
            <p class="hashtags"></p>
         </div>
         <p class="comments"></p>
      </div>
   </div>
</div>
<div class="filter add-f">
   <p class="filter_text">Add:</p>
   <input type="text" class="input_name" placeholder="Description">
   <input type="text" class="input_name" placeholder="#Hastag,,#Hashtag">
   <input type="text" class="input_name" placeholder="URL of new Photo">
   <button class="input_name btn_filter" onclick="create_elements.btn_enter_add()">Enter</button>
</div>`;
            return addHTML;
        },

        create_btn_ready: function() {
            let btn = document.createElement('button');
            btn.classList.add('input_name');
            btn.classList.add('btn_filter');
            btn.classList.add('ready');
            btn.setAttribute('onclick', 'create_elements.return_after_add()');
            btn.textContent = 'Ready';
            document.getElementsByClassName('add-f')[0].appendChild(btn);
        },

        btn_enter_add: function() {
            let Description = document.getElementsByClassName('input_name')[0].value;
            let hTags = document.getElementsByClassName('input_name')[1];
            let URL = document.getElementsByClassName('input_name')[2].value;
            var array = hTags.value.split(',');
            if (Description) {
                document.getElementsByClassName('comments')[0].textContent = Description;
            }
            if (array) {
                document.getElementsByClassName('hashtags')[0].textContent = array;
            }
            if (URL) {
                document.getElementsByClassName('photo')[0].src = `${URL}`;
            }

            if (Description && array && URL) {
                if (!document.getElementsByClassName('ready')[0]) {
                    create_elements.create_btn_ready();
                }

                let likes = [];
                indexation_of_id.add_index(1);
                const post = new Post(username, Description, `${URL}`, array, new Date(), likes);
                addPhotoPost(post);
                autoSave.save_new(post);
            }
        },

        return_after_add: function() {
            document.getElementById('main').textContent = '';
            add_created_HTML.Main_Page(username, undefined);
        },

        remove_post: function(id) {
            let editor = document.getElementsByClassName('editor')[0];
            if (editor) {
                editor.remove();
            }
            removePhotoPost(id.toString());
            autoSave.save_remove(id.toString());
        }
    }
})();