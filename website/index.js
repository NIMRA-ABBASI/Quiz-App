//MAIN PAGE
$(document).ready(function() {
  $('.carousel').carousel({
    interval: 2000
  })
});
 
// Scroll to the specified element
const aboutSection = document.getElementById('aboutSection');
 function  aboutBtn()
 {
  scrollToElement(aboutSection);
}

const Contactsection = document.getElementById('Contactsection');
function ContactBtn(){
  scrollToElement(Contactsection);
}
  

function scrollToElement(element) {
    element.scrollIntoView({
      behavior: 'smooth'
    });
}

function check(){
  window.location.href="login.html";
}

function readmore(){
  window.location.href="games.html";
}

