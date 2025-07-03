document.addEventListener('DOMContentLoaded', () => {
    // Initialize Splitting.js
    Splitting();
    
    // Get elements
    const container = document.querySelector('.container');
    const navLinkWrappers = document.querySelectorAll('.nav__link--wrapper');
    const moonImg = document.querySelector('.moon__img');
    const svgRects = document.querySelectorAll('.moon__svg-rects rect');
    
    // Initialize
    function init() {
        gsap.set(container, { autoAlpha: 1 });
        navLinkWrappers.forEach(wrapper => {
            const width = wrapper.getAttribute('data-width');
            gsap.set(wrapper, {
                width: width + 'px',
                scaleX: 0
            });
        });
        animate();
    }
    
    // Animation timeline
    function animate() {
        const tl = gsap.timeline({
            delay: 0.5,
            repeat: 0,
            defaults: {
                ease: "expo.inOut",
                duration: 2
            }
        });
        
        // container__base 애니메이션 유지
        tl.to('.container__base', {
            scaleX: 1,
            duration: 2,
            transformOrigin: "top right"
        })
        .from(svgRects, {
            scaleX: 0,
            stagger: 0.07,
            duration: 3,
            ease: "expo"
        }, "-=1.0")
        .to(navLinkWrappers, {
            stagger: 0.14,
            scaleX: 1
        }, "-=2.5")
        .from(moonImg, {
            x: "+=200",
            ease: 'power4',
            duration: 15
        }, 0);
        
        return tl;
    }
    
    init();
    
    container.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
            gsap.globalTimeline.kill();
            init();
        }
    });
});