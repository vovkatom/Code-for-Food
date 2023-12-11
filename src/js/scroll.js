$(document).ready(function(){
  // приховуємо кнопку #back-top
  $("#back-top").hide();
  
  // поява/зникнення кнопки #back-top
  $(window).scroll(function (){
      if ($(this).scrollTop() > 600){
          $('#back-top').fadeIn();
      } else{
          $('#back-top').fadeOut();
      }
  });

  // при кліку на посилання плавно піднімаємося вгору
  $('#back-top a').click(function (){
      $('body,html').animate({
          scrollTop:0
      }, 800);
      return false;
  });
});
