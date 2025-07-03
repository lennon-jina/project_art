<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery 메인</title>
    <!-- ✨ 내부 CSS 연결 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/GalleryMain.css">
    <!-- ✨ 내부 JS 연결 -->
    <script src="${pageContext.request.contextPath}/assets/js/GalleryMain.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <style>
    /* 로고 이미지 스타일 */
    .logo img {
        vertical-align: middle;
    }
</style>
</head>
<body>
    <header class="header">
        <div class="logo"><img src="${pageContext.request.contextPath}/assets/img/black.png" alt="FellowArt"></div>
        <button class="hamburger-btn">&#9776;</button>
    </header>

    <div class="center-logo">
        <div class="red-line-left"></div>
        <div class="logo-text" id="centralText">visual explore</div>
        <div class="red-line-right"></div>
    </div>
    <div class="gallery-container" id="galleryContainer">
        <div class="gallery" id="gallery">
            <!-- JavaScript로 이미지 동적 추가 -->
        </div>
    </div>
    <div class="museum-title">
        VISUAL EXPLORE SINCE 2025
    </div>
    <button class="search-button">+</button>
    <!-- 작은 별 표시 -->
    <div class="asterisk asterisk-1">*</div>
    <div class="asterisk asterisk-2">*</div>
    <div class="asterisk asterisk-3">*</div>
    <div class="asterisk asterisk-4">*</div>
    <div class="asterisk asterisk-5">*</div>
    <div class="asterisk asterisk-6">*</div>
    <div class="asterisk asterisk-7">*</div>
    <div class="asterisk asterisk-8">*</div>
    
    <div id="page-transition-overlay" class="page-transition-overlay"></div>
    <script>
    // JSP EL 변수를 JavaScript 변수로 설정
    window.contextPath = "${pageContext.request.contextPath}";
</script>
</body>
</html>