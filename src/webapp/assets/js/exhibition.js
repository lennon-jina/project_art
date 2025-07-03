/**
 * 전시회 정보 관련 JavaScript - 페이지네이션 개선
 */
$(document).ready(function() {
    // 메인 페이지인 경우 추천 전시회 로드
    if (window.location.pathname.endsWith('/exhibition') || window.location.pathname.endsWith('/exhibition/')) {
        loadFeaturedExhibitions();
        loadCurrentExhibitions();
    }
    
    // 링크에 호버 효과 추가
    $('.main-nav a').hover(
        function() {
            $(this).css('color', '#741102'); // 호버 색상 #741102로 변경
        },
        function() {
            $(this).css('color', '#fff');
        }
    );
    
    // 로고 텍스트를 이미지로 변경
    $('.logo a').html('<img src="/assets/img/logo.png" alt="Art Gallery Logo">');
    
    // 상단 메뉴 버튼 추가 (없는 경우)
    if ($('.top-menu-button').length === 0) {
        const menuButton = $('<a href="/menu" class="top-menu-button">MENU</a>');
        $('.main-header').append(menuButton);
    }
    
    // 레이아웃 문제 해결을 위한 유틸리티 함수 호출
    fixLayout();
    
    $(window).resize(function() {
        fixLayout();
    });
    
    // 리스트 페이지인 경우 페이지네이션 처리
    if (window.location.pathname.includes('/exhibition/list')) {
        setupPagination();
    }
    
    // 상단 메뉴 버튼 스타일 추가
    if ($('.top-menu-button-styles').length === 0) {
        const styles = `
            <style class="top-menu-button-styles">
                .top-menu-button {
                    display: inline-block;
                    background-color: #741102;
                    color: #fff !important;
                    padding: 8px 15px;
                    font-size: 14px;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    margin: 10px;
                    transition: background-color 0.3s, transform 0.3s;
                    text-decoration: none;
                    z-index: 1001;
                }
                
                .top-menu-button:hover {
                    background-color: #5a0d01;
                    transform: scale(1.05);
                    color: #fff !important;
                }
                
                @media (max-width: 768px) {
                    .top-menu-button {
                        font-size: 12px;
                        padding: 6px 12px;
                        margin: 8px;
                    }
                }
            </style>
        `;
        $('head').append(styles);
    }
});

/**
 * GSAP 애니메이션 초기화
 */
function initGSAPAnimations() {
    console.log('GSAP 애니메이션 초기화');
    
    // 햄버거 메뉴 호버 애니메이션
    $('.hamburger-menu').hover(
        function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.1,
                ease: 'power2.out'
            });
        },
        function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        }
    );
    
    // 모바일 메뉴 스타일 추가
    if ($('.mobile-menu-styles').length === 0) {
        const styles = `
            <style class="mobile-menu-styles">
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 250px;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.95);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    padding: 60px 20px 20px;
                    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
                }
                
                .mobile-menu ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .mobile-menu ul li {
                    margin-bottom: 20px;
                }
                
                .mobile-menu ul li a {
                    color: #fff;
                    font-size: 18px;
                    text-transform: uppercase;
                    display: block;
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .mobile-menu ul li a:hover {
                    color: #ff0000;
                }
                
                .hamburger-menu {
                    cursor: pointer;
                    color: #ff0000;
                    display: flex;
                    align-items: center;
                    z-index: 1001;
                }
            </style>
        `;
        $('head').append(styles);
    }
}

/**
 * 페이지네이션 설정
 */
function setupPagination() {
    // URL에서 현재 페이지 번호와 상태 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;
    const state = urlParams.get('state') || '';
    const keyword = urlParams.get('keyword') || '';
    
    // 페이지네이션 링크에 상태와 키워드 유지
    $('.page-link').each(function() {
        const href = $(this).attr('href');
        const url = new URL(href, window.location.origin);
        
        if (state) {
            url.searchParams.set('state', state);
        }
        
        if (keyword) {
            url.searchParams.set('keyword', keyword);
        }
        
        $(this).attr('href', url.pathname + url.search);
    });
    
    // 첫 로드 시 전시회 개수가 적다면 더 로드
    if ($('.compact-exhibition-item').length < 10) {
        loadAllExhibitions(currentPage);
    }
}

/**
 * 모든 전시회 정보 로드
 * @param {number} startPage - 시작 페이지 번호
 */
function loadAllExhibitions(startPage) {
    // URL에서 상태와 키워드 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state') || '';
    const keyword = urlParams.get('keyword') || '';
    
    // 페이지 수 (10페이지로 설정)
    const totalPages = 10;
    
    // 이미 데이터가 있으면 로드하지 않음
    if ($('.compact-exhibition-item').length >= totalPages * 10) {
        return;
    }
    
    // 로딩 표시
    const loadingElement = $('<div class="loading-more">Loading more exhibitions...</div>');
    $('#exhibitionList').after(loadingElement);
    
    // 데이터 로드
    const loadPage = function(page) {
        $.ajax({
            url: '../exhibition/api/list',
            type: 'GET',
            data: { 
                page: page, 
                limit: 10,
                state: state,
                keyword: keyword
            },
            dataType: 'json',
            success: function(data) {
                if (data && data.length > 0) {
                    appendExhibitions(data);
                    
                    // 다음 페이지 로드 (최대 10페이지까지)
                    if (page < totalPages) {
                        loadPage(page + 1);
                    } else {
                        loadingElement.remove();
                    }
                } else {
                    loadingElement.remove();
                }
            },
            error: function(error) {
                console.error('Error loading exhibitions:', error);
                loadingElement.remove();
            }
        });
    };
    
    // 페이지 로드 시작
    loadPage(startPage);
}

/**
 * 전시회 정보를 목록에 추가
 * @param {Array} exhibitions - 전시회 데이터 배열
 */
function appendExhibitions(exhibitions) {
    const container = $('#exhibitionList');
    
    exhibitions.forEach(function(exhibition) {
        // 이미 있는 전시회는 추가하지 않음
        if ($(`[data-id="${exhibition.exhibitionId}"]`).length > 0) {
            return;
        }
        
        const imageUrl = exhibition.imageUrl || '/assets/img/load.png';
        const genre = exhibition.genre || '기간 정보 없음';
        const card = `
            <div class="compact-exhibition-item" data-id="${exhibition.exhibitionId}">
                <div class="exhibition-image-container">
                    <img src="${imageUrl}" alt="${exhibition.title}" onerror="this.src='/assets/img/load.png'">
                </div>
                <div class="exhibition-info-container">
                    <div class="exhibition-title-area">
                        <h2 class="exhibition-title">ONLINE: "${exhibition.title}"</h2>
                    </div>
                    <div class="exhibition-genre-area">
                        <span class="starts-ends">Starts / Ends</span>
                        <p class="genre-value">${genre}</p>
                    </div>
                </div>
                <div class="action-area">
                    <a href="../exhibition/detail/${exhibition.exhibitionId}" class="discover-more-btn">DISCOVER MORE</a>
                </div>
            </div>
        `;
        container.append(card);
    });
    
    // 이미지 크기 조정
    fixLayout();
}

/**
 * 레이아웃 문제 해결을 위한 유틸리티 함수
 */
function fixLayout() {
    // 화면 크기에 따라 요소 조정
    const windowWidth = $(window).width();
    
    if (windowWidth <= 768) {
        $('.main-nav').hide();
        $('.hamburger-menu').show();
        
        // 모바일 화면에서 상단 메뉴 버튼 위치 조정
        $('.top-menu-button').css({
            'top': '0',
            'right': '50px'
        });
    } else {
        $('.main-nav').show();
        $('.hamburger-menu').hide();
        
        // 데스크톱 화면에서 상단 메뉴 버튼 위치 조정
        $('.top-menu-button').css({
            'top': '0',
            'right': '10px'
        });
    }
    
    // 이미지 크기 조정
    $('.exhibition-image').each(function() {
        if ($(this).find('img').length > 0) {
            const width = $(this).width();
            $(this).css('height', width * 0.75 + 'px');
        }
    });

    // 컴팩트 리스트 이미지 컨테이너 비율 조정
    $('.exhibition-image-container').each(function() {
        if (windowWidth <= 768) {
            $(this).css('height', '180px');
        } else {
            $(this).css('height', '160px');
        }
    });
}

/**
 * 추천 전시회 로드하기 - 자동 방식으로 변경
 */
function loadFeaturedExhibitions() {
    console.log("추천 전시회 로드 시작");
    
    // 로딩 메시지 표시
    $('#featuredExhibitions').html('<div class="loading">Loading exhibitions...</div>');
    
    // 추천 전시회를 가져오는 API 호출 (최신 8개)
    $.ajax({
        url: './exhibition/api/list',
        type: 'GET',
        data: { 
            limit: 8,
            sort: 'newest' // 최신순으로 정렬 (서버에서 지원한다고 가정)
        },
        dataType: 'json',
        success: function(data) {
            console.log("AJAX 응답 데이터:", data);
            
            if (Array.isArray(data) && data.length > 0) {
                console.log("표시할 전시회 데이터:", data);
                displayFeaturedExhibitions(data);
            } else {
                console.error("API 응답이 배열이 아니거나 비어 있습니다:", data);
                // 대체 방법으로 다시 API 호출 (정렬 없이)
                loadFallbackExhibitions();
            }
        },
        error: function(error) {
            console.error('추천 전시회 로드 오류:', error);
            // 오류 발생 시 대체 방법으로 다시 API 호출
            loadFallbackExhibitions();
        }
    });
}

/**
 * 대체 전시회 로드 방법 - 기본 API 호출
 */
function loadFallbackExhibitions() {
    console.log("대체 방법으로 전시회 데이터를 가져옵니다.");
    
    $.ajax({
        url: './exhibition/api/list',
        type: 'GET',
        data: { limit: 8 }, // 단순히 8개만 요청
        dataType: 'json',
        success: function(data) {
            if (Array.isArray(data) && data.length > 0) {
                displayFeaturedExhibitions(data);
            } else {
                // 여전히 데이터가 없으면 기본 메시지 표시
                $('#featuredExhibitions').html('<p>표시할 전시회 정보가 없습니다.</p>');
            }
        },
        error: function(error) {
            console.error('대체 전시회 로드 오류:', error);
            $('#featuredExhibitions').html('<p>전시회 정보를 불러오는 중 오류가 발생했습니다.</p>');
        }
    });
}

/**
 * 현재 전시회 로드하기
 */
function loadCurrentExhibitions() {
    console.log("현재 전시회 로드 시작");
    
    // 로딩 메시지 표시
    $('#currentExhibitions').html('<div class="loading">Loading current exhibitions...</div>');
    
    $.ajax({
        url: './exhibition/api/list',
        type: 'GET',
        data: { 
            state: 'current', 
            limit: 3  // 3개만 표시하도록 수정
        },
        dataType: 'json',
        success: function(data) {
            console.log("현재 전시회 데이터:", data);
            if (Array.isArray(data) && data.length > 0) {
                displayCurrentExhibitions(data);
            } else {
                console.log("현재 전시회 데이터가 비어있습니다. 대체 데이터를 로드합니다.");
                loadFallbackCurrentExhibitions();
            }
        },
        error: function(error) {
            console.error('현재 전시회 로드 오류:', error);
            loadFallbackCurrentExhibitions();
        }
    });
}

/**
 * 대체 현재 전시회 로드 방법
 */
function loadFallbackCurrentExhibitions() {
    console.log("대체 방법으로 현재 전시회 데이터를 가져옵니다.");
    
    $.ajax({
        url: './exhibition/api/list',
        type: 'GET',
        data: { limit: 3 },  // 3개만 요청하도록 수정
        dataType: 'json',
        success: function(data) {
            if (Array.isArray(data) && data.length > 0) {
                displayCurrentExhibitions(data);
            } else {
                $('#currentExhibitions').html('<p>표시할 현재 전시회 정보가 없습니다.</p>');
            }
        },
        error: function(error) {
            console.error('대체 현재 전시회 로드 오류:', error);
            $('#currentExhibitions').html('<p>현재 전시회 정보를 불러오는 중 오류가 발생했습니다.</p>');
        }
    });
}

/**
 * 관련 전시회 로드하기
 * @param {string} exhibitionId - 현재 전시회 ID
 */
function loadRelatedExhibitions(exhibitionId) {
    $.ajax({
        url: '../api/list',
        type: 'GET',
        data: { exclude: exhibitionId, limit: 3 },
        dataType: 'json',
        success: function(data) {
            displayRelatedExhibitions(data);
        },
        error: function(error) {
            $('#relatedExhibitions').html('<p>Failed to load related exhibitions.</p>');
            console.error('Error loading related exhibitions:', error);
        }
    });
}

/**
 * 추천 전시회 표시하기
 * @param {Array} exhibitions - 전시회 데이터 배열
 */
function displayFeaturedExhibitions(exhibitions) {
    const container = $('#featuredExhibitions');
    container.empty();

    if (!exhibitions || exhibitions.length === 0) {
        container.html('<p>표시할 전시회 정보가 없습니다.</p>');
        return;
    }

    console.log("displayFeaturedExhibitions 함수 호출됨, 전시회 개수:", exhibitions.length);

    exhibitions.forEach(function(exhibition, index) {
        console.log(`${index + 1}. 전시회 ID: ${exhibition.exhibitionId}, 이미지 URL: ${exhibition.imageUrl || '없음'}`);
        
        // 이미지 URL이 없거나 빈 문자열이면 기본 이미지 사용
        const imageUrl = exhibition.imageUrl && exhibition.imageUrl.trim() !== '' 
            ? exhibition.imageUrl
            : '/assets/img/load.png';
        
        const card = `
            <div class="photo-frame">
                <a href="./exhibition/detail/${exhibition.exhibitionId}">
                    <img src="${imageUrl}" alt="${exhibition.title || '전시회'}" 
                         onerror="this.onerror=null; this.src='/assets/img/load.png';">
                    <div class="photo-title">${exhibition.title || `전시회 ${exhibition.exhibitionId}`}</div>
                </a>
            </div>
        `;
        container.append(card);
    });

    // 이미지 로드 오류 처리 추가
    $('.photo-frame img').on('error', function() {
        console.log("이미지 로드 오류 발생, 기본 이미지로 대체:", $(this).attr('src'));
        $(this).attr('src', '/assets/img/load.png');
    });

    // 이미지 로드 완료 후 크기 조정
    $('.photo-frame img').on('load', function() {
        $(this).css({
            'object-fit': 'contain',
            'width': '100%',
            'height': '100%'
        });
    });
}

/**
 * 현재 전시회 표시하기 - 컴팩트 리스트 형태로 변경
 * @param {Array} exhibitions - 전시회 데이터 배열
 */
function displayCurrentExhibitions(exhibitions) {
    const container = $('#currentExhibitions');
    container.empty();
    container.addClass('compact-exhibition-list');
    
    if (!exhibitions || exhibitions.length === 0) {
        container.html('<p>표시할 현재 전시회 정보가 없습니다.</p>');
        return;
    }
    
    console.log("현재 전시회 표시 중, 개수:", exhibitions.length);
    
    // 전시회 항목들을 담을 래퍼 추가
    const wrapperElement = $('<div class="current-exhibitions-wrapper"></div>');
    container.append(wrapperElement);
    
    exhibitions.forEach(function(exhibition, index) {
        console.log(`${index + 1}. 현재 전시회 ID: ${exhibition.exhibitionId}, 제목: ${exhibition.title || '제목 없음'}`);
        
        const imageUrl = exhibition.imageUrl && exhibition.imageUrl.trim() !== '' 
            ? exhibition.imageUrl 
            : '/assets/img/load.png';
            
        const period = exhibition.genre || exhibition.period || '기간 정보 없음'; // 기간 정보가 genre 필드나 period 필드에 있을 수 있음
        
        const card = `
            <div class="compact-exhibition-item" data-id="${exhibition.exhibitionId}">
                <div class="exhibition-image-container">
                    <img src="${imageUrl}" alt="${exhibition.title || '전시회'}" 
                         onerror="this.onerror=null; this.src='/assets/img/load.png';">
                </div>
                <div class="exhibition-info-container">
                    <div class="exhibition-title-area">
                        <h2 class="exhibition-title">${exhibition.title || `전시회 ${exhibition.exhibitionId}`}</h2>
                    </div>
                    <div class="exhibition-genre-area">
                        <span class="starts-ends">기간</span>
                        <p class="genre-value">${period}</p>
                    </div>
                </div>
                <div class="action-area">
                    <a href="./exhibition/detail/${exhibition.exhibitionId}" class="discover-more-btn">자세히 보기</a>
                </div>
            </div>
        `;
        wrapperElement.append(card);
    });
    
    // 이미지 로드 오류 처리 추가
    $('.exhibition-image-container img').on('error', function() {
        console.log("이미지 로드 오류 발생, 기본 이미지로 대체:", $(this).attr('src'));
        $(this).attr('src', '/assets/img/load.png');
    });
}

/**
 * 관련 전시회 표시하기 - 컴팩트 리스트 형태로 변경
 * @param {Array} exhibitions - 전시회 데이터 배열
 */
function displayRelatedExhibitions(exhibitions) {
    const container = $('#relatedExhibitions');
    container.empty();
    container.addClass('compact-exhibition-list');
    
    if (!exhibitions || exhibitions.length === 0) {
        container.html('<p>No related exhibitions to display.</p>');
        return;
    }
    
    exhibitions.forEach(function(exhibition) {
        const imageUrl = exhibition.imageUrl || '/assets/img/load.png';
        const genre = exhibition.genre || '기간 정보 없음'; // 장르 정보 사용
        const card = `
            <div class="compact-exhibition-item" data-id="${exhibition.exhibitionId}">
                <div class="exhibition-image-container">
                    <img src="${imageUrl}" alt="${exhibition.title}" onerror="this.src='/assets/img/load.png'">
                </div>
                <div class="exhibition-info-container">
                    <div class="exhibition-title-area">
                        <h2 class="exhibition-title">ONLINE: "${exhibition.title}"</h2>
                    </div>
                    <div class="exhibition-genre-area">
                        <span class="starts-ends">Starts / Ends</span>
                        <p class="genre-value">${genre}</p>
                    </div>
                </div>
                <div class="action-area">
                    <a href="../detail/${exhibition.exhibitionId}" class="discover-more-btn">DISCOVER MORE</a>
                </div>
            </div>
        `;
        container.append(card);
    });
}