(function(){
  var h=document.querySelector('header.site');
  addEventListener('scroll',function(){h.classList.toggle('stuck',scrollY>10)},{passive:true});
  var b=document.querySelector('.menu-btn'),m=document.getElementById('menu');
  b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}});
  document.getElementById('yr').textContent=new Date().getFullYear();
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e,i){e.style.transitionDelay=(i%3*80)+'ms';io.observe(e)});
})();
