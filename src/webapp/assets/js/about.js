// 현재 연도를 가져와서 span 태그에 삽입
document.getElementById("year").textContent = new Date().getFullYear();

// 3D 모델 및 스크롤 관련 코드
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfefdfd);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.tonMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.5;
document.querySelector(".model").appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1);
mainLight.position.set(5, 10, 7.5);
scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 3);
fillLight.position.set(-5, 0, -5);
scene.add(fillLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
hemiLight.position.set(0, 25, 0);
scene.add(hemiLight);

function basicAnimate() {
    renderer.render(scene, camera);
    requestAnimationFrame(basicAnimate);
}
basicAnimate();

let model;
//기존 코드의 loader 부분 수정
//THREE.GLTFLoader가 아닌 GLTFLoader로 변경
const loader = new GLTFLoader();

//컨텍스트 경로를 동적으로 가져와서 절대 경로 대신 상대 경로로 변경
//오류 처리 추가 및 콘솔에 상세 정보 출력
loader.load('/assets/img/headD.glb', 
 // 성공 콜백
 function (gltf) {
     console.log('모델 로드 성공:', gltf);
     model = gltf.scene;
     model.traverse((node) => {
         if (node.isMesh) {
             if(node.material) {
                 node.material.metalness = 0.3;
                 node.material.roughness = 0.4;
                 node.material.envMapIntensity = 1.5;
             }
             node.castShadow = true;
             node.receiveShadow = true;
         }
     });

     // 모델 위치와 크기 조정
     const box = new THREE.Box3().setFromObject(model);
     const center = box.getCenter(new THREE.Vector3());
     model.position.sub(center);
     scene.add(model);

     const size = box.getSize(new THREE.Vector3());
     const maxDim = Math.max(size.x, size.y, size.z);
     camera.position.z = maxDim * 1.5;
     
     // 애니메이션 함수 호출
     model.scale.set(0, 0, 0);
     playInitialAnimation();
     
     // 기본 애니메이션 취소하고 메인 애니메이션 실행
     cancelAnimationFrame(basicAnimate);
     animate();
 },
 // 로딩 진행 콜백
 function (xhr) {
     console.log('모델 로딩 진행률: ' + (xhr.loaded / xhr.total * 100) + '%');
 },
 // 오류 콜백
 function (error) {
     console.error('모델을 불러오는 중 오류 발생:', error);
     // 오류 발생 시 기본 박스 객체라도 보여주기
     const geometry = new THREE.BoxGeometry(1, 1, 1);
     const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
     const cube = new THREE.Mesh(geometry, material);
     scene.add(cube);
     animate(); // 오류 발생해도 애니메이션은 계속 실행
 }
);

const floatAmplitude = 0.2;
const floatSpeed = 1.5;
const rotationSpeed = 0.3;
let isFloating = true;
let currentScroll = 0;

const stickyHeight = window.innerHeight;
const scannerSection = document.querySelector(".scanner");
const scannerPosition = scannerSection.offsetTop;
const scanContainer = document.querySelector(".scan-container");
gsap.set(scanContainer, { scale: 0 });

function playInitialAnimation() {
    if (model) {
        gsap.to(model.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
            ease: "power2.out"
        });
    }
    gsap.to(scanContainer, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
    });
}

ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "top -10",
    onEnterBack: () => {
        if (model) {
            gsap.to(model.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "power2.out",
            });
            isFloating = true;
        }
        gsap.to(scanContainer, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
        });
    },
});

ScrollTrigger.create({
    trigger: ".scanner",
    start: "top top",
    end: `${stickyHeight}px`,
    pin: true,
    onEnter: () => {
        if (model) {
            isFloating = false;
            model.position.y = 0;

            gsap.to(model.rotation, {
                y: model.rotation.y + Math.PI * 2,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to(model.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.5,
                        ease: "power2.in",
                        onComplete: () => {
                            gsap.to(scanContainer, {
                                scale: 0,
                                duration: 0.5,
                                ease: "power2.in",
                            });
                        },
                    });
                },
            });
        }
    },
    onLeaveBack: () => {
        gsap.set(scanContainer, { scale: 0 });
        gsap.to(scanContainer, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
        });
    },
});

lenis.on("scroll", (e) => {
    currentScroll = e.scroll;
});

