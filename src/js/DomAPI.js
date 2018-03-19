 let username;

 let DomAPI = (function() {
  return {
    changeUser:function(user){
     if (user) {
      document.getElementsByClassName('username')[0].textContent = user;
      let button_exit = document.getElementsByClassName('exit')[0];
      button_exit.setAttribute('onclick', 'sign_out()');
      button_exit.textContent = 'close';
      let button_add = document.getElementsByClassName('add')[0];
      button_add.textContent = 'add';
    } else {
      document.getElementsByClassName('username')[0].textContent = 'Guest';
      document.querySelector('.add.material-icons.md-48').remove();
      let sign_in = document.createElement('div');
      sign_in.classList.add('exit');
      sign_in.classList.add('material-icons');
      sign_in.classList.add('md-48');
      sign_in.textContent = 'add';
      document.querySelector('.exit.material-icons.md-48').replaceWith(sign_in);
    }
  },


  createHTMLLogin:function(){
    let login =
    `
    <div id="login-form">
    <h1>Authorization</h1>
    <fieldset>
    <form action="javascript:void(0);" method="get">
    <input class="email" required value="Guest" onBlur="if(this.value==='')this.value='Guest'" onFocus="if(this.value==='Guest')this.value='' ">
    <input class="password" required value="Press Enter if you are not registered" onBlur="if(this.value==='')this.value='Сlick Enter if you are not registered'" onFocus="if(this.value==='Сlick Enter if you are not registered')this.value='' ">
    <input type="submit" value="Enter">
    </form>
    </fieldset>
    </div> `
    return login;
  },

  createPhotoPost: function(post) {
   if (main_module.validatePhotoPost(post)) {
    let data = post.createdAt;
    let postHTML = `
    <div class="top_margin">
    ${post.author}
    <i class="date">${data.getHours()}:${data.getMinutes()} / ${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}</i>
    </div>
    <img src="${post.photoLink}"
    class="photo">

    ${
     post.author === username ?
     `
     <div class="bottom_margin">
     ${post.likes.find(like => like === username) ? '<i class="likered material-icons md-48">favorite_border</i>': '<i class="like material-icons md-48">favorite_border</i>'}
     <p class="hashtags">${post.hashTags}</p>
     <i class="edit material-icons md-48">create</i>
     </div>
     `
     :
     `
     <div class="bottom_margin">
     ${post.likes.find(like => like === username) ? '<i class="likered material-icons md-48">favorite_border</i>': '<i class="like material-icons md-48">favorite_border</i>'}
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
 let index = 0;
 let block;
 let detail;
 block = document.createElement('div');
 block.classList.add('my-flex-container');
 for (let i = 0; i < size; i++) {
  detail = document.createElement('div');
  detail.classList.add('my-flex-block');
  detail.classList.add('shadow');
  detail.id = photoPosts[index].id;
  detail.innerHTML = this.createPhotoPost(photoPosts[index]);
  index++;
  block.appendChild(detail);
}
section.appendChild(block);
},

editPhotoPost: function(id, post) {
 let postToEdit = document.getElementById(id);
 if (postToEdit) {
  let elem = document.createElement('div');
  elem.classList.add('shadow');
  elem.id = id;
  elem.innerHTML = this.createPhotoPost(post);
  postToEdit.replaceWith(elem);
}
},

}})();

function Main_Page(login, password){
  if(login === 'Guest'){
    username = null;
  } else {
    username = login;
  }
  DomAPI.changeUser(username);
  document.getElementById("login").style.display = "none";
  document.getElementsByClassName("filter")[0].style.display = "block";
  document.getElementsByClassName("load_more")[0].style.display = "inline";
  displayPosts(0,9,undefined);
}


function Load_more_button(){
 displayPosts(0,9,undefined);
}

function displayPosts(skip, top, filterConfig) {
 let section = document.getElementById('posts');

 DomAPI.showPosts(main_module.getPhotoPosts(skip, top, filterConfig));
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
