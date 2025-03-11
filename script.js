const body = document.body;
const btnTheme = document.querySelector(".fa-moon");
const btnHamburger = document.querySelector(".fa-bars");

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

const getBodyTheme = localStorage.getItem("portfolio-theme");
const getBtnTheme = localStorage.getItem("portfolio-btn-theme");

addThemeClass(getBodyTheme, getBtnTheme);

const setTheme = (bodyClass, btnClass) => {
  body.classList.remove(localStorage.getItem("portfolio-theme"));
  btnTheme.classList.remove(localStorage.getItem("portfolio-btn-theme"));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem("portfolio-theme", bodyClass);
  localStorage.setItem("portfolio-btn-theme", btnClass);
};

const toggleTheme = () => {
  const isDarkMode = body.classList.contains("dark");

  if (isDarkMode) {
    setTheme("light", "fa-moon");
    removeSnowEffect();
    addDayEffect();
  } else {
    setTheme("dark", "fa-sun");
    addSnowEffect();
    removeDayEffect();
  }
};

btnTheme.addEventListener("click", toggleTheme);

const displayList = () => {
  const navUl = document.querySelector(".nav__list");

  if (btnHamburger.classList.contains("fa-bars")) {
    btnHamburger.classList.remove("fa-bars");
    btnHamburger.classList.add("fa-times");
    navUl.classList.add("display-nav-list");
  } else {
    btnHamburger.classList.remove("fa-times");
    btnHamburger.classList.add("fa-bars");
    navUl.classList.remove("display-nav-list");
  }
};

btnHamburger.addEventListener("click", displayList);

document.addEventListener("scroll", () => {
  const btnScrollTop = document.querySelector(".scroll-top");
  btnScrollTop.style.display = body.scrollTop > 500 || document.documentElement.scrollTop > 500 ? "block" : "none";
});

// Snow effect for dark mode
function addSnowEffect() {
  const snowContainer = document.createElement("div");
  snowContainer.classList.add("snow-container");
  document.body.appendChild(snowContainer);

  for (let i = 0; i < 50; i++) {
    let snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.animationDelay = `${Math.random() * 2}s`;
    snowContainer.appendChild(snowflake);
  }
}

function removeSnowEffect() {
  document.querySelector(".snow-container")?.remove();
}

// Day effect for light mode (Sun & Clouds)
function addDayEffect() {
  // Sun Element
  const sun = document.createElement("div");
  sun.classList.add("sun");
  document.body.appendChild(sun);

  // Cloud Container
  const cloudContainer = document.createElement("div");
  cloudContainer.classList.add("cloud-container");
  document.body.appendChild(cloudContainer);

  // Generate Clouds
  for (let i = 0; i < 5; i++) {
    let cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.top = `${Math.random() * 30 + 10}vh`;
    cloud.style.left = `${Math.random() * 100}vw`;
    cloud.style.animationDuration = `${Math.random() * 15 + 20}s`;
    cloudContainer.appendChild(cloud);
  }
}

function removeDayEffect() {
  document.querySelector(".sun")?.remove();
  document.querySelector(".cloud-container")?.remove();
}

document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.3 });
  projectCards.forEach((card) => observer.observe(card));

  // Typewriter Animation
  const roles = ["AI Engineer 🧠", "Gen AI Developer ✨", "Machine Learning Enthusiast 🚀"];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  const typingSpeed = 100, erasingSpeed = 50, delayBetweenRoles = 1500;

  function typeText() {
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;
    if (!isDeleting && charIndex <= roles[roleIndex].length) {
      typingText.innerHTML = roles[roleIndex].substring(0, charIndex++);
      setTimeout(typeText, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      typingText.innerHTML = roles[roleIndex].substring(0, charIndex--);
      setTimeout(typeText, erasingSpeed);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeText, delayBetweenRoles);
    }
  }
  setTimeout(typeText, 1000);

  // Initialize correct theme on page load
  if (body.classList.contains("light")) {
    addDayEffect();
  } else {
    removeDayEffect();
  }
});
