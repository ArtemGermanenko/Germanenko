import Create from '../Components/Create_elements_HTML';
import Delete from '../Components/Delete_elements_HTML';
import Controller from '../Controller/Controller';

const View = (function () {
  return {
    mainPage(LogIn) {
      View.changeUser(LogIn);

      const section = document.getElementById('main');
      section.innerHTML = '';
      section.style.width = '75%';
      section.insertBefore(Create.divPosts(), document.getElementsByClassName('load_more')[0]);

      Controller.displayPosts(0, 9, ['', '', '']);

      document.getElementById('main').appendChild(Create.filters());
      document.getElementById('main').appendChild(Create.buttonLoad());

      const date = new Date();
      document.getElementsByClassName('date_footer')[0].textContent = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
      document.getElementsByClassName('load_more')[0].addEventListener('click', Controller.clickButtonLoad);

      View.eventFilt();
    },

    addButtonLoad() {
      document.getElementById('main').appendChild(Create.buttonLoad());
      document.getElementsByClassName('load_more')[0].addEventListener('click', Controller.clickButtonLoad);
    },

    makeRed() {
      document.getElementsByClassName('email')[0].style.borderColor = 'red';
      document.getElementsByClassName('password')[0].style.borderColor = 'red';
    },

    showPosts(photoPosts) {
      const section = document.getElementById('posts');
      const block = document.getElementsByClassName('my-flex-container')[0];
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

    addEvents(photoPosts) {
      for (let i = 0; i < photoPosts.length; i++) {
        let test = `editPost:${photoPosts[i].id}`;
        let button = document.getElementById(test);
        if (button) {
          button.addEventListener('click', Controller.clickButtonEdit(photoPosts[i].id), false);
        }
        test = `like:${photoPosts[i].id}`;
        button = document.getElementById(test);
        if (button) {
          button.addEventListener('click', Controller.clickButtonLike(photoPosts[i].id), false);
        }
      }
    },

    displayPageLogin() {
      const main = document.getElementById('main');
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
      document.getElementById('main').appendChild(Create.login());
      Create.addEventEnter();
    },

    startPage() {
      View.eventLoadMore();
      View.viewButtonLogin();
    },

    eventLoadMore() {
      document.getElementsByClassName('load_more')[0].addEventListener('click', Controller.clickButtonLoad);
    },

    eventFilt() {
      document.getElementById('filt').addEventListener('click', Controller.clickButtonFilt);
    },

    viewButtonLogin() {
      const login = Create.buttonLogin();

      if (!document.getElementsByClassName('add')[0]) {
        const header = document.getElementsByTagName('header')[0];
        header.insertBefore(login, header.children[1]);
      }
    },

    viewButtonExit() {
      const exit = Create.buttonExit();

      if (!document.getElementsByClassName('exit')[0]) {
        const header = document.getElementsByTagName('Header')[0];
        header.insertBefore(exit, header.children[1]);
        document.getElementsByClassName('exit')[0].addEventListener('click', Controller.click_btn_exit);
      }
    },

    viewButtonAdd() {
      const add = Create.buttonAdd();

      if (!document.getElementsByClassName('add')[0]) {
        const header = document.getElementsByTagName('Header')[0];
        header.insertBefore(add, header.children[1]);
        document.getElementsByClassName('add')[0].addEventListener('click', Controller.clickButtonAdd);
      }
    },

    editInputs(id) {
      View.removeFilterEdit();

      const editor = Create.editors(id);

      document.getElementsByClassName('filter')[0].appendChild(editor);
      document.getElementsByClassName('btn_filter')[2].addEventListener('click', Controller.clickButtonRemove(id));
      document.getElementsByClassName('btn_filter')[1].addEventListener('click', Controller.clickButtonReadyEdit(id));
    },

    getInputsEdit() {
      const Description = document.getElementsByClassName('input_name')[4];
      const hTags = document.getElementsByClassName('input_name')[5];
      const URL = document.getElementsByClassName('input_name')[6];
      const array = hTags.value.split('.,');

      const post = {
        description: Description.value,
        hashTags: array,
        photoLink: URL.value,
      };
      return post;
    },

    removeFilterEdit() {
      const editor = document.getElementsByClassName('editor')[0];

      if (editor) {
        editor.remove();
      }
    },

    changeUser(user) {
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
      document.getElementById('main').insertBefore(Create.divPosts(), document.getElementsByClassName('load_more')[0]);
    },

    afterButtonExit() {
      Delete.buttonAddExit();
      View.viewButtonLogin();
      Delete.posts();

      document.getElementsByClassName('username')[0].textContent = 'Guest';
      document.getElementById('main').insertBefore(Create.divPosts(), document.getElementsByClassName('load_more')[0]);
    },

    createMessageFilter() {
      const message = document.createElement('p');
      message.classList.add('filter_error');
      message.textContent = 'The search has not given any results!';
      const main = document.getElementById('main');
      const button = document.createElement('button');
      button.classList.add('btn_error');
      button.textContent = 'Return';
      button.addEventListener('click', Controller.mainPageAfterFilt);

      while (main.lastChild) {
        main.lastChild.remove();
      }

      main.appendChild(message);
      main.appendChild(button);

      const buttons = document.getElementsByClassName('material-icons');
      for (let i = buttons.length - 1; i >= 0; i--) {
        buttons[i].remove();
      }

      document.getElementsByClassName('username')[0].textContent = '';

      View.addEventMessageFilter();
    },

    addEventMessageFilter() {
      document.getElementsByClassName('filter_error')[0].addEventListener('click', Controller.clickButtonMessageFilter);
    },

    deleteButtonMessageFilter() {
      Delete.ButtonMessageFilter();
    },

    removeLoad() {
      const load = document.getElementsByClassName('load_more')[0];

      if (load) {
        load.remove();
      }
    },

    getFilterConfig() {
      const user = document.getElementsByClassName('input_name')[0];
      const hTags = document.getElementsByClassName('input_name')[1];
      const date = new Date(document.getElementsByClassName('input_name')[2].value);
      const array = hTags.value.split(',.');

      return {
        author: user.value,
        hashTags: array,
        createdAt: date,
      };
    },

    addEventAddEnter() {
      document.getElementById('enterAdd').addEventListener('click', Controller.clickButtonEnterAdd);
    },

    addEventDownloadImage() {
      document.getElementsByClassName('fileInput')[0].addEventListener('change', (e) => {
        Controller.uploadPhoto(e.target.files[0]);
      });
    },

    displayAddPage() {
      const addPage = Create.add();
      document.getElementById('main').innerHTML = addPage;

      View.addEventAddEnter();
      View.addEventDownloadImage();
    },

    getInputDataAddEnter() {
      const Description = document.getElementsByClassName('input_name')[0].value;
      const hTags = document.getElementsByClassName('input_name')[1];
      const URL = document.getElementsByClassName('input_name')[2].value;
      const array = hTags.value.split(',');

      return {
        Description,
        array,
        URL,
      };
    },

    addButtonReadyAdd() {
      if (!document.getElementsByClassName('ready')[0]) {
        const ready = Create.button_ready();
        document.getElementsByClassName('add-f')[0].appendChild(ready);
      }
    },

    makeRedInputDescription() {
      document.getElementsByClassName('input_name')[0].style.borderColor = 'red';
    },

    makeRedInputHtags() {
      document.getElementsByClassName('input_name')[1].style.borderColor = 'red';
    },

    makeBlueInputDescription() {
      document.getElementsByClassName('input_name')[0].style.borderColor = '#2a5885';
    },

    makeBlueInputHtags() {
      document.getElementsByClassName('input_name')[1].style.borderColor = '#2a5885';
    },

    getLogin() {
      return document.getElementsByClassName('email')[0].value;
    },

    getPassword() {
      return document.getElementsByClassName('password')[0].value;
    },

    makeLikeRed(id) {
      const idPost = `like:${id}`;
      document.getElementById(idPost).style.color = 'Red';
    },

    makeLikeBlack(id) {
      const idPost = `like:${id}`;
      document.getElementById(idPost).style.color = '#A9A9A9';
    },
  };
}());

export default View;
