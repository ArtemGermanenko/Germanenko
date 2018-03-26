//WORK WITH POSTS TASK4

let main_module = (function() {
    function compare(PostOne, PostTwo) {
        return Date.parse(PostTwo.createdAt) - Date.parse(PostOne.createdAt);
    }

    photoPosts = photoPosts.sort(compare);

    return {
        getPhotoPosts: function(skip, top, filterConfig) {
            if (typeof skip !== 'number') {
                skip = 0;
            }

            if (typeof top !== 'number') {
                top = 10;
            }

            if (filterConfig) {
                let photoPostsToRemake = photoPosts;
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
            return photoPosts.slice(skip, skip + top);
        },

        getPhotoPost: function(ID) {
            return photoPosts.find(posts => posts.id === ID);
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
            if (!this.validatePhotoPost(photoPost) || photoPosts.findIndex(index => index.id === photoPost.id) !== -1) {
                return false;
            }
            photoPosts.push(photoPost);
            photoPosts.sort(compare);
            return true;
        },

        editPhotoPost: function(ID, photoPost) {
            let index = photoPosts.findIndex(post => post.id === ID);
            if (index === -1) {
                return false;
            }
            if (!this.validatePhotoPost(photoPosts[index])) {
                return false;
            }
            if (photoPost.author || photoPost.id || photoPost.createdAt) {
                return false;
            }
            if (photoPost.description && photoPost.description !== '') {
                photoPosts[index].description = photoPost.description;
            }
            if (photoPost.photoLink && photoPost.photoLink !== '') {
                photoPosts[index].photoLink = photoPost.photoLink;
            }
            if (photoPost.hashTags && photoPost.hashTags.toString() !== '') {
                photoPosts[index].hashTags = photoPost.hashTags;
            }
            return true;
        },

        removePhotoPost: function(ID) {
            if (photoPosts.findIndex(post => post.id == ID) !== -1) {
                photoPosts.splice(photoPosts.findIndex(post => post.id == ID), 1);
                return true;
            }
            return false;
        },
    }
})();