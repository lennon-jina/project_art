document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.scroll-container');
    const sectionWrapper = document.querySelector('.section-wrapper');
    const sections = document.querySelectorAll('.section');
    
    // 페이지 로드 시 맨 왼쪽으로 스크롤 위치 초기화
    window.scrollTo(0, 0);
    container.scrollLeft = 0;
    
    // 마우스 커서 요소 다시 생성 (기존 코드 수정)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    // 디버깅을 위한 기본 스타일 추가
    cursor.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // 빨간색 배경으로 시작 (디버깅용)
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '99999';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);
    
    console.log('커서 요소 생성됨:', cursor); // 디버깅용 로그
    
    // 마우스 움직임에 따라 커스텀 커서 위치 변경
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        // 가끔 위치 로그 (디버깅용)
        if (Math.random() < 0.01) console.log('커서 위치:', e.clientX, e.clientY);
    });
    
    // 현재 보이는 섹션 감지 및 커서 이미지 변경 함수
    function updateCursor() {
        const scrollLeft = container.scrollLeft;
        const windowWidth = window.innerWidth;
        
        // 현재 보이는 섹션의 인덱스 계산
        const currentSectionIndex = Math.floor((scrollLeft + (windowWidth / 2)) / windowWidth);
        
        console.log('현재 섹션 인덱스:', currentSectionIndex); // 디버깅용 로그
        
        // 배경색 제거하고 이미지로 전환 시도
        cursor.style.backgroundColor = '';
        
        // 모든 커서 클래스 제거
        cursor.classList.remove('cursor-1', 'cursor-2', 'cursor-3', 'cursor-4', 'cursor-5', 'cursor-6');
        
        // 현재 섹션에 맞는 커서 클래스 추가
        if(currentSectionIndex >= 0 && currentSectionIndex < sections.length) {
            const cursorClass = `cursor-${currentSectionIndex + 1}`;
            cursor.classList.add(cursorClass);
            console.log('적용된 커서 클래스:', cursorClass); // 디버깅용 로그
            
            // 디버깅용: 이미지 직접 설정 시도
            try {
                const imagePaths = [
                    './assets/img/van.png',
                    './assets/img/picaso.png',
                    './assets/img/van2.png', 
                    './assets/img/picaso2.png',
                    './assets/img/mar.png',
                    './assets/img/mar2.png'
                ];
                
                if(currentSectionIndex < imagePaths.length) {
                    cursor.style.backgroundImage = `url('${imagePaths[currentSectionIndex]}')`;
                    cursor.style.backgroundSize = 'contain';
                    cursor.style.backgroundRepeat = 'no-repeat';
                    cursor.style.backgroundPosition = 'center';
                    console.log('이미지 경로 설정:', imagePaths[currentSectionIndex]);
                }
            } catch(e) {
                console.error('이미지 설정 오류:', e);
            }
        }
    }
    
    // 스크롤 이벤트 발생 시 커서 업데이트
    container.addEventListener('scroll', updateCursor);
    
    // 초기 커서 설정
    updateCursor();
    
    // 기본 커서 숨기기 (모든 요소에 적용)
    document.body.style.cursor = 'none';
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.cursor = 'none';
    });
    
    // 기존 코드 유지 - 휠 이벤트를 가로 스크롤로 변환
    container.addEventListener('wheel', function(e) {
        // 스크롤 감도 - 더 부드럽게 변경
        const scrollMultiplier = 6.0; // 기존 3.5에서 증가
        
        // 세로 휠을 가로 스크롤로 변환
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            container.scrollBy({
                left: e.deltaY * scrollMultiplier,
                behavior: 'smooth' // 부드러운 스크롤 유지
            });
            e.preventDefault();
        }
    }, { passive: false });
    
    // 드래그 스크롤 - 부드럽게 개선
    let isDown = false;
    let startX;
    let scrollLeft;
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'none'; // 기본 커서 숨기기
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'none'; // 기본 커서 숨기기
    });
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'none'; // 기본 커서 숨기기
    });
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3.0; // 감도 약간 낮춰 더 부드럽게
        
        // 부드러운 드래그 효과
        container.scrollTo({
            left: scrollLeft - walk,
            behavior: 'auto' // 드래그는 즉시 반응 유지
        });
    });
    
    // 키보드 화살표 - 더 넓게 개선
    window.addEventListener('keydown', function(e) {
        // 더 넓은 이동량
        const scrollAmount = window.innerWidth * 0.95; // 화면의 95%로 확대 - 거의 한 페이지 단위
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            // 오른쪽/아래 화살표
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth' // 부드러운 스크롤 유지
            });
            e.preventDefault();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            // 왼쪽/위 화살표
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth' // 부드러운 스크롤 유지
            });
            e.preventDefault();
        }
    });
    
    // 모바일 터치 스크롤 - 부드럽게 개선
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    container.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchScrollLeft = container.scrollLeft;
    }, { passive: true });
    
    container.addEventListener('touchmove', function(e) {
        const touchX = e.touches[0].clientX;
        const walkX = (touchStartX - touchX) * 2.5; // 감도 낮춰 더 자연스럽게
        
        // 부드러운 터치 스크롤
        container.scrollTo({
            left: touchScrollLeft + walkX,
            behavior: 'auto' // 터치는 즉시 반응 유지
        });
    }, { passive: true });
    
    // 부드러운 스크롤 위한 CSS 속성 직접 설정
    container.style.scrollBehavior = 'smooth';
    // smooth 스크롤 시간 조정 (기본값은 약 300ms)
    document.documentElement.style.setProperty('--scroll-behavior', 'smooth');
    document.documentElement.style.setProperty('scroll-behavior', 'smooth');

    // 아트워크 이미지 데이터 불러오기 (기존 기능 그대로 유지)
    const artworkImages = document.querySelectorAll('.artwork');

    artworkImages.forEach(img => {
        const artworkId = img.closest('.section').dataset.artworkId;
        
        if (artworkId) {
            fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,image_id`)
                .then(response => response.json())
                .then(data => {
                    const imageId = data.data.image_id;
                    const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
                    img.src = imageUrl;
                })
                .catch(error => {
                    console.error('이미지 불러오기 실패:', error);
                    // 실패하면 기본 이미지 유지
                });
        }
    });
});