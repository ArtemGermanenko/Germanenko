const Indexation = (function () {
  let index = 9;
  let size = 0;

  return {
    getIndex() {
      return index;
    },

    addIndex(value) {
      if (typeof value !== 'number') {
        return false;
      }
      index += value;
      return true;
    },

    zeroIndex() {
      index = 0;
    },

    getSize() {
      return size;
    },

    addSize() {
      if (typeof value !== 'number') {
        return false;
      }
      size++;
      return true;
    },

    subSize() {
      if (typeof value !== 'number') {
        return false;
      }
      size--;
      return true;
    },
  };
}());


export {
  Indexation,
};
