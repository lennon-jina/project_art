document.addEventListener("DOMContentLoaded", () => {
    // 윈도우 너비 계산
    const windowWidth = window.innerWidth;
    const wrapperWidth = 180;
    const finalposition = windowWidth - wrapperWidth;
    const stepDistance = finalposition / 6;
    const tl = gsap.timeline();
    
    // 초기 위치 설정 - count-wrapper를 왼쪽으로 이동시켜 시작점 변경
    gsap.set(".count-wrapper", {
        left: "0%",
        transform: "translateX(0)",
        transformOrigin: "left center"
    });
    
    // 그 다음 카운트 애니메이션 실행
    tl.to(".count", {
        x: -900,
        duration: 0.85,
        delay: 0.5,
        ease: "power4.inOut",
    });
    
    for (let i = 1; i <= 6; i++) {
        const xPosition = -900 + i * 180;
        tl.to(".count", {
            x: xPosition,
            duration: 0.85,
            ease: "power4.inOut",
            onStart: () => {
                gsap.to(".count-wrapper", {
                    x: stepDistance * i,
                    duration: 0.85,
                    ease: "power4.inOut",
                });
            }
        });
    }
    
    gsap.set(".revealer svg", { scale: 0 });
    
    const delays = [6, 6.5, 7];
    document.querySelectorAll(".revealer svg").forEach((el, i) => {
        gsap.to(el, {
            scale: 45,
            duration: 1.5,
            ease: "power4.inOut",
            delay: delays[i],
            onComplete: () => {
                if(i === delays.length - 1) {
                    // 로더 제거
                    document.querySelector(".loader").remove();
                    // main4 콘텐츠 표시
                    showMain4Content();
                }
            },
        });
    });
    
    gsap.to(".header h1", {
        onStart: () => {
            gsap.to(".toggle-btn", {
                scale: 1,
                duration: 1,
                ease: "power4.inOut",
            });
            gsap.to(".line p", {
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            })
        },
        rotateY: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        delay: 8,
    });
    
    // main4 콘텐츠를 표시하는 함수
    function showMain4Content() {
        // main3의 컨테이너는 유지하고 main4 콘텐츠만 표시
        const main4Content = document.getElementById("main4-content");
        main4Content.style.display = "block";
        
        // main4.js 코드 실행
        setupMain4();
    }
});

// main4.js 부분 - 원래 코드 유지
function setupMain4() {
    const itemsArray = [];
    const cursor = document.querySelector(".cursor");

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - cursor.offsetWidth / 2,
            y: e.clientY - cursor.offsetHeight / 2,
            duration: 0.5,
            ease: "power2.out",
        });
    });

    document.addEventListener("click", function(event) {
        const clickSfx = new Audio("./assets/2953635-uhd_4096_2160_24fps.mp4");
        clickSfx.play();

        const itemType = Math.random() > 0.5 ? "video" : "image";
        let container = document.createElement("div");
        let elementWidth = 700;

        if (itemType === "video") {
            const videoNumber = Math.floor(Math.random() * 7) + 1;
            container.innerHTML = `<div class="video-container">
                                    <video autoplay loop>
                                        <source src="./assets/vid-${videoNumber}.mp4" type="video/mp4"/>
                                    </video>
                                </div>`;
        } else {
            const imgNumber = Math.floor(Math.random() * 6) + 1;
            container.innerHTML = `<div class="img-container">
                                    <img src="/assets/image/${imgNumber}.jpg" alt="" />
                               </div>`;
        }

        const appendedElement = container.firstChild;
        document.querySelector(".items-container").appendChild(appendedElement);

        appendedElement.style.left = `${event.clientX - elementWidth / 2}px`;
        appendedElement.style.top = `${event.clientY}px`;
        const randomRotation = Math.random() * 10 - 5;

        gsap.set(appendedElement, {
            scale: 0,
            rotation: randomRotation,
            transformOrigin: "center", 
        });

        const tl = gsap.timeline();

        const randomScale = Math.random() * 0.5 + 0.5;
        tl.to(appendedElement, {
            scale: randomScale,
            duration: 0.5,
            delay: 0.1,
        });

        tl.to(
            appendedElement, 
            {
                y: () => `-=500`,
                opacity: 1,
                duration: 4,
                ease: "none",
            },
            "<"
        ).to(
            appendedElement, 
            {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    appendedElement.parentNode.removeChild(appendedElement);
                    const index = itemsArray.indexOf(appendedElement);
                    if (index > -1) {
                        itemsArray.splice(index, 1);
                    }
                },
            },
            "-=0.5"
        );
    });
}
