
gsap.registerPlugin(ScrollTrigger);

// let panels = gsap.utils.toArray(".sel");

// panels.forEach((panel, i) => {
//     ScrollTrigger.create({
//         trigger: panel,
//         start: "top top",
//         pin: true, 
//         scrub: 0.5,
//         pinSpacing: false 
//     });
// });
    

//intro
const tl = gsap.timeline({});
tl.to('.index_full p', {duration: 0.1, opacity:0, delay: 5})
tl.to('.index_full', {duration:1, scaleY:0}, '+=0.5');

gsap.registerPlugin(ScrollTrigger);
//introduce title
const textElements = gsap.utils.toArray('.info_text');
const t2 = gsap.timeline({});
textElements.forEach(text => {
    t2.to(text, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
        trigger: '.info_title',
        start: 'center 80%',
        end: 'center 20%%',
        scrub: true,
        },
    });
});

//introduce flow text
const t3 = gsap.timeline({});
t3.fromTo('.text_03', {x:'-100%'}, {x: '0',duration: 10,ease: 'circ.out',stagger: 0.5})
.fromTo('.text_02', {x:'100%'}, {x: '0',duration: 10,ease: 'circ.out',stagger: 0.5},'<')
.fromTo('.text_01', {x:'-100%'}, {x: '0',duration: 10,ease: 'circ.out',stagger: 0.5},'<')

ScrollTrigger.create({
    trigger:'.info_title',
    start: 'top 20%',
    end:'top 60%',
    scrub: 10,
    animation: t3,
    
});

//work right text
// gsap.registerPlugin(ScrollTrigger);

// let typeSplit = new SplitType('.work_text', {
//     types: 'lines, words, chars',
//     tagName: 'span',
// });

// gsap.from('.work_text .word', {
//     y: "100%",
//     opacity: 1,
//     duration: 0.5,
//     ease: 'circ.out',
//     stagger: 0.1,
//     scrollTrigger: {
//         trigger: ".third",
//         start:'top 20%',
//         end:'bottom bottom',
//         scrub: 5,
//     }
// },
    
// );

//work hover event
const work_a = gsap.fromTo('.work_01 .cont_box',
    {x:'100%'}, 
    {x: '0',duration: 1, stagger: 0.5}, 
)
const work_b = gsap.fromTo('.work_02 .cont_box',
    {x:'100%'}, 
    {x: '0',duration: 1, stagger: 0.5}, 
)
const work_c = gsap.fromTo('.work_03 .cont_box',
    {x:'100%'}, 
    {x: '0',duration: 1, stagger: 0.5}, 
)
work_a.pause();
work_b.pause();
work_c.pause();

document.querySelector('.work_01').addEventListener("mouseover", function () {
    work_a.play();
});
document.querySelector('.work_01').addEventListener("mouseleave", function () {
    work_a.reverse();
});
document.querySelector('.work_02').addEventListener("mouseover", function () {
    work_b.play();
});
document.querySelector('.work_02').addEventListener("mouseleave", function () {
    work_b.reverse();
});
document.querySelector('.work_03').addEventListener("mouseover", function () {
    work_c.play();
});
document.querySelector('.work_03').addEventListener("mouseleave", function () {
    work_c.reverse();
});

const text = "Portfolio of Jay"; // 타이핑 문구
const ttt = 0;
let index = 0;
let speed = 120; // 속도 

function typeWriter() {
    if (index < text.length) {
        document.querySelector('.index_txt').textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

typeWriter();

//행성 애니메이션
const planet = document.querySelector('.planet');
const orbit = document.querySelector('.orbit');

let angle = 0; // 초기 각도

function animate() {

const orbitWidth = orbit.offsetWidth;
const orbitHeight = orbit.offsetHeight;

const centerX = orbit.offsetLeft + orbitWidth / 2;
const centerY = orbit.offsetTop + orbitHeight / 2;

const radiusX = orbitWidth / 2;
const radiusY = orbitHeight / 2;

const radians = (angle * Math.PI) / 180;

const x = centerX + radiusX * Math.cos(radians) - planet.offsetWidth / 2;
const y = centerY + radiusY * Math.sin(radians) - planet.offsetHeight / 2;

planet.style.left = `${x}px`;
planet.style.top = `${y}px`;

angle = (angle + 1) % 360;

requestAnimationFrame(animate);
}

// 애니메이션 시작
animate();
