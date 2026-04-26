gsap.registerPlugin(SplitText);

let split, animation, lines;

function splitLines(element) {
    const el = document.querySelector(element);
    const lines = el.innerHTML.trim().split(/<br\s*\/?>|\n/);
    el.innerHTML = lines.map(line => `<span class="line">${line}</span>`).join("<br>");
    return el.querySelectorAll(".line");
}


function textAnimation() {
    animation && animation.revert();
    animation = gsap.from(split.lines, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.8,
        ease: "power3",
        stagger: 0.25
    })
};

function setup() {
    split && split.revert();
    animation && animation.revert();
    split = SplitText.create(".text", { type: "chars,words,lines" });
}

// setup();

window.addEventListener("load", () => {
    lines = splitLines(".text");
    setup();
    textAnimation();
});

window.addEventListener("resize", setup);


const faders = document.querySelectorAll('.animation-fade-in');

const appearOptions = {
    threshold: 0
};

const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-show');
        }
        else {
            entry.target.classList.remove('fade-in-show')
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

const fadersBox = document.querySelectorAll('.animation-fade-in-same');

const appearOnPageScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-same-show');
        }
        else {
            entry.target.classList.remove('fade-in-same-show')
        }
    });
}, appearOptions);

fadersBox.forEach(fader => {
    appearOnPageScroll.observe(fader);
});


const slideLeftElements = document.querySelectorAll('.animation-slide-left');

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animation-visible')
    } else {
      entry.target.classList.remove('animation-visible')
    }
  });
}, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });

slideLeftElements.forEach(el => slideObserver.observe(el));


const zoomInElements = document.querySelectorAll('.animation-zoom-in');

const zoomInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animation-visible');
    } else {
      entry.target.classList.remove('animation-visible');
    }
  });
}, { threshold: 0.2 });

zoomInElements.forEach(el => zoomInObserver.observe(el));


const zoomOutElements = document.querySelectorAll('.animation-zoom-out');

const zoomOutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animation-visible');
    } else {
      entry.target.classList.remove('animation-visible');
    }
  });
}, { threshold: 0.2 });

zoomOutElements.forEach(el => zoomOutObserver.observe(el));
