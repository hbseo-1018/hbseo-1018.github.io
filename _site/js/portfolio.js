gsap.registerPlugin(ScrollTrigger);

//pin 모드 스크롤링
let panels = gsap.utils.toArray(".sel");

 panels.forEach((panel, i) => {
     ScrollTrigger.create({
         trigger: panel,
         start: "top top",
         pin: true, 
         scrub: 0.5,
         pinSpacing: false 
     });
 });

//타이틀 애니메이션 
ScrollTrigger.create({
trigger: ".second",
start: "top 5%",
toggleClass: {targets: '.front01', className: 'front_white'}
});
 
ScrollTrigger.create({
trigger: ".second",
start: "top 5%",
toggleClass: {targets: '.line', className: 'line_on'}
});

ScrollTrigger.create({
trigger: ".three",
start: "top 5%",
toggleClass: {targets: '.front02', className: 'front_black'}
});

ScrollTrigger.create({
trigger: ".four",
start: "top 5%",
toggleClass: {targets: '.front03', className: 'front_white'}
});

ScrollTrigger.create({
trigger: ".five",
start: "top 5%",
toggleClass: {targets: '.front04', className: 'front_black'}
});


//행성 애니메이션
const planet = document.querySelector('.planet');
const orbit = document.querySelector('.orbit');

const planet2 = document.querySelector('.planet2');
const orbit2 = document.querySelector('.orbit2');

let angle = 0; // 초기 각도
let angle2 = 0; // 초기 각도

function animate() {

const orbitWidth = orbit.offsetWidth;
const orbitHeight = orbit.offsetHeight;
const orbitWidth2 = orbit2.offsetWidth;
const orbitHeight2 = orbit2.offsetHeight;

const centerX = orbit.offsetLeft + orbitWidth / 2;
const centerY = orbit.offsetTop + orbitHeight / 2;
const centerX2 = orbit2.offsetLeft + orbitWidth2 / 2;
const centerY2 = orbit2.offsetTop + orbitHeight2 / 2;

const radiusX = orbitWidth / 2;
const radiusY = orbitHeight / 2;
const radiusX2 = orbitWidth2 / 2;
const radiusY2 = orbitHeight2 / 2;

const radians = (angle * Math.PI) / 180;
const radians2 = (angle2 * Math.PI) / 180;

const x = centerX + radiusX * Math.cos(radians) - planet.offsetWidth / 2;
const y = centerY + radiusY * Math.sin(radians) - planet.offsetHeight / 2;
const x2 = centerX2 + radiusX2 * Math.cos(radians2) - planet2.offsetWidth / 2;
const y2 = centerY2 + radiusY2 * Math.sin(radians2) - planet2.offsetHeight / 2;

planet.style.left = `${x}px`;
planet.style.top = `${y}px`;
planet2.style.left = `${x2}px`;
planet2.style.top = `${y2}px`;

angle = (angle + 1) % 360;
angle2 = (angle2 + 1) % 360;

requestAnimationFrame(animate);
}

// 애니메이션 시작
animate();
