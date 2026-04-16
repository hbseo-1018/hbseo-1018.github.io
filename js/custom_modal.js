
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

//work hover event
const work_a = gsap.fromTo('.is-work-01 .third_trigger_inner',
    {scale: 1},
    {scale: 1.08, duration: 0.35, ease: 'power2.out', paused: true},
)
const work_b = gsap.fromTo('.is-work-02 .third_trigger_inner',
    {scale: 1},
    {scale: 1.08, duration: 0.35, ease: 'power2.out', paused: true},
)
const work_c = gsap.fromTo('.is-work-03 .third_trigger_inner',
    {scale: 1},
    {scale: 1.08, duration: 0.35, ease: 'power2.out', paused: true},
)
work_a.pause();
work_b.pause();
work_c.pause();

document.querySelector('.is-work-01').addEventListener("mouseover", function () {
    work_a.play();
});
document.querySelector('.is-work-01').addEventListener("mouseleave", function () {
    work_a.reverse();
});
document.querySelector('.is-work-02').addEventListener("mouseover", function () {
    work_b.play();
});
document.querySelector('.is-work-02').addEventListener("mouseleave", function () {
    work_b.reverse();
});
document.querySelector('.is-work-03').addEventListener("mouseover", function () {
    work_c.play();
});
document.querySelector('.is-work-03').addEventListener("mouseleave", function () {
    work_c.reverse();
});

const text = "Portfolio of HyeBin"; // 타이핑 문구
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

animate();

const modal = document.getElementById('portfolioModal');
const modalInner = modal ? modal.querySelector('.portfolio_modal_inner') : null;
const modalTriggers = document.querySelectorAll('[data-modal-path]');
const modalPathCandidates = (fileName) => [
    `./layers/${fileName}`,
    `../layers/${fileName}`,
    `/layers/${fileName}`
];

async function fetchModalContent(fileName) {
    const paths = modalPathCandidates(fileName);

    for (const path of paths) {
        try {
            const response = await fetch(path, { cache: 'no-store' });
            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
        }
    }

    throw new Error('modal-content-load-failed');
}

function setModalLoading() {
    if (!modalInner) return;
    modalInner.innerHTML = '<div class="portfolio_modal_loading">프로젝트 내용을 불러오는 중입니다.</div>';
}

function setModalError() {
    if (!modalInner) return;
    modalInner.innerHTML = `
        <div class="portfolio_modal_loading is_error">
            프로젝트 내용을 불러오지 못했습니다.<br>
            파일 경로와 배포 위치를 확인해주세요.
        </div>
    `;
}

function openModal() {
    if (!modal) return;
    modal.classList.add('is_open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal_open');
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('is_open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal_open');
}

async function handleModalOpen(fileName) {
    if (!modal || !modalInner || !fileName) return;

    setModalLoading();
    openModal();

    try {
        const html = await fetchModalContent(fileName);
        modalInner.innerHTML = html;
    } catch (error) {
        setModalError();
    }
}

modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        handleModalOpen(trigger.dataset.modalPath);
    });

    trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleModalOpen(trigger.dataset.modalPath);
        }
    });
});

if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target.closest('[data-modal-close]')) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('is_open')) {
        closeModal();
    }
});
