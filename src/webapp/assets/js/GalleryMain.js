const authorData = [
    { name: "Claude Monet", years: "1840-1926", imgUrl: "/api/placeholder/600/400", localImgUrl: "/assets/img/claude_monet.jpg" },
    { name: "Pablo Picasso", years: "1881-1973", imgUrl: "/api/placeholder/400/550", localImgUrl: "/assets/img/pablo_picasso.jpg" },
    { name: "Henri Matisse", years: "1869-1954", imgUrl: "/api/placeholder/550/450", localImgUrl: "/assets/img/henri_matisse.jpg" },
    { name: "Paul Cézanne", years: "1839-1906", imgUrl: "/api/placeholder/450/350", localImgUrl: "/assets/img/paul_cezanne.jpg" },
    { name: "Georges Seurat", years: "1859-1891", imgUrl: "/api/placeholder/300/300", localImgUrl: "/assets/img/georges_seurat.jpg" },
    { name: "Mary Cassatt", years: "1844-1926", imgUrl: "/api/placeholder/600/320", localImgUrl: "/assets/img/mary_cassatt.jpg" },
    { name: "Paul Gauguin", years: "1848-1903", imgUrl: "/api/placeholder/550/450", localImgUrl: "/assets/img/paul_gauguin.png" },
    { name: "Marc Chagall", years: "1887-1985", imgUrl: "/api/placeholder/650/500", localImgUrl: "/assets/img/marc_chagall.jpg" },
    { name: "Edward Hopper", years: "1882-1967", imgUrl: "/api/placeholder/400/550", localImgUrl: "/assets/img/edward_hopper.jpg" },
    { name: "Vincent van Gogh", years: "1853-1890", imgUrl: "/api/placeholder/400/550", localImgUrl: "/assets/img/vincent_van_gogh.jpg" }
];

document.addEventListener('DOMContentLoaded', async () => {
    // 강제 로딩 종료 타이머 추가 (10초 후 무조건 로딩 화면 제거)
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            console.log("강제 로딩 종료: 10초 타임아웃");
            loadingScreen.remove();
        }
    }, 10000);

    // 로딩 화면 표시
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">VISUAL EXPLORE</div>
            <div class="loading-line"></div>
            <div class="loading-text">Loading Gallery...</div>
        </div>
    `;
    document.body.appendChild(loadingScreen);
    
    const gallery = document.getElementById('gallery');
    const galleryContainer = document.getElementById('galleryContainer');
    const centralText = document.getElementById('centralText');
    const centerLogo = document.querySelector('.center-logo');
    const defaultTitle = "VISUAL EXPLORE";

    // 페이지 전환 오버레이 생성 - 없는 경우에만 추가
    if (!document.getElementById('page-transition-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.className = 'page-transition-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#ff6b6b';
        overlay.style.zIndex = '2000';
        overlay.style.transform = 'scale(0)';
        overlay.style.borderRadius = '50%';
        overlay.style.pointerEvents = 'none';
        overlay.style.opacity = '0';
        document.body.appendChild(overlay);
    }

    // Gallery dimensions - 화면 크기 조정
    const galleryWidth = 4000;
    const galleryHeight = 4000;

    // 작가별 고정 크기 지정 (랜덤 대신 고정값 사용)
    const artistSizes = {
        "Claude Monet": "medium",
        "Pablo Picasso": "wide",     // 넓은 프레임으로 고정
        "Henri Matisse": "large",
        "Paul Cézanne": "extra-large",
        "Georges Seurat": "portrait",
        "Vincent van Gogh": "portrait",
        "Anthony Casasanto": "wide",
        "Michael Epps": "portrait",
        "Kenney Mencher": "large",
        "Esteban Chavez": "medium"
    };

    // 고정 이미지 크기 함수
    function getSize(artistName) {
        return artistSizes[artistName] || "medium"; // 없으면 medium으로 기본값
    }

    // 백엔드 API를 사용하여 위키백과 이미지 가져오기
    async function updateAuthorImages() {
        console.log("위키백과 API 호출 시작 (백엔드 API 사용)");
        const contextPath = window.contextPath || '';

        const fetchAuthorImage = async (authorName) => {
            try {
                // 백엔드 API 엔드포인트 호출
                const endpoint = `${contextPath}/api/wiki/image/${encodeURIComponent(authorName)}`;
                console.log(`작가 '${authorName}'의 이미지 요청: ${endpoint}`);
                
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`네트워크 응답 실패: ${response.status}`);
                }
                
                const data = await response.json();
                if (data && data.image) {
                    console.log(`🔵 ${authorName} 이미지 업데이트 성공: ${data.image}`);
                    return data.image;  // 백엔드에서 반환한 이미지 URL
                } else {
                    console.log(`🟡 ${authorName} 이미지 정보 없음`);
                }
            } catch (error) {
                console.error(`${authorName} 이미지 가져오기 실패:`, error);
            }
            return null; // 실패 시 null
        };

        // 모든 작가의 이미지 업데이트
        for (let author of authorData) {
            const imageUrl = await fetchAuthorImage(author.name);
            if (imageUrl) {
                // 위키백과 이미지로 업데이트
                author.wikiImgUrl = imageUrl; // 새로운 속성에 위키백과 이미지 저장
                console.log(`🔵 ${author.name} 이미지 업데이트: ${imageUrl}`);
            } else {
                console.log(`🟡 ${author.name} 기본 이미지 사용`);
            }
        }
    }

    // 백엔드 API로 위키백과 이미지 가져오기 실행
    await updateAuthorImages();

    // 이미지 배열 생성 (작가들을 2번씩 포함하여 총 20개의 프레임)
    const images = [];
    
    // 각 작가를 순서대로 추가
    for (let j = 0; j < authorData.length; j++) {
        images.push({
            title: authorData[j].name,
            years: authorData[j].years,
            size: getSize(authorData[j].name),
            imgUrl: authorData[j].imgUrl,
            localImgUrl: authorData[j].localImgUrl,
            wikiImgUrl: authorData[j].wikiImgUrl // 위키백과 이미지 추가
        });
    }
    
    // 각 작가를 다시 한번 추가 (두 번째 복사본)
    for (let j = 0; j < authorData.length; j++) {
        images.push({
            title: authorData[j].name,
            years: authorData[j].years,
            size: getSize(authorData[j].name),
            imgUrl: authorData[j].imgUrl,
            localImgUrl: authorData[j].localImgUrl,
            wikiImgUrl: authorData[j].wikiImgUrl // 위키백과 이미지 추가
        });
    }

    // Function to check for overlapping image positions
    const checkOverlap = (positions, newX, newY, newWidth, newHeight, minDistance = 150) => {
        for (const pos of positions) {
            const left1 = newX - minDistance;
            const right1 = newX + newWidth + minDistance;
            const top1 = newY - minDistance;
            const bottom1 = newY + newHeight + minDistance;

            const left2 = pos.x;
            const right2 = pos.x + pos.width;
            const top2 = pos.y;
            const bottom2 = pos.y + pos.height;

            if (left1 < right2 && right1 > left2 && top1 < bottom2 && bottom1 > top2) {
                return true;
            }
        }
        return false;
    };

    const positions = [];

    // 간소화된 이미지 미리 로드 함수
    const preloadImages = async (images) => {
        const imagePromises = images.map(image => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                
                // 우선순위: 위키백과 이미지 > 로컬 이미지 > 플레이스홀더
                img.src = image.wikiImgUrl || image.localImgUrl || image.imgUrl;
                
                // 2초 후 자동 완료 (이미지 로드가 지연되더라도 진행)
                setTimeout(() => resolve(false), 2000);
            });
        });
        
        // 최대 1초만 기다리고 로딩 계속 진행
        const timeout = new Promise(resolve => setTimeout(() => resolve('timeout'), 1000));
        await Promise.race([Promise.all(imagePromises), timeout]);
    };
    
    // 이미지 배열을 섞되, 동일 작가가 인접하지 않도록 재배열
    const shuffleImagesWithSpacing = (images) => {
        // 작가별로 이미지 인덱스 그룹화
        const artistIndices = {};
        images.forEach((image, index) => {
            if (!artistIndices[image.title]) {
                artistIndices[image.title] = [];
            }
            artistIndices[image.title].push(index);
        });

        // 결과 배열 생성
        const result = new Array(images.length);
        let resultIndex = 0;
        
        // 모든 작가 목록
        const artists = Object.keys(artistIndices);
        
        // 첫 번째 패스: 첫 번째 이미지 배치
        for (let i = 0; i < artists.length; i++) {
            const artist = artists[i];
            if (artistIndices[artist].length > 0) {
                const imageIndex = artistIndices[artist].shift();
                result[resultIndex] = images[imageIndex];
                resultIndex += 2; // 건너뛰어 배치
                if (resultIndex >= images.length) resultIndex = 1; // 배열 끝에 도달하면 두 번째 위치로
            }
        }
        
        // 두 번째 패스: 남은 이미지 배치
        resultIndex = 1;
        for (let i = 0; i < artists.length; i++) {
            const artist = artists[i];
            while (artistIndices[artist].length > 0) {
                const imageIndex = artistIndices[artist].shift();
                
                // 빈 자리 찾기
                while (result[resultIndex] !== undefined) {
                    resultIndex = (resultIndex + 2) % images.length;
                    if (resultIndex === 0) resultIndex = 1; // 0번 인덱스는 건너뛰기
                }
                
                result[resultIndex] = images[imageIndex];
                resultIndex = (resultIndex + 2) % images.length;
                if (resultIndex === 0) resultIndex = 1;
            }
        }
        
        // 빈 슬롯 정리 (혹시 있다면)
        const finalResult = result.filter(item => item !== undefined);
        
        return finalResult;
    };
    
    // 이미지 섞기
    const shuffledImages = shuffleImagesWithSpacing([...images]);
    
    // 이미지 미리 로드
    await preloadImages(shuffledImages);

    // Create and position image containers
    shuffledImages.forEach((image, index) => {
        const sizeClass = image.size;
        const container = document.createElement('div');
        container.className = `image-container ${sizeClass}`;
        container.setAttribute('data-title', image.title);

        let width = 300, height = 300;
        switch(sizeClass) {
            case 'medium': width = 450; height = 350; break;
            case 'large': width = 550; height = 450; break;
            case 'extra-large': width = 650; height = 500; break;
            case 'portrait': width = 400; height = 550; break;
            case 'wide': width = 600; height = 320; break;
        }

        let validPosition = false;
        let attempts = 0, x, y;

        // Find a non-overlapping position
        while (!validPosition && attempts < 200) {
            x = Math.floor(Math.random() * (galleryWidth - width - 400)) + 200;
            y = Math.floor(Math.random() * (galleryHeight - height - 400)) + 200;
            validPosition = !checkOverlap(positions, x, y, width, height);
            attempts++;
        }

        if (validPosition) {
            positions.push({ x, y, width, height });
            container.style.left = `${x}px`;
            container.style.top = `${y}px`;
            
            // 회전 제거 - 모든 이미지를 수평으로 정렬
            container.style.transform = 'rotate(0deg)';

            // Add image element
            const img = document.createElement('img');
            
            // 우선순위: 위키백과 이미지 > 로컬 이미지 > 플레이스홀더
            img.src = image.wikiImgUrl || image.localImgUrl || image.imgUrl || `/api/placeholder/${width}/${height}`;
            img.alt = image.title;
            
            // 디버깅용 로그 - 어떤 이미지가 사용되었는지 확인
            console.log(`${image.title} 이미지 소스: ${img.src}`);
            
            // 이미지 로드 오류 시 플레이스홀더로 대체
            img.onerror = function() {
                console.error(`이미지 로드 실패: ${this.src}`);
                this.src = `/api/placeholder/${width}/${height}`;
            };

            container.appendChild(img);
            gallery.appendChild(container);

            // 마우스 이벤트 - 텍스트 변경 및 빨간 선 확대
            container.addEventListener('mouseenter', () => {
                // HTML 구조로 이름과 생애 연도 표시
                centralText.innerHTML = `${image.title}<br><span style="font-size: 24px; font-weight: 300; letter-spacing: 2px;">${image.years}</span>`;
                centralText.style.fontWeight = '500';
                centralText.style.fontSize = '48px';
                centralText.style.textDecoration = 'none';
                centralText.style.transform = 'scale(1.1)';
                centralText.style.color = '#042D29';
                centralText.style.letterSpacing = '5px';
                
                // 빨간 선 확대를 위해 클래스 추가
                centerLogo.classList.add('expanded');
            });
            
            container.addEventListener('mouseleave', () => {
                centralText.textContent = defaultTitle;
                centralText.style.fontWeight = '300';
                centralText.style.fontSize = '32px';
                centralText.style.textDecoration = 'none';
                centralText.style.transform = 'scale(1)';
                centralText.style.color = '#042D29';
                centralText.style.letterSpacing = '4px';
                
                // 빨간 선 원래 크기로 복원
                centerLogo.classList.remove('expanded');
            });
            
            // 클릭 이벤트 추가 - 작가 페이지로 이동
            container.addEventListener('click', function() {
                const artistName = this.getAttribute('data-title');
                artistTransition(this, artistName);
            });
            
            // Touch support
            container.addEventListener('touchstart', (e) => {
                // HTML 구조로 이름과 생애 연도 표시 (터치 이벤트용)
                centralText.innerHTML = `${image.title}<br><span style="font-size: 24px; font-weight: 300; letter-spacing: 2px;">${image.years}</span>`;
                centralText.style.fontWeight = '500';
                centralText.style.fontSize = '48px';
                centralText.style.color = '#042D29';
                centralText.style.letterSpacing = '5px';
                
                // 빨간 선 확대를 위해 클래스 추가
                centerLogo.classList.add('expanded');
                
                e.stopPropagation();
            });
        }
    });

    // 페이지 전환 애니메이션 함수 - 애니메이션 없이 바로 이동
    window.artistTransition = function(artistElement, artistName) {
        // 현재 URL에서 contextPath 추출
        const pathArray = window.location.pathname.split('/');
        let contextPath = window.contextPath || '';
        
        // 애니메이션 없이 바로 작가 페이지로 이동
        window.location.href = `${contextPath}/gallery/artwork?artist=${encodeURIComponent(artistName)}`;
    };

    // Center the gallery initially
    const centerX = galleryWidth / 2 - window.innerWidth / 2;
    const centerY = galleryHeight / 2 - window.innerHeight / 2;
    gallery.style.transform = `translate(${-centerX}px, ${-centerY}px)`;

    // Setup dragging functionality
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let currentTranslate = { x: -centerX, y: -centerY };
    let lastDragTime = Date.now();
    let acceleration = { x: 0, y: 0 };
    
    // Helper function to get current translate values
    const getTranslateValues = (element) => {
        const style = window.getComputedStyle(element);
        const matrix = new DOMMatrix(style.transform);
        return { x: matrix.e, y: matrix.f };
    };

    // Helper function to set translate values with boundary limits
    const setTranslate = (x, y) => {
        const maxX = galleryWidth - window.innerWidth;
        const maxY = galleryHeight - window.innerHeight;
        x = Math.min(Math.max(x, -maxX), 0);
        y = Math.min(Math.max(y, -maxY), 0);
        gallery.style.transform = `translate(${x}px, ${y}px)`;
        return { x, y };
    };

    // Mouse events for dragging
    galleryContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        galleryContainer.classList.add('dragging');
        startPos = { x: e.clientX, y: e.clientY };
        currentTranslate = getTranslateValues(gallery);
        lastDragTime = Date.now();
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastDragTime;
        lastDragTime = currentTime;
        
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        
        // Calculate acceleration for inertia
        if (timeElapsed > 0) {
            acceleration.x = dx / timeElapsed * 15;
            acceleration.y = dy / timeElapsed * 15;
        }
        
        currentTranslate = setTranslate(currentTranslate.x + dx, currentTranslate.y + dy);
        startPos = { x: e.clientX, y: e.clientY };
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        isDragging = false;
        galleryContainer.classList.remove('dragging');
        
        // Apply inertia effect
        let inertiaX = acceleration.x;
        let inertiaY = acceleration.y;
        
        const applyInertia = () => {
            if (Math.abs(inertiaX) < 0.5 && Math.abs(inertiaY) < 0.5) return;
            
            currentTranslate = setTranslate(
                currentTranslate.x + inertiaX,
                currentTranslate.y + inertiaY
            );
            
            // Reduce inertia gradually
            inertiaX *= 0.95;
            inertiaY *= 0.95;
            
            requestAnimationFrame(applyInertia);
        };
        
        applyInertia();
    });

    // Touch events for mobile support
    galleryContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        galleryContainer.classList.add('dragging');
        startPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        currentTranslate = getTranslateValues(gallery);
        lastDragTime = Date.now();
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastDragTime;
        lastDragTime = currentTime;
        
        const dx = e.touches[0].clientX - startPos.x;
        const dy = e.touches[0].clientY - startPos.y;
        
        if (timeElapsed > 0) {
            acceleration.x = dx / timeElapsed * 15;
            acceleration.y = dy / timeElapsed * 15;
        }
        
        currentTranslate = setTranslate(currentTranslate.x + dx, currentTranslate.y + dy);
        startPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        e.preventDefault();
    });

    document.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        isDragging = false;
        galleryContainer.classList.remove('dragging');
        centralText.textContent = defaultTitle;
        centralText.style.fontWeight = '300';
        centralText.style.fontSize = '32px';
        centralText.style.textDecoration = 'none';
        centralText.style.transform = 'scale(1)';
        centralText.style.color = '#042D29';
        
        // 빨간 선 원래 크기로 복원
        centerLogo.classList.remove('expanded');
        
        // Apply inertia effect for touch events too
        let inertiaX = acceleration.x;
        let inertiaY = acceleration.y;
        
        const applyInertia = () => {
            if (Math.abs(inertiaX) < 0.5 && Math.abs(inertiaY) < 0.5) return;
            
            currentTranslate = setTranslate(
                currentTranslate.x + inertiaX,
                currentTranslate.y + inertiaY
            );
            
            inertiaX *= 0.95;
            inertiaY *= 0.95;
            
            requestAnimationFrame(applyInertia);
        };
        
        applyInertia();
    });

    // Reset central text on mouse leave
    galleryContainer.addEventListener('mouseleave', () => {
        centralText.textContent = defaultTitle;
        centralText.style.fontWeight = '300';
        centralText.style.fontSize = '32px';
        centralText.style.textDecoration = 'none';
        centralText.style.transform = 'scale(1)';
        centralText.style.color = '#042D29';
        
        // 빨간 선 원래 크기로 복원
        centerLogo.classList.remove('expanded');
    });
    
    // 햄버거 버튼 기능 - 메뉴 페이지로 이동 (애니메이션 없이 바로 이동)
    document.querySelector('.hamburger-btn').addEventListener('click', () => {
        // 현재 URL에서 contextPath 추출
        const contextPath = window.contextPath || '';
        // 바로 메뉴 페이지로 이동
        window.location.href = `${contextPath}/menu`;
    });
    
    // Add window resize handler
    window.addEventListener('resize', () => {
        // Recenter the gallery if it's near the edge
        const currentPos = getTranslateValues(gallery);
        const maxX = galleryWidth - window.innerWidth;
        const maxY = galleryHeight - window.innerHeight;
        
        if (currentPos.x < -maxX + 100 || currentPos.x > -100 || 
            currentPos.y < -maxY + 100 || currentPos.y > -100) {
            // If near the edge, recenter
            const centerX = galleryWidth / 2 - window.innerWidth / 2;
            const centerY = galleryHeight / 2 - window.innerHeight / 2;
            
            // Smooth transition to center
            gallery.style.transition = 'transform 0.5s ease-out';
            setTranslate(-centerX, -centerY);
            
            // Remove transition after animation
            setTimeout(() => {
                gallery.style.transition = '';
            }, 500);
        }
    });
    
    // 간소화된 코드로 로딩 화면 제거
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.remove();
            }, 100);
        }
    }, 1000);
});