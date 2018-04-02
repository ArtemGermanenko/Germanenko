//CREATING MAIN PAGES

 let add_created_HTML = (function() {
     function Delete_all(element) {
         while (element.lastChild)
             element.lastChild.remove();
     }

     return {
         Main_Page: function(login, password) {
             if (login === 'Guest') {
                 username = null;
             } else {
                 username = login;
             }
             create_elements.changeUser(username);
             let section = document.getElementById("main");
             Delete_all(section);
             section.style.width = '75%';
             create_elements.createDivPosts();
             indexation.zero_index();
             displayPosts(0, 10, undefined);
             indexation.add_index(10);
             create_elements.createFilters();
             create_elements.createButtonLoad();
             create_elements.getDate();
         },

         Log_in: function() {
             let element = document.getElementById("main");
             Delete_all(element);
             create_elements.del_btn_add_exit();
             document.getElementsByClassName('username')[0].textContent = '';
             element.style.width = '100%';
             element.appendChild(create_elements.createHTMLLogin());
             create_elements.getDate();
         },

         Load_more_button: function() {
             let index = indexation.get_index();

             displayPosts(index, 10, undefined);
             if (index + 10 >= photoPosts.length) {
                 document.getElementsByClassName('load_more')[0].remove();
             } else {
                 indexation.add_index(10);
             }
         },

         Add_photo_post: function() {
             let element = document.getElementById('main');
             element.innerHTML = create_elements.create_add();
         }
     }
 })();