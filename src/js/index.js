 //MODULES TO WORD WITH ID AND INDEXS OF POSTS

 let indexation = (function() {

     let index = 10;

     return {
         get_index: function() {
             return index;
         },

         add_index: function(value) {
             if (typeof value !== 'number') {
                 return false;
             } else {
                 index += value;
                 return true;
             }
         },

         zero_index: function() {
             index = 0;
         }
     }
 })();

 let indexation_of_id = (function() {

     let index = 60;

     return {
         get_index: function() {
             return index;
         },

         add_index: function(value) {
             if (typeof value !== 'number') {
                 return false;
             } else {
                 index += value;
                 return true;
             }
         },

         zero_index: function() {
             index = 0;
         }
     }
 })();