let Delete = (function() {
    return {

        posts: function() {
            document.getElementById('posts').remove();
        },

        buttonAddExit: function() {
            const add = document.getElementsByClassName('add')[0];
            const exit = document.getElementsByClassName('exit')[0];
            if (add) {
                add.remove();
            }
            if (exit) {
                exit.remove();
            }
        },

        post: function(id) {
            let editor = document.getElementsByClassName('editor')[0];
            if (editor) {
                editor.remove();
            }
        },
    }
})();

export default Delete;
