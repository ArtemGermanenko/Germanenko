import Create from '../Components/Create_elements_HTML';
import Delete from '../Components/Delete_elements_HTML';
import Controller from '../Controller/Controller';

let View = (function() {
    return {
        mainPage: function(LogIn) {
            View.changeUser(LogIn);

            let section = document.getElementById("main");
            section.innerHTML = '';
            section.style.width = '75%';
            section.insertBefore(Create.divPosts(), document.getElementsByClassName('load_more')[0]);

            Controller.displayPosts(0, 9, undefined);

            document.getElementById("main").appendChild(Create.filters());
            document.getElementById("main").appendChild(Create.buttonLoad());

            let date = new Date();
            document.getElementsByClassName('date_footer')[0].textContent = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
            document.getElementsByClassName('load_more')[0].addEventListener('click', Controller.clickButtonLoad);

            View.eventFilt();
        },

        makeRed: function() {
            document.getElementsByClassName('email')[0].style.borderColor = "red";
            document.getElementsByClassName('password')[0].style.borderColor = "red";
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
                detail.innerHTML = Create.photoPost(photoPosts[i]);
                block.appendChild(detail);
            }
            section.appendChild(block);
        },

        addEvents: function(photoPosts) {
            for (var i = 0; i < photoPosts.length; i++) {
                let test = 'editPost:' + photoPosts[i].id;
                let button = document.getElementById(test);
                if (button) {
                    button.addEventListener('click', Controller.clickButtonEdit(photoPosts[i].id), false);
                }
            }
        },

        displayPageLogin: function() {
            let main = document.getElementById("main");
            main.innerHTML = '';

            const add = document.getElementsByClassName('add')[0];
            const exit = document.getElementsByClassName('exit')[0];

            if (add) {
                add.remove();
            }
            if (exit) {
                exit.remove();
            }

            document.getElementsByClassName('username')[0].textContent = '';
            main.style.width = '100%';
            document.getElementById("main").appendChild(Create.login());
            Create.addEventEnter();
        },

        startPage: function() {
            View.eventLoadMore();
            View.viewButtonLogin();
        },

        eventLoadMore: function() {
            document.getElementsByClassName('load_more')[0].addEventListener('click', Controller.clickButtonLoad);
        },

        eventFilt: function() {
            document.getElementById('filt').addEventListener('click', Controller.clickButtonFilt);
        },

        viewButtonLogin: function() {
            let login = Create.buttonLogin();

            if (!document.getElementsByClassName('add')[0]) {
                let header = document.getElementsByTagName('header')[0];
                header.insertBefore(login, header.children[1]);
            }
        },

        viewButtonExit: function() {
            let exit = Create.buttonExit();

            if (!document.getElementsByClassName('exit')[0]) {
                let header = document.getElementsByTagName('Header')[0];
                header.insertBefore(exit, header.children[1]);
                document.getElementsByClassName('exit')[0].addEventListener('click', Controller.click_btn_exit);
            }
        },

        viewButtonAdd: function() {
            const add = Create.buttonAdd();

            if (!document.getElementsByClassName('add')[0]) {
                let header = document.getElementsByTagName('Header')[0];
                header.insertBefore(add, header.children[1]);
                document.getElementsByClassName('add')[0].addEventListener('click', Controller.clickButtonAdd);
            }
        },

        editInputs: function(id) {
            View.removeFilterEdit();

            let editor = Create.editors(id);

            document.getElementsByClassName('filter')[0].appendChild(editor);
            document.getElementsByClassName('btn_filter')[2].addEventListener('click', Controller.clickButtonRemove(id));
            document.getElementsByClassName('btn_filter')[1].addEventListener('click', Controller.clickButtonReadyEdit(id));
        },

        getInputsEdit: function() {
            let Description = document.getElementsByClassName('input_name')[4];
            let hTags = document.getElementsByClassName('input_name')[5];
            let URL = document.getElementsByClassName('input_name')[6];
            var array = hTags.value.split('.,');

            const post = {
                description: Description.value,
                hashTags: array,
                photoLink: URL.value
            };
            return post;
        },

        removeFilterEdit: function() {
            let editor = document.getElementsByClassName('editor')[0];

            if (editor) {
                editor.remove();
            }
        },

        changeUser: function(user) {
            if (user) {
                document.getElementsByClassName('username')[0].textContent = user;

                View.viewButtonExit();
                View.viewButtonAdd();
            } else {
                document.getElementsByClassName('username')[0].textContent = 'Guest';

                View.viewButtonLogin();
            }
        },

        afterRemove() {
            Delete.posts();
            document.getElementById("main").insertBefore(Create.divPosts(), document.getElementsByClassName('load_more')[0]);
        },

        afterButtonExit: function() {
            Delete.buttonAddExit();
            View.viewButtonLogin();
            Delete.posts();

            document.getElementsByClassName('username')[0].textContent = 'Guest';
            document.getElementById("main").insertBefore(Create.divPosts(), document.getElementsByClassName('load_more')[0]);
        },

        createMessageFilter: function() {
            const message = document.createElement('p');
            message.classList.add('filter_error')
            message.textContent = 'The search has not given any results!';
            let main = document.getElementById('main');
            const button = document.createElement('button');
            button.classList.add('btn_error');
            button.textContent = 'Return';
            button.addEventListener('click', Controller.Main_Page);

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

        removeLoad: function() {
            const load = document.getElementsByClassName('load_more')[0];

            if (load) {
                load.remove();
            }
        },

        getFilterConfig: function() {
            let user = document.getElementsByClassName('input_name')[0];
            let hTags = document.getElementsByClassName('input_name')[1];
            let date = new Date(document.getElementsByClassName('input_name')[2].value);
            var array = hTags.value.split(',.');

            return {
                author: user.value,
                hashTags: array,
                createdAt: date
            };
        },

        addEventAddEnter: function() {
            document.getElementById('enterAdd').addEventListener('click', Controller.clickButtonEnterAdd);
        },

        addEventDownloadImage: function() {
            document.getElementsByClassName('fileInput')[0].addEventListener('change', (e) => {
                Controller.uploadPhoto(e.target.files[0]);
            });
        },

        displayAddPage: function() {
            const addPage = Create.add();
            document.getElementById('main').innerHTML = addPage;

            View.addEventAddEnter();
            View.addEventDownloadImage();
        },

        getInputDataAddEnter: function() {
            let Description = document.getElementsByClassName('input_name')[0].value;
            let hTags = document.getElementsByClassName('input_name')[1];
            let URL = document.getElementsByClassName('input_name')[2].value;
            var array = hTags.value.split(',');

            return {
                Description: Description,
                array: array,
                URL: URL
            };
        },

        addButtonReadyAdd: function() {
            if (!document.getElementsByClassName('ready')[0]) {
                const ready = Create.button_ready();
                document.getElementsByClassName('add-f')[0].appendChild(ready);
            }
        },

        makeRedInputDescription: function() {
            document.getElementsByClassName('input_name')[0].style.borderColor = "red";
        },

        makeRedInputHtags: function() {
            document.getElementsByClassName('input_name')[1].style.borderColor = "red";
        },

        makeBlueInputDescription: function() {
            document.getElementsByClassName('input_name')[0].style.borderColor = "#2a5885";
        },

        makeBlueInputHtags: function() {
            document.getElementsByClassName('input_name')[1].style.borderColor = "#2a5885";
        },

        getLogin: function() {
            return document.getElementsByClassName('email')[0].value;
        },

        getPassword: function() {
            return document.getElementsByClassName('password')[0].value;
        },
    }
})();

export default View;
