var request = new XMLHttpRequest();
var requestURL = '../Posts.json';
request.open('GET', requestURL);
request.responseType = 'text'; 


  var superHeroesText = request.response; // get the string from the response
  var photoPosts = JSON.parse(superHeroesText); // convert it to an object
  console.log(photoPosts);
