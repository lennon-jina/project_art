<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>작가 갤러리</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/artwork.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <style>
        /* 추가 스타일 */
        .artist-header h1 {
            font-size: 48px; /* 작가 이름 폰트 크기 증가 */
            margin-bottom: 30px;
        }
        
        .artist-header p {
            font-size: 18px; /* 작가 설명 폰트 크기 증가 */
            line-height: 1.9;
            margin-bottom: 20px;
        }
        
        .artwork-container {
            margin: 100px 0; /* 사진과 텍스트 사이 간격 증가 */
        }
        
        .back-btn {
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="gallery-container">
        <!-- 새 헤더 구조 -->
        <header class="new-header">
            <div class="site-icon">
                <img src="${pageContext.request.contextPath}/assets/img/black.png" alt="사이트 아이콘">
            </div>
            <button class="back-btn" onclick="location.href='/gallery'">Back</button>
        </header>
        <!-- 작가 헤더 정보 -->
        <div class="artist-header">
            <h1 id="artist-name">${artistName}</h1>
            <p id="artist-description">${artistDescription}</p>
        </div>
        <div class="artwork-container">
            <div class="decoration top-left">✦</div>
            <div class="artwork-track" id="artwork-track">
                <!-- 작품들이 JavaScript로 여기에 추가됩니다 -->
            </div>
            <div class="decoration bottom-right">✦</div>
        </div>
    </div>
    <!-- 모달 -->
    <div class="modal-overlay" id="artwork-modal">
        <div class="modal-content">
            <div class="modal-image">
                <img id="modal-img" src="" alt="작품">
            </div>
            <div class="modal-details">
                <button class="modal-close" id="modal-close">×</button>
                <h2 class="modal-title" id="modal-title">작품 제목</h2>
                <div class="modal-year" id="modal-year">제작 연도</div>
                <div class="modal-medium" id="modal-medium">작품 재료</div>
                <p class="modal-description" id="modal-description">
                    <span class="modal-loading">작품 정보를 불러오는 중...</span>
                </p>
                <p class="translation-status" id="translation-status"></p>
            </div>
        </div>
    </div>
    
    <script>
    // URL에서 작가 이름 가져오기
    window.selectedArtist = "${artistName}";
    </script>
    <script src="${pageContext.request.contextPath}/assets/js/artwork.js"></script>
</body>
</html>