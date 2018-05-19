import Controller from '../Controller/Controller';
import { _username } from '../Controller/Controller';

const Create = (function () {
  return {
    photoPost(post) {
      const data = new Date(post.createdAt);
      const postHTML = `<div class="top_margin">${post.author}
               <i class="date">${data.getHours()}:${data.getMinutes()} / ${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}</i>
               </div>
               <img src="${post.photoLink}" class="photo">
               <div class="bottom_margin">
               ${document.getElementsByClassName('username')[0].textContent === 'Guest' ? '' :
    `${post.likes.find(like => like === _username) ? `<i class="likered material-icons md-48" id="like:${post.id}">favorite_border</i>` :
      `<i class="like material-icons md-48" id="like:${post.id}">favorite_border</i>`}`}
               <p class="hashtags">${post.hashTags}</p>
               ${_username === post.author ? `<i class="edit material-icons md-48" id="editPost:${post.id}">create</i>` : ''}
               </div>
               <p class="comments">${post.description}</p>`;
      return postHTML;
    },

    login() {
      const login = document.createElement('div');
      login.setAttribute('id', 'login-form');
      login.innerHTML = `
            <h1>Authorization</h1>
            <fieldset>
            <form action="javascript:void(0);" method="get">
            <input class="email" required value="Guest" onBlur="if(this.value==='')this.value='Guest'" onFocus="if(this.value==='Guest')this.value='' ">
            <input class="password" required value="Press Enter if you are not registered" onBlur="if(this.value==='')this.value='Press Enter if you are not registered'" onFocus="if(this.value==='Press Enter if you are not registered')this.value='' ">
            <input type="submit" value="Enter" id="btn_login_login">
            </form>
            </fieldset>`;
      return login;
    },

    addEventEnter() {
      const enter = document.getElementById('btn_login_login');
      enter.addEventListener('click', Controller.clickButtonLoginLogin);
    },

    divPosts() {
      const divPost = document.createElement('div');
      divPost.setAttribute('id', 'posts');
      divPost.innerHTML = '<div class="my-flex-container"></div>';
      return divPost;
    },

    filters() {
      const filterHTML = document.createElement('div');
      filterHTML.classList.add('filter');
      filterHTML.innerHTML = `
            <p class="filter_text">Filters:</p>
            <input type="text" class="input_name" placeholder="Username">
            <input type="text" class="input_name" placeholder="#Hashtag,#Hashtag">
            <input type="text" class="input_name" placeholder="Date: dd.mm.yyyy">
            <button class="input_name btn_filter" id='filt'>FILT</button>`;
      return filterHTML;
    },

    buttonLoad() {
      const loadButton = document.createElement('button');
      loadButton.classList.add('load_more');
      loadButton.textContent = 'Load more';
      return loadButton;
    },

    buttonLogin() {
      const buttonLogin = document.createElement('button');
      buttonLogin.classList.add('add');
      buttonLogin.classList.add('material-icons');
      buttonLogin.classList.add('md-48');
      buttonLogin.textContent = 'add';
      buttonLogin.style.float = 'right';
      buttonLogin.addEventListener('click', Controller.clickButtonLoginMain);
      return buttonLogin;
    },

    buttonAdd() {
      const buttonAdd = document.createElement('button');
      buttonAdd.classList.add('add');
      buttonAdd.classList.add('material-icons');
      buttonAdd.classList.add('md-48');
      buttonAdd.textContent = 'add';
      buttonAdd.style.float = 'left';
      return buttonAdd;
    },

    buttonExit() {
      const buttonExit = document.createElement('button');
      buttonExit.classList.add('exit');
      buttonExit.classList.add('material-icons');
      buttonExit.classList.add('md-48');
      buttonExit.textContent = 'close';
      buttonExit.addEventListener('click', Controller.clickButtonExit);
      return buttonExit;
    },

    add() {
      const addHTML = `<div id='posts'>
            <div class="my-flex-container">
            <div class="my-flex-block shadow add-p">
            <div class="top_margin">
            ${_username}
            <i class="date">dd.mm.yyyy</i>
            </div>
            <img src="https://i.stack.imgur.com/NdSwT.png" class="photo">
            <div class="bottom_margin">
            <p class="hashtags">#Example</p>
            </div>
            <p class="comments">Example</p>
            </div>
            </div>
            </div>
            <div class="filter add-f">
            <p class="filter_text">Add:</p>
            <input type="text" class="input_name" placeholder="Description">
            <input type="text" class="input_name" placeholder="#Hastag,,#Hashtag">
            <input type="file" class="fileInput input_name" accept="image/*">
            <button class="input_name btn_filter" id="enterAdd">Enter</button>
            </div>`;
      return addHTML;
    },

    buttonReady() {
      const buttonReady = document.createElement('button');
      buttonReady.classList.add('input_name');
      buttonReady.classList.add('btn_filter');
      buttonReady.classList.add('ready');
      buttonReady.textContent = 'Ready';
      return buttonReady;
    },

    editors(id) {
      const edit = document.createElement('div');
      edit.classList.add('editor');
      edit.innerHTML = `<p class="filter_text">Edit:</p>
            <input type="text" class="input_name" placeholder="Description">
            <input type="text" class="input_name" placeholder="#Hastag,,#Hashtag">
            <button class="input_name btn_filter">Ready</button>
            <button class="input_name btn_filter">Remove</button>`;
      return edit;
    },
  };
}());

export default Create;
