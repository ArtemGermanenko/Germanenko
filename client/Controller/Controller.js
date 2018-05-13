import Model from '../Model/Model';
import View from '../View/View';
import {
  Indexation,
} from '../Components/index';

export let _username;

class Post {
  constructor(id, author, description, photoLink, hashTags, createdAt, likes) {
    this.id = id;
    this.createdAt = createdAt;
    this.photoLink = photoLink;
    this.author = author;
    this.description = description;
    this.hashTags = hashTags;
    this.likes = likes;
  }
}

const Controller = (function () {
  let isDownload = false;
  let imgId;
  let id;
  let posts;

  return {
    startPage() {
      View.startPage();
      View.eventFilt();
    },

    displayPosts(skip, top, filterConfig) {
      if (top === 'all') {
        top = Indexation.getSize();
      }
      if (top === 'last') {
        top = Indexation.getIndex();
      }

      Model.getPhotoPosts(skip, top, filterConfig)
        .then(
          response => (
            posts = JSON.parse(response),
            View.showPosts(posts),
            View.addEvents(posts)),
          (error) => { /* error page */ },
        );
    },

    clickButtonLoginMain() {
      _username = null;
      View.displayPageLogin();
    },

    wrongPassword() {
      View.makeRed();
    },

    correctPassword(username) {
      _username = username;
      View.mainPage(_username);
    },

    succsessExecute() {
      View.afterRemove();
      Controller.displayPosts(0, Indexation.getIndex(), undefined);
    },

    clickButtonLoginLogin() {
      const username = View.getLogin();
      const password = View.getPassword();
      if (username === '' || password === '' || username === 'Guest' || password === 'Press Enter if you are not registered') {
        _username = null;
        View.mainPage(_username);
      } else {
        Model.isUser(username, password)
          .then(
            response => Controller.correctPassword(response),
            (error) => { /* error page */ },
          );
      }
    },

    clickButtonExit() {
      View.afterButtonExit();
      _username = null;
      Controller.displayPosts(0, 9, undefined);
    },

    clickButtonLoad() {
      const index = Indexation.getIndex();
      Controller.displayPosts(index, 9, undefined);
      if (index + 9 >= Indexation.getSize()) {
        View.removeLoad();
      } else {
        Indexation.addIndex(9);
      }
    },

    clickButtonEdit(id) {
      return function () {
        View.editInputs(id);
      };
    },

    clickButtonLike(id) {
      return function () {
        let post;
        Model.getPhotoPost(id.toString()).then(
          response => (
            post = JSON.parse(response),
            Controller.likePostOrNot(post, id)),
          (error) => { /* error page */ },
        );
      };
    },

    likePostOrNot(post, id) {
      if (!post.likes.includes(_username)) {
        post.likes.push(_username);
        Model.editPhotoPost(id.toString(), { likes: post.likes })
          .then(
            response => View.makeLikeRed(id),
            (error) => { /* error page */ },
          );
      } else {
        const index = post.likes.indexOf(_username);
        post.likes.splice(index, 1);
        Model.editPhotoPost(id.toString(), { likes: post.likes })
          .then(
            response => View.makeLikeBlack(id),
            (error) => { /* error page */ },
          );
      }
    },

    clickButtonRemove(id) {
      return function () {
        View.removeFilterEdit();
        Model.removePhotoPost(id)
          .then(
            response => Controller.succsessExecute(),
            (error) => { /* error page */ },
          );
      };
    },

    clickButtonReadyEdit(id, post) {
      return function () {
        const post = View.getInputsEdit();
        Model.editPhotoPost(id, post)
          .then(
            response => Controller.succsessExecute(),
            (error) => { /* error page */ },
          );
        View.removeFilterEdit();
      };
    },

    clickButtonFilt() {
      const filterConfig = View.getFilterConfig();
      Model.getPhotoPosts(0, Indexation.getSize(), filterConfig)
        .then(
          response => (
            posts = JSON.parse(response),
            Controller.checkFiltration(posts)),
          (error) => { /* error page */ },
        );
    },

    checkFiltration(postsAfterFilter) {
      if (postsAfterFilter.length === 0) {
        View.createMessageFilter();
      } else {
        View.succsessExecute();
        View.showPosts(postsAfterFilter);
        View.removeLoad();
      }
    },

    clickButtonMessageFilter() {
      View.deleteButtonMessageFilter();
      View.mainPage(_username);
    },

    clickButtonAdd() {
      View.displayAddPage();
    },

    clickButtonEnterAdd() {
      const inputData = View.getInputDataAddEnter();
      if (inputData.Description) {
        View.makeBlueInputDescription();
        if (inputData.array.length !== 1 || inputData.array[0].toString() !== '') {
          View.makeBlueInputHtags();
          if (isDownload) {
            const likes = [];
            const post = new Post(`${id}`, _username, inputData.Description, `.${imgId}`, inputData.array, new Date(), likes);
            Model.addPhotoPost(post).then(
              response => (
                View.mainPage(_username),
                isDownload = false,
                imgId = undefined),
              (error) => { /* error page */ },
            );
            View.mainPage(_username);
            isDownload = false;
            imgId = undefined;
          }
        } else {
          View.makeRedInputHtags();
        }
      } else {
        View.makeRedInputDescription();
      }
    },

    uploadPhoto(file) {
      id = new Date().getTime();
      Model.uploadPhoto(file, id).then(
        response => (Controller.copmpletedUpload(response)),
        (error) => { /* error page */ },
      );
    },

    copmpletedUpload(idImg) {
      isDownload = true;
      imgId = idImg;
    },

  };
}());

export default Controller;
