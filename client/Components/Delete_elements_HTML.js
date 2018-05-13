const Delete = (function () {
  return {

    posts() {
      document.getElementById('posts').remove();
    },

    buttonAddExit() {
      const add = document.getElementsByClassName('add')[0];
      const exit = document.getElementsByClassName('exit')[0];
      if (add) {
        add.remove();
      }
      if (exit) {
        exit.remove();
      }
    },

    post(id) {
      const editor = document.getElementsByClassName('editor')[0];
      if (editor) {
        editor.remove();
      }
    },

    buttonMessageFilter() {
      document.getElementsByClassName('filter_error')[0].remove();
    },
  };
}());

export default Delete;
