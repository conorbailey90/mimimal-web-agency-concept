const scrollable = document.querySelector('.scrollable');
const projectsSection = document.querySelector('.projects');
const projectTitle = document.querySelector('.proj-title');
const splash = document.querySelector('.splash');
const cursor = document.querySelector('.cursor');
const header = document.querySelector('.header');
const about = document.querySelector('.about');
const projects = document.querySelector('.projects');
const contact = document.querySelector('.contact');

let projectImages = [...document.querySelectorAll('img')];
let navLinks = [...document.querySelectorAll('li')];

// ProjTop is used to keep the projects tect in the centre of the screen on scroll
let projTop = 0;
let mouseX = mouseY = mouseTargetX = mouseTargetY = 0;

// Linear Interpolation

let current = 0;
let target = 0;
let ease = 0.075;

function lerp(start, end, t){
    return start * ( 1 - t ) + end * t;
}

// Initialize page

function setDimentions(){

    document.body.style.height = `${scrollable.getBoundingClientRect().height}px`;
    projectheaderTop = projectsSection.getBoundingClientRect().top;
}

window.addEventListener('resize', setDimentions);

projectImages.forEach(image => {
    addListener(image);
})

navLinks.forEach(link => {
    addListener(link);
})

function addListener(item){
    item.addEventListener('mouseenter', () => {
        cursor.classList.add('img-active');
    });

    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('img-active');
    })
}

// Custom cursor

window.addEventListener('mousemove', (e)=>{
    mouseTargetX = e.clientX;
    mouseTargetY = e.clientY;
})


function animate(){

    // Smooth scroll
  
    target = window.scrollY;
    current = lerp(current, target, ease);
    scrollable.style.transform = `translate3d(0, ${-current}px, 0)`;

    // Mouse

    mouseX = lerp(mouseX, mouseTargetX, 0.5);
    mouseY = lerp(mouseY, mouseTargetY, 0.5);
    cursor.style.transform = `translate3d(${mouseX - (cursor.getBoundingClientRect().width / 2)}px, ${mouseY - (cursor.getBoundingClientRect().height / 2)}px, 0)`;
        
    animateProjects();

    requestAnimationFrame(animate);
}

function animateProjects(){
    let { top, height } = projectsSection.getBoundingClientRect();
    // if(top <= 0 && top >= -(height * 0.5)){
    //     projTop = -top;
    // }else if(top > 0){
    //     projTop = 0
    // }else{
    //     projTop = height * 0.5
    // }

    projTop = top <= 0 && top >= -(height * 0.5) ? -top : top > 0 ? 0 : height * 0.5;
    projectTitle.style.transform = `translate3d(0, ${projTop}px,0)`;

    for(let i = 0; i < projectImages.length; i++){
        let { top } = projectImages[i].parentElement.getBoundingClientRect();
        if (i % 3 == 0 || i % 4 == 0){
            projectImages[i].style.transform = `translate3d(0, ${top* 0.9}px, 0) rotate(${top* 0.04}deg)`;
        }else{
            projectImages[i].style.transform = `translate3d(0, ${top* 0.1}px, 0) rotate(${top * 0.02}deg)`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        splash.querySelector('h1').style.color = 'azure';
        setTimeout(()=>{
            splash.querySelector('h1').style.opacity = '.9';
        },500)
    },1000)
    setTimeout(() => {
        // splash.style.transform = `translate3d(0, ${-window.innerHeight * 2}px, 0)`;
        splash.style.opacity = 0;

    },  3000)
});

setDimentions();
animate()