function animate() {
    if (model) {
        if (isFloating) {
            const floatOffset = Math.sin(Date.now() * 0.001 * floatSpeed) * floatAmplitude;
            model.position.y = floatOffset;
        }

        const scrollProgress = Math.min(currentScroll / scannerPosition, 1);

        if (scrollProgress < 1) {
            model.rotation.x = scrollProgress * Math.PI * 2;
        }

        if (scrollProgress < 1) {
            model.rotation.y += 0.001 * rotationSpeed;
        }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// 추가된 애니메이션 섹션 코드
document.addEventListener('DOMContentLoaded', function() {
    // body 높이 조정
    document.body.style.height = '1200vh'; // 높이를 더 늘림 (기존 700vh → 1200vh)
    
    // 추가 스페이서 생성 및 추가
    const extraSpacer = document.createElement('div');
    extraSpacer.className = 'spacer';
    extraSpacer.style.height = '200vh'; // 충분한 높이의 스페이서 추가
    
    // DIGITAL 섹션 이후에 스페이서 추가
    const digitalSection = document.getElementById('digital-section');
    if (digitalSection && digitalSection.parentNode) {
        digitalSection.parentNode.insertBefore(extraSpacer, digitalSection.nextSibling);
    }
    
    // 검은 오버레이 스타일 변경 - 아래에서 위로 올라오도록 설정
    const blackOverlay = document.querySelector('.black-overlay');
    if (blackOverlay) {
        // 아래에서 위로 올라오는 효과를 위한 초기 설정
        blackOverlay.style.bottom = '0'; // 하단에 고정
        blackOverlay.style.top = 'auto'; // top 속성 제거
        blackOverlay.style.height = '0'; // 초기 높이 0
        blackOverlay.style.transition = 'height 1s ease'; // 부드러운 전환
    }
    
    // GSAP 설정
    gsap.registerPlugin(ScrollTrigger);
    
    // 각 섹션에 대한 애니메이션 함수
    function animateSection(sectionId, delay = 0) {
        // 섹션 자체 나타나게 하기
        gsap.to(`#${sectionId}`, {
            opacity: 1,
            duration: 0.8,
            delay: delay,
            scrollTrigger: {
                trigger: `#${sectionId}`,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
        
        // 타이틀 애니메이션 (아래에서 위로)
        gsap.to(`#${sectionId} .animation-title`, {
            y: 0,
            duration: 1.5,
            delay: delay + 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: `#${sectionId}`,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
        
        // 비디오 애니메이션 (왼쪽에서 오른쪽으로)
        gsap.to(`#${sectionId} .video-container`, {
            x: 0,
            duration: 1.5,
            delay: delay + 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: `#${sectionId}`,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
        
        // 콘텐츠 리스트 아이템 애니메이션 (위에서 아래로, 순차적으로)
        const contentItems = document.querySelectorAll(`#${sectionId} .content-item`);
        contentItems.forEach((item, index) => {
            gsap.to(item, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: delay + 0.9 + (index * 0.15),
                scrollTrigger: {
                    trigger: `#${sectionId}`,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    }
    
    // 각 섹션 애니메이션 실행
    animateSection("strategy-section", 0.3);
    animateSection("creative-section", 0.6);
    animateSection("digital-section", 0.9);

    // 스크롤 이벤트를 통해 페이지 끝 부분 감지
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 페이지 끝 부분에 도달했을 때 (전체 높이의 80% 이상 스크롤 시)
        if (scrollPosition + windowHeight > documentHeight * 0.8) {
            // 아래에서 위로 올라오는 효과
            gsap.to(blackOverlay, {
                height: '100vh',
                duration: 1,
                ease: "power2.out"
            });
        } else {
            gsap.to(blackOverlay, {
                height: 0,
                duration: 1,
                ease: "power2.in"
            });
        }
    });

    // 추가로 extraSpacer를 트리거로 사용
    ScrollTrigger.create({
        trigger: extraSpacer,
        start: "top 50%", // 스페이서가 화면 중앙에 오면
        onEnter: () => {
            // 아래에서 위로 올라오는 효과
            gsap.to(blackOverlay, {
                height: '100vh',
                duration: 1,
                ease: "power2.out"
            });
        },
        onLeaveBack: () => {
            gsap.to(blackOverlay, {
                height: 0,
                duration: 1,
                ease: "power2.in"
            });
        }
    });

    // Back to Top 버튼 기능
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});