
  document.querySelector('.navbar-toggler').addEventListener('click', function () {
    document.querySelector('.navbar-collapse').classList.toggle('')});






  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });



  

  const swiper = new Swiper(".mySwiper", {
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
  



  /* BANNER CARRUSEL*/
  const promoSwiper = new Swiper(".promoSwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    effect: "fade"
  });

/* BANNER CARRUSEL*/



const images = document.querySelectorAll('.carousel img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

let current = 0;

function showImage(index) {
  images.forEach(img => img.classList.remove('active'));
  images[index].classList.add('active');
}

prev.addEventListener('click', () => {
  current = (current === 0) ? images.length - 1 : current - 1;
  showImage(current);
});

next.addEventListener('click', () => {
  current = (current === images.length - 1) ? 0 : current + 1;
  showImage(current);
});

showImage(current);

// Toggle sidebar móvil
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});










