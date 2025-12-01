document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector(".properties-dropdown");
  const dropdownMenu = document.querySelector(".properties-dropdown + .dropdown-menu");

  if (!dropdownToggle || !dropdownMenu) return;

  const closeMenu = () => {
    dropdownMenu.classList.remove("show");
    dropdownToggle.classList.remove("show");
    dropdownToggle.setAttribute("aria-expanded", "false");
  };

  dropdownToggle.addEventListener("click", function (event) {
    event.preventDefault();

    const isOpen = dropdownMenu.classList.contains("show");

    if (isOpen) {
      closeMenu();
    } else {
      dropdownMenu.classList.add("show");
      dropdownToggle.classList.add("show");
      dropdownToggle.setAttribute("aria-expanded", "true");
    }
  });

  document.addEventListener("click", function (event) {
    if (!dropdownMenu.classList.contains("show")) return;

    const target = event.target;
    if (!dropdownMenu.contains(target) && !dropdownToggle.contains(target)) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", closeMenu);

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or if it's the dropdown toggle
      if (href === '#' || this.classList.contains('properties-dropdown')) {
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');

        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const currentId = section.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});


