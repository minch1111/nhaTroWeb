window.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop > 300) {
    document.querySelector('.scroll-to-top').classList.add('fix');
  }
  else {
    document.querySelector('.scroll-to-top').classList.remove('fix');
  }
})