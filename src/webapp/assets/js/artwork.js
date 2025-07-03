// 한국어 변환을 위한 기본 번역 데이터
const translations = {
    titles: {
        "Water Lilies": "수련",
        "Impression, Sunrise": "인상, 해돋이",
        "Sunset": "일몰",
        "Garden": "정원",
        "Bridge": "다리",
        "Cathedral": "대성당",
        "Haystacks": "건초더미",
        "Poppy Field": "양귀비 밭",
        "Rouen Cathedral": "루앙 대성당",
        "The Japanese Bridge": "일본식 다리",
        "Still Life with Geranium": "제라늄이 있는 정물화"
    },
    mediums: {
        "Oil on canvas": "캔버스에 유화",
        "Watercolor": "수채화",
        "Oil": "유화",
        "Canvas": "캔버스",
        "Wood": "목판화"
    },
    artistDescriptions: {
        "Monet": "모네는 인상주의의 대표적 화가로, 빛과 색채의 순간적인 인상을 포착하는 데 집중했습니다.",
        "Picasso": "피카소는 20세기의 가장 영향력 있는 화가 중 한 명으로, 혁신적인 입체주의 기법으로 사물을 다양한 시점에서 동시에 표현했습니다.",
        "van Gogh": "반 고흐는 후기 인상주의 화가로, 강렬한 색채와 대담한 붓터치로 감정을 표현했습니다.",
        "Matisse": "마티스는 야수파의 대표적 화가로, 선명한 색채와 독특한 형태를 통해 강렬한 표현력을 보여주었습니다."
    }
};

// 작품 데이터를 저장할 객체
let artworksData = [];

// URL에서 작가 이름 가져오기
const artistNameElement = document.getElementById('artist-name');
const artistDescriptionElement = document.getElementById('artist-description');
const selectedArtist = artistNameElement ? artistNameElement.textContent : "";

// Chicago Art Institute API 사용하여 작품 데이터 가져오기
const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(selectedArtist)}&limit=10&fields=id,title,image_id,date_display,artist_display,description,medium_display,publication_history,exhibition_history,provenance_text,artwork_type_title`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const artworks = data.data;
        artworksData = artworks; // 작품 데이터 저장
        const trackElement = document.getElementById('artwork-track');
        
        // 기존 작품 초기화
        trackElement.innerHTML = '';

        // 작품 목록 생성
        artworks.forEach((artwork, index) => {
            const imageUrl = artwork.image_id 
                ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
                : 'https://via.placeholder.com/300x400?text=No+Image';

            const artworkElement = document.createElement('div');
            artworkElement.className = 'artwork-item';
            artworkElement.dataset.index = index; // 인덱스 저장
            artworkElement.innerHTML = `
                <img src="${imageUrl}" alt="${artwork.title}">
            `;

            // 클릭 이벤트 추가
            artworkElement.addEventListener('click', function() {
                showModal(index);
            });

            trackElement.appendChild(artworkElement);
        });

        // 무한 스크롤 효과를 위해 작품들 여러 번 복제
        const artworkItems = document.querySelectorAll('.artwork-item');
        
        // 2번 더 복제하여 충분한 스크롤 영역 확보
        for (let i = 0; i < 2; i++) {
            artworkItems.forEach(item => {
                const clone = item.cloneNode(true);
                // 클론에도 클릭 이벤트 추가
                clone.addEventListener('click', function() {
                    showModal(item.dataset.index);
                });
                trackElement.appendChild(clone);
            });
        }

        // GSAP 애니메이션 설정
        setupAnimation();
    })
    .catch(error => {
        console.error('Error fetching artworks:', error);
        
        // API 실패 시 예시 데이터로 대체 (테스트용)
        const dummyArtworks = [];
        for (let i = 1; i <= 10; i++) {
            dummyArtworks.push({
                title: `작품 ${i}`,
                date_display: `19${Math.floor(Math.random() * 99)}`,
                image_id: null,
                description: "이 작품에 대한 설명은 제공되지 않습니다.",
                medium_display: "캔버스에 유화"
            });
        }

        artworksData = dummyArtworks; // 더미 데이터 저장
        const trackElement = document.getElementById('artwork-track');
        trackElement.innerHTML = '';

        dummyArtworks.forEach((artwork, index) => {
            const artworkElement = document.createElement('div');
            artworkElement.className = 'artwork-item';
            artworkElement.dataset.index = index; // 인덱스 저장
            artworkElement.innerHTML = `
                <img src="https://via.placeholder.com/300x400?text=작품+${artwork.title}" alt="${artwork.title}">
            `;

            // 클릭 이벤트 추가
            artworkElement.addEventListener('click', function() {
                showModal(index);
            });

            trackElement.appendChild(artworkElement);
        });

        // 무한 스크롤 효과를 위해 작품들 복제
        const artworkItems = document.querySelectorAll('.artwork-item');
        artworkItems.forEach(item => {
            const clone = item.cloneNode(true);
            // 클론에도 클릭 이벤트 추가
            clone.addEventListener('click', function() {
                showModal(item.dataset.index);
            });
            trackElement.appendChild(clone);
        });

        // GSAP 애니메이션 설정
        setupAnimation();
    });

// GSAP 애니메이션 설정 함수
function setupAnimation() {
    const track = document.getElementById('artwork-track');
    const artworkItems = document.querySelectorAll('.artwork-item');
    
    if (!artworkItems.length) return;
    
    // 현재 화면 크기 가져오기
    const windowWidth = window.innerWidth;
    
    // 트랙의 너비 계산
    const trackWidth = Array.from(artworkItems)
        .slice(0, artworkItems.length / 3) // 복제된 항목 중 원본만 계산
        .reduce((width, item) => {
            return width + item.offsetWidth + parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight);
        }, 0);
    
    // 처음부터 왼쪽에 빈 공간이 없도록 초기 위치 설정
    // 화면 너비의 반만큼 왼쪽으로 이동시켜 가운데부터 시작하는 대신 처음부터 꽉 차게 보이도록 함
    gsap.set(track, { x: -trackWidth / 2 });
    
    // 무한 루프 애니메이션 - 한 세트의 아이템이 완전히 지나간 후 다시 시작
    const scrollAnimation = gsap.to(track, {
        x: -trackWidth * 1.5, // 시작 위치에서 한 세트 너비만큼 더 이동
        duration: 80,
        ease: "linear",
        repeat: -1,
        onRepeat: () => {
            gsap.set(track, { x: -trackWidth / 2 }); // 반복 시 다시 초기 위치로
        }
    });
    
    // 윈도우 크기가 변경될 때 애니메이션 재설정
    window.addEventListener('resize', () => {
        scrollAnimation.kill();
        setupAnimation();
    });

    // 마우스 호버 시 애니메이션 속도 조절
    track.addEventListener('mouseenter', () => {
        gsap.to(scrollAnimation, { timeScale: 0.2, duration: 0.5 });
    });

    track.addEventListener('mouseleave', () => {
        gsap.to(scrollAnimation, { timeScale: 1, duration: 0.5 });
    });
    
    // 드래그 기능 추가
    let isDragging = false;
    let startX;
    let startScrollX;
    
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startScrollX = gsap.getProperty(track, "x");
        scrollAnimation.pause();
        
        // 드래그 중 커서 스타일 변경
        document.body.style.cursor = 'grabbing';
        track.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        gsap.set(track, { x: startScrollX + dx });
    });
    
    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        isDragging = false;
        scrollAnimation.play();
        
        // 커서 스타일 복원
        document.body.style.cursor = 'auto';
        track.style.cursor = 'grab';
    });
    
    // 초기 커서 스타일 설정
    track.style.cursor = 'grab';
}

// 모달 기능
const modal = document.getElementById('artwork-modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalYear = document.getElementById('modal-year');
const modalMedium = document.getElementById('modal-medium');
const modalDescription = document.getElementById('modal-description');
const translationStatus = document.getElementById('translation-status');

// 모달 닫기 버튼
modalClose.addEventListener('click', () => {
    closeModal();
});

// 모달 외부 클릭 시 닫기
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// 제목 번역 함수
function translateTitle(title) {
    // 기본 번역 데이터에서 찾기
    for (const [english, korean] of Object.entries(translations.titles)) {
        if (title && title.includes(english)) {
            return title.replace(english, korean);
        }
    }
    return title || "제목 정보 없음"; // 번역 데이터가 없으면 원본 반환
}

// 재료 번역 함수
function translateMedium(medium) {
    if (!medium) return "재료 정보 없음";
    
    let translated = medium;
    // 기본 번역 데이터에서 찾기
    for (const [english, korean] of Object.entries(translations.mediums)) {
        if (medium.includes(english)) {
            translated = translated.replace(english, korean);
        }
    }
    return translated;
}

// 연도 번역 함수
function translateYear(year) {
    if (!year) return "연도 정보 없음";
    
    // 연도 정보에서 숫자만 추출하고 '년' 추가
    const yearMatch = year.match(/\d{4}/);
    if (yearMatch) {
        return `${yearMatch[0]}년`;
    }
    return `${year}년`;
}

// 작품 설명을 가져오는 함수
async function fetchArtworkDescription(artwork) {
    // Chicago API에서 작품 데이터 가져오기를 시도
    try {
        // 작품의 상세 정보를 검색하기 위한 API URL 구성
        const artworkId = artwork.id;
        if (!artworkId) {
            return null; // 작품 ID가 없는 경우
        }

        // Art Institute of Chicago API에서 해당 작품의 상세 정보 가져오기
        const detailUrl = `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,artist_display,date_display,medium_display,dimensions,description,publication_history,exhibition_history,provenance_text,artwork_type_title`;
        
        const response = await fetch(detailUrl);
        const detailData = await response.json();
        
        if (detailData && detailData.data) {
            return detailData.data;
        }
    } catch (error) {
        console.error('Error fetching artwork details:', error);
    }
    
    // API 실패 시 작품 관련 정보 구성
    return {
        title: artwork.title,
        artist_display: artwork.artist_display || selectedArtist,
        date_display: artwork.date_display,
        medium_display: artwork.medium_display,
        artwork_type_title: artwork.artwork_type_title
    };
}

//영어 설명을 한국어로 번역하는 함수
function translateDescription(description, artwork) {
    if (!description) return "작품에 대한 설명이 제공되지 않습니다.";
    
    // 기본 HTML 태그 유지
    let translatedDesc = description;
    
    // 주요 미술 용어 번역
    const artTerms = {
        "Impressionism": "인상주의",
        "Fauvism": "야수파",
        "Cubism": "입체주의",
        "Expressionism": "표현주의",
        "Still life": "정물화",
        "still life": "정물화",
        "Landscape": "풍경화",
        "landscape": "풍경화",
        "Portrait": "초상화",
        "portrait": "초상화",
        "Composition": "구성",
        "composition": "구성",
        "Palette": "팔레트",
        "palette": "팔레트",
        "Brushwork": "붓 터치",
        "brushwork": "붓 터치",
        "Canvas": "캔버스",
        "canvas": "캔버스",
        "Painting": "회화",
        "painting": "회화",
        "Drawing": "드로잉",
        "drawing": "드로잉",
        "Color": "색채",
        "color": "색채",
        "Light": "빛",
        "light": "빛",
        "Shadow": "그림자",
        "shadow": "그림자",
        "Texture": "질감",
        "texture": "질감",
        "Form": "형태",
        "form": "형태",
        "Perspective": "원근법",
        "perspective": "원근법",
        "Fauve": "야수파",
        "fauve": "야수파",
        "Artist": "작가",
        "artist": "작가",
        "Museum": "미술관",
        "museum": "미술관",
        "Exhibition": "전시회",
        "exhibition": "전시회",
        "Gallery": "갤러리",
        "gallery": "갤러리",
        "Oil": "유화",
        "oil": "유화",
        "Watercolor": "수채화",
        "watercolor": "수채화",
        "Sketch": "스케치",
        "sketch": "스케치",
        "Century": "세기",
        "century": "세기",
        "Sculpture": "조각",
        "sculpture": "조각",
        "Nature": "자연",
        "nature": "자연",
        "Figurative": "구상적",
        "figurative": "구상적",
        "Abstract": "추상적",
        "abstract": "추상적",
        "Style": "스타일",
        "style": "스타일",
        "Technique": "기법",
        "technique": "기법",
        "Influence": "영향",
        "influence": "영향",
        "Period": "시기",
        "period": "시기",
        "Movement": "운동",
        "movement": "운동",
        "Series": "시리즈",
        "series": "시리즈",
        "Collection": "컬렉션",
        "collection": "컬렉션",
        "Viewer": "관람자",
        "viewer": "관람자",
        "Artistic": "예술적",
        "artistic": "예술적",
        "Creative": "창의적",
        "creative": "창의적",
        "Famous": "유명한",
        "famous": "유명한",
        "Modern": "현대",
        "modern": "현대",
        "Classic": "고전",
        "classic": "고전",
        "Traditional": "전통적",
        "traditional": "전통적"
    };
    
    // 미술 용어 번역 적용
    Object.entries(artTerms).forEach(([english, korean]) => {
        // 단어 단위로 변환 (앞뒤에 공백이나 구두점이 있는 경우만)
        const regex = new RegExp(`(^|\\s|\\()${english}(\\s|\\.|,|;|:|\\)|$)`, 'g');
        translatedDesc = translatedDesc.replace(regex, `$1${korean}$2`);
    });
    
    // 주요 문장 패턴 번역
    const sentencePatterns = [
        { from: "In this painting", to: "이 그림에서" },
        { from: "This artwork", to: "이 작품은" },
        { from: "The artist", to: "작가는" },
        { from: "Created in", to: "제작 연도:" },
        { from: "Painted in", to: "그려진 연도:" },
        { from: "Made in", to: "제작 연도:" },
        { from: "Part of", to: "다음의 일부:" },
        { from: "Known for", to: "다음으로 알려짐:" },
        { from: "Exhibited at", to: "전시 장소:" },
        { from: "Belongs to", to: "소속:" },
        { from: "Influenced by", to: "영향 받음:" },
        { from: "Characterized by", to: "특징:" },
        { from: "Features", to: "특징:" },
        { from: "Depicts", to: "묘사:" }
    ];
    
    // 문장 패턴 적용
    sentencePatterns.forEach(pattern => {
        translatedDesc = translatedDesc.replace(new RegExp(pattern.from, 'g'), pattern.to);
    });
    
    // 특정 작가에 관한 문구 번역
    if (selectedArtist.includes("Monet")) {
        translatedDesc = translatedDesc.replace(/Claude Monet/g, "클로드 모네");
        translatedDesc = translatedDesc.replace(/Monet/g, "모네");
        translatedDesc = translatedDesc.replace(/impressionist/gi, "인상주의");
    } else if (selectedArtist.includes("Matisse")) {
        translatedDesc = translatedDesc.replace(/Henri Matisse/g, "앙리 마티스");
        translatedDesc = translatedDesc.replace(/Matisse/g, "마티스");
        translatedDesc = translatedDesc.replace(/Fauvist/gi, "야수파");
    } else if (selectedArtist.includes("van Gogh")) {
        translatedDesc = translatedDesc.replace(/Vincent van Gogh/g, "빈센트 반 고흐");
        translatedDesc = translatedDesc.replace(/van Gogh/g, "반 고흐");
        translatedDesc = translatedDesc.replace(/Post-Impressionist/gi, "후기 인상주의");
    } else if (selectedArtist.includes("Picasso")) {
        translatedDesc = translatedDesc.replace(/Pablo Picasso/g, "파블로 피카소");
        translatedDesc = translatedDesc.replace(/Picasso/g, "피카소");
        translatedDesc = translatedDesc.replace(/Cubist/gi, "입체주의");
    }
    
    // 영어 원문이 그대로라면 기본 정보만 한국어로 제공
    if (translatedDesc === description) {
        console.log("API 설명 번역 실패, 기본 정보만 제공합니다.");
        
        let basicInfo = `<p>이 작품은 `;
        
        if (artwork.title) {
            basicInfo += `'${translateTitle(artwork.title)}'`;
        }
        
        if (artwork.artist_display) {
            basicInfo += `으로, ${artwork.artist_display}의 작품입니다. `;
        } else if (selectedArtist) {
            basicInfo += `으로, ${selectedArtist}의 작품입니다. `;
        }
        
        if (artwork.date_display) {
            basicInfo += `${translateYear(artwork.date_display)}에 제작되었으며, `;
        }
        
        if (artwork.medium_display) {
            basicInfo += `${translateMedium(artwork.medium_display)} 기법을 사용했습니다.`;
        }
        
        basicInfo += `</p>`;
        
        // 원본 영어 설명도 함께 제공
        basicInfo += `<p><small>원문 설명: ${description}</small></p>`;
        
        return basicInfo;
    }
    
    return translatedDesc;
}

//작품 설명 생성 및 가져오기 함수
async function generateDescription(artwork) {
    // 기본 설명 구성
    let description = "";
    
    // 작품에 이미 설명이 있는 경우
    if (artwork.description && artwork.description.length > 10) {
        description = artwork.description;
    } 
    // 설명이 없는 경우 상세 정보 API 호출
    else {
        try {
            // 작품의 상세 정보를 검색하기 위한 API URL 구성
            const artworkId = artwork.id;
            if (artworkId) {
                // Art Institute of Chicago API에서 해당 작품의 상세 정보 가져오기
                const detailUrl = `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,artist_display,date_display,medium_display,dimensions,description,publication_history,exhibition_history,provenance_text,artwork_type_title`;
                
                const response = await fetch(detailUrl);
                const detailData = await response.json();
                
                if (detailData && detailData.data) {
                    // 설명 정보 확인
                    if (detailData.data.description && detailData.data.description.length > 10) {
                        description = detailData.data.description;
                    }
                    // 다른 정보로 설명 구성
                    else {
                        // 출판 이력 정보 사용
                        if (detailData.data.publication_history) {
                            description += detailData.data.publication_history + " ";
                        }
                        
                        // 전시 이력 정보 사용
                        if (detailData.data.exhibition_history) {
                            description += detailData.data.exhibition_history + " ";
                        }
                        
                        // 출처 정보 사용
                        if (detailData.data.provenance_text) {
                            description += detailData.data.provenance_text;
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching artwork details:', error);
        }
    }
    
    // 어떤 정보도 없을 경우 기본 정보로 설명 구성
    if (!description || description.length < 10) {
        description = `${artwork.title || "Untitled"} by ${artwork.artist_display || selectedArtist}. `;
        
        if (artwork.date_display) {
            description += `Created in ${artwork.date_display}. `;
        }
        
        if (artwork.medium_display) {
            description += `Medium: ${artwork.medium_display}. `;
        }
        
        if (artwork.artwork_type_title) {
            description += `Type: ${artwork.artwork_type_title}. `;
        }
    }
    
    return description;
}

//번역 처리 함수
async function simulateTranslation(text, artwork, callback) {
    // 번역 진행 상태 업데이트
    translationStatus.textContent = "한국어 번역 API 호출 중...";
    
    try {
        // 번역 API 호출
        const translatedText = await translateTextUsingAPI(text);
        
        // 번역된 텍스트에 기본 정보 추가
        let finalText = "<p>";
        
        // 제목 정보 추가
        if (artwork.title) {
            finalText += `<strong>${translateTitle(artwork.title)}</strong>: `;
        }
        
        // 작가 정보 추가
        if (artwork.artist_display) {
            finalText += `${artwork.artist_display}, `;
        } else if (selectedArtist) {
            finalText += `${selectedArtist}, `;
        }
        
        // 연도 정보 추가
        if (artwork.date_display) {
            finalText += `${translateYear(artwork.date_display)}`;
        }
        
        finalText += "</p>";
        
        // 번역된 설명 추가
        finalText += `<p>${translatedText}</p>`;
        
        // 재료 정보 추가
        if (artwork.medium_display) {
            finalText += `<p>재료: ${translateMedium(artwork.medium_display)}</p>`;
        }
        
        callback(finalText);
        translationStatus.textContent = "한국어 번역 완료";
    } catch (error) {
        console.error('번역 중 오류 발생:', error);
        
        // 오류 시 기본 정보만 표시
        let errorText = "<p>번역 서비스에 일시적인 오류가 발생했습니다.</p>";
        
        // 기본 정보 추가
        errorText += "<p>";
        
        if (artwork.title) {
            errorText += `<strong>${translateTitle(artwork.title)}</strong>: `;
        }
        
        if (artwork.artist_display) {
            errorText += `${artwork.artist_display}, `;
        } else if (selectedArtist) {
            errorText += `${selectedArtist}, `;
        }
        
        if (artwork.date_display) {
            errorText += `${translateYear(artwork.date_display)}`;
        }
        
        errorText += "</p>";
        
        if (artwork.medium_display) {
            errorText += `<p>재료: ${translateMedium(artwork.medium_display)}</p>`;
        }
        
        // 원문 설명도 제공
        errorText += `<p><small>원문: ${text}</small></p>`;
        
        callback(errorText);
        translationStatus.textContent = "번역 오류";
    }
}

async function showModal(index) {
    const artwork = artworksData[index];
    if (!artwork) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const imageUrl = artwork.image_id 
        ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/1200,/0/default.jpg`
        : 'https://via.placeholder.com/600x800?text=이미지+없음';

    modalImg.src = imageUrl;
    modalImg.alt = artwork.title || "작품 이미지";

    modalTitle.textContent = translateTitle(artwork.title);
    modalYear.textContent = translateYear(artwork.date_display);
    modalMedium.textContent = translateMedium(artwork.medium_display);

    modalDescription.innerHTML = '<span class="modal-loading">작품 정보를 불러오는 중...</span>';

    try {
        // ✅ Chicago API에서 작품 설명만 가져옴
        const description = await generateDescription(artwork);

        // ✅ 번역 시도 (번역 실패해도 fallback 적용)
        await simulateTranslation(description, artwork, (translatedText) => {
            modalDescription.innerHTML = translatedText;
        });

    } catch (error) {
        console.error('Modal fetch/translate error:', error);
        modalDescription.innerHTML = '<p>작품 설명을 불러오는 데 실패했습니다.</p>';
    }
}

// 모달 닫기 함수
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 복원
    // 모달 내용 초기화
    modalDescription.innerHTML = '<span class="modal-loading">작품 정보를 불러오는 중...</span>';
    translationStatus.textContent = "";
}

/* 애니메이션 트랙과 텍스트 스타일 조정 */
document.addEventListener('DOMContentLoaded', function() {
    // 텍스트 크기 조정
    const modalTitle = document.getElementById('modal-title');
    const modalYear = document.getElementById('modal-year');
    const modalMedium = document.getElementById('modal-medium');
    const modalDescription = document.getElementById('modal-description');
    
    if (modalTitle) modalTitle.style.fontSize = '28px';
    if (modalYear) modalYear.style.fontSize = '20px';
    if (modalMedium) modalMedium.style.fontSize = '18px';
    if (modalDescription) {
        modalDescription.style.fontSize = '16px';
        modalDescription.style.lineHeight = '1.6';
    }
    
    // 작품과 설명 간격 조정
    const artworkTrack = document.getElementById('artwork-track');
    if (artworkTrack) {
        const artworkItems = document.querySelectorAll('.artwork-item');
        artworkItems.forEach(item => {
            item.style.margin = '0 25px'; // 좌우 간격 늘림
        });
    }
});

// 뒤로가기 버튼 이벤트 처리
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.location.href = '/gallery';
    });
}

async function translateTextUsingAPI(text) {
    const apiKey = 'AIzaSyC-RQLGxjHjxyRYJFqYRbcspw_1sGdOkvg';  // 키 추가됨

    if (!text || text.trim() === '') {
        return "설명 정보가 없습니다.";
    }
    
    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: 'ko'
            })
        });

        if (!response.ok) {
            throw new Error('번역 요청 실패');
        }

        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Translation API error:', error);
        return fallbackTranslation(text);
    }
}

//긴 텍스트를 청크로 나누는 함수
function splitTextIntoChunks(text, maxChunkSize) {
    // 텍스트가 짧으면 그대로 반환
    if (text.length <= maxChunkSize) {
        return [text];
    }
    
    const chunks = [];
    let startIndex = 0;
    
    while (startIndex < text.length) {
        // 최대 청크 크기 이내에서 문장 끝(.!?)이나 단락 끝(\n)을 찾아 자연스럽게 나누기
        let endIndex = startIndex + maxChunkSize;
        
        if (endIndex >= text.length) {
            // 남은 텍스트가 maxChunkSize보다 작으면 끝까지 포함
            endIndex = text.length;
        } else {
            // 문장 끝이나 단락의 끝을 찾아 청크 나누기
            const possibleEndIndex = text.lastIndexOf('.', endIndex);
            const possibleEndIndex2 = text.lastIndexOf('!', endIndex);
            const possibleEndIndex3 = text.lastIndexOf('?', endIndex);
            const possibleEndIndex4 = text.lastIndexOf('\n', endIndex);
            
            // 가장 나중에 있는 구분점 찾기
            const sentenceEnd = Math.max(
                possibleEndIndex, 
                possibleEndIndex2, 
                possibleEndIndex3, 
                possibleEndIndex4
            );
            
            // 적절한 구분점을 찾았고, 시작점보다 뒤에 있으면 그 지점에서 자름
            if (sentenceEnd > startIndex) {
                endIndex = sentenceEnd + 1; // 구분점 다음 위치
            }
            // 적절한 구분점을 찾지 못했으면 단어 단위로 자름
            else {
                const spaceIndex = text.lastIndexOf(' ', endIndex);
                if (spaceIndex > startIndex) {
                    endIndex = spaceIndex + 1;
                }
            }
        }
        
        chunks.push(text.substring(startIndex, endIndex));
        startIndex = endIndex;
    }
    
    return chunks;
}

// API 실패 시 대체 번역 기능 (최소한의 용어 번역)
function fallbackTranslation(text) {
    // HTML 태그 저장
    let translatedText = text;
    
    // 기본 미술 용어 번역
    const basicTerms = {
        "painting": "회화",
        "artist": "작가",
        "oil on canvas": "캔버스에 유화",
        "watercolor": "수채화",
        "drawing": "드로잉",
        "sculpture": "조각",
        "exhibition": "전시회",
        "gallery": "갤러리",
        "museum": "박물관",
        "color": "색채",
        "light": "빛",
        "composition": "구성",
        "landscape": "풍경화",
        "portrait": "초상화",
        "still life": "정물화"
    };
    
    // 간단한 용어 번역 적용
    Object.entries(basicTerms).forEach(([english, korean]) => {
        const regex = new RegExp(`\\b${english}\\b`, 'gi');
        translatedText = translatedText.replace(regex, korean);
    });
    
    // 원본 텍스트와 함께 표시
    return `<p>번역 서비스 일시적 오류로 부분 번역을 제공합니다.</p><p>${translatedText}</p><p><small>원문: ${text}</small></p>`;
}
