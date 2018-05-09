let Indexation = (function() {

    let index = 9;
    let size = 0;

    return {
        getIndex: function() {
            return index;
        },

        addIndex: function(value) {
            if (typeof value !== 'number') {
                return false;
            } else {
                index += value;
                return true;
            }
        },

        zeroIndex: function() {
            index = 0;
        },

        getSize: function() {
            return size;
        },

        addSize: function() {
            if (typeof value !== 'number') {
                return false;
            } else {
                size++;
                return true;
            }
        },

        subSize: function() {
            if (typeof value !== 'number') {
                return false;
            } else {
                size--;
                return true;
            }
        },
    }
})();


export {
    Indexation
};
