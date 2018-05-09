let ServerController = (function() {
    function compare(PostOne, PostTwo) {
        return Date.parse(PostTwo.createdAt) - Date.parse(PostOne.createdAt);
    }
    return {
        getPhotoPosts: function(skip, top, filterConfig) {
            if (!skip) {
                skip = 0;
            }

            if (!top) {
                top = 10;
            }
            if (filterConfig) {
                let photoPostsToRemake = this;
                if (filterConfig.author && filterConfig.author !== '') {
                    photoPostsToRemake = photoPostsToRemake.filter(post => post.author === filterConfig.author);
                }

                if (filterConfig.hashTags && filterConfig.hashTags.toString() !== '') {
                    photoPostsToRemake = photoPostsToRemake.filter(post => {
                        return filterConfig.hashTags.every((tag) => {
                            return post.hashTags.includes(tag);
                        });
                    });
                }

                if (filterConfig.createdAt && filterConfig.createdAt.toString() !== 'Invalid Date') {
                    filterConfig.createdAt = new Date(filterConfig.createdAt);
                    photoPostsToRemake = photoPostsToRemake.filter(post => new Date(post.createdAt) <= new Date(filterConfig.createdAt));
                }

                return photoPostsToRemake.slice(skip, skip + top);
            }
            return this.slice(skip, skip + top);
        },

        getPhotoPost: function(ID) {
            return this.find(posts => posts.id === ID);
        },

        validatePhotoPost: function(photoPost) {
            if (typeof photoPost.description !== 'string') {
                return false;
            }
            if (photoPost.description.length === 0) {
                return false;
            }
            if (typeof photoPost.author !== 'string') {
                return false;
            }
            if (photoPost.author.length === 0) {
                return false;
            }
            if (typeof photoPost.id !== 'string') {
                return false;
            }
            if (photoPost.id.length === 0) {
                return false;
            }
            if (typeof photoPost.photoLink !== 'string') {
                return false;
            }
            if (photoPost.photoLink.length === 0) {
                return false;
            }
            if (!(photoPost.createdAt.toString() !== 'Invalid Date')) {
                return false;
            }
            if (!(photoPost.hashTags instanceof Array)) {
                return false;
            }
            if (!(photoPost.likes instanceof Array)) {
                return false;
            }
            return true;
        },

        addPhotoPost: function(photoPost) {
            if (!ServerController.validatePhotoPost(photoPost) || this.findIndex(index => index.id === photoPost.id) !== -1) {
                return false;
            }
            this.push(photoPost);
            this.sort(compare);
            return true;
        },

        editPhotoPost: function(ID, photoPost) {
            let index = this.findIndex(post => post.id === ID);
            if (index === -1) {
                return false;
            }
            if (!ServerController.validatePhotoPost(this[index])) {
                return false;
            }
            if (photoPost.author || photoPost.id || photoPost.createdAt) {
                return false;
            }
            if (photoPost.description && photoPost.description !== '') {
                this[index].description = photoPost.description;
            }
            if (photoPost.photoLink && photoPost.photoLink !== '') {
                this[index].photoLink = photoPost.photoLink;
            }
            if (photoPost.hashTags && photoPost.hashTags.toString() !== '') {
                this[index].hashTags = photoPost.hashTags;
            }
            return true;
        },

        removePhotoPost: function(ID) {
            if (this.findIndex(post => post.id === ID) !== -1) {
                this.splice(this.findIndex(post => post.id === ID), 1);
                return true;
            }
            return false;
        },

        getUser: function(LogIn, Password) {
            if (this.findIndex(user => (user.LogIn.toString() === LogIn.toString() && user.Password.toString() === Password.toString())) !== -1) {
                return true;
            } else {
                return false;
            }
        }
    }
})();

module.exports = ServerController;
