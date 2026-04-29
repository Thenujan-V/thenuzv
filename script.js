
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-overlay');
  if (loader) loader.classList.add('hidden');
});

const dot = document.createElement('div');
dot.classList.add('cursor-dot');

const border = document.createElement('div');
border.classList.add('cursor-border');

document.body.appendChild(dot);
document.body.appendChild(border);

document.addEventListener('mousemove', (e) => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';

  border.style.left = e.clientX + 'px';
  border.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  dot.style.opacity = '0';
  border.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  dot.style.opacity = '1';
  border.style.opacity = '1';
});

// For navigation bar active link highlighting
function initNavigationHighlight() {
  var nav = document.querySelector("nav");
  if (!nav) return;

  var navLinks = Array.prototype.slice.call(
    nav.querySelectorAll('a[href^="#"]')
  );

  if (!navLinks.length) return;

  var sections = navLinks
    .map(function (link) {
      var target = link.getAttribute("href");
      return target ? document.querySelector(target) : null;
    })
    .filter(function (section) {
      return !!section;
    });

  if (!sections.length) return;

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
    });
  }

  function updateActiveLinkOnScroll() {
    var header = document.querySelector("header");
    var headerOffset = header ? header.offsetHeight + 24 : 120;
    var scrollPosition = window.pageYOffset + headerOffset;
    var viewportMiddle = window.pageYOffset + window.innerHeight * 0.45;
    var currentSectionId = sections[0].id;

    sections.forEach(function (section) {
      if (viewportMiddle >= section.offsetTop) {
        currentSectionId = section.id;
      }
    });

    var pageBottom = window.pageYOffset + window.innerHeight;
    var documentHeight = document.documentElement.scrollHeight;
    if (pageBottom >= documentHeight - 4) {
      currentSectionId = sections[sections.length - 1].id;
    }

    setActiveLink(currentSectionId);
  }

  nav.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;

    var targetId = link.getAttribute("href");
    if (targetId) {
      setActiveLink(targetId.replace("#", ""));
    }
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.15,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  window.addEventListener("scroll", updateActiveLinkOnScroll);
  window.addEventListener("load", updateActiveLinkOnScroll);
  updateActiveLinkOnScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigationHighlight);
} else {
  initNavigationHighlight();
}

// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const menuIconI = document.getElementById('menu-icon-i');

if (menuToggle && navLinks && menuIconI) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuIconI.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuIconI.className = 'fa-solid fa-bars';
    });
  });
}


// Collapsible sections for skills
//For Skills section
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;

    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}


// Filter functionality

articlesFilterSelection("all")
function articlesFilterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("content");
  if (c === "all") c = "";
  // Add the "show" class
  for (i = 0; i < x.length; i++) {
    filterRemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) filterAddClass(x[i], "show");
  }
}

projectsFilterSelection("all")
function projectsFilterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("project");
  if (c === "all") c = "";
  // Add the "show" class 
  for (i = 0; i < x.length; i++) {
    filterRemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) filterAddClass(x[i], "show");
  }
}

// Show filtered elements
function filterAddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function filterRemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button for projects (highlight it)

var projectsFilterBtnContainer = document.getElementById("projectsFilterBtnContainer");
var projectFilterBtns = projectsFilterBtnContainer.getElementsByClassName("filterBtn");
for (var i = 0; i < projectFilterBtns.length; i++) {
  projectFilterBtns[i].addEventListener("click", function () {
    // Remove active from all buttons
    for (let j = 0; j < projectFilterBtns.length; j++) {
      projectFilterBtns[j].classList.remove("active");
    }
    // Add active to the clicked one
    this.classList.add("active");
  });
}

// Add active class to the current control button for articles (highlight it)
var btnContainer = document.getElementById("filterBtnContainer");
var btns = btnContainer.getElementsByClassName("filterBtn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    // Remove active from all buttons
    for (let j = 0; j < btns.length; j++) {
      btns[j].classList.remove("active");
    }
    // Add active to the clicked one
    this.classList.add("active");
  });
}

//Get current year for footer
document.addEventListener('DOMContentLoaded', function () {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }
});

