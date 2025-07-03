<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art Gallery - Exhibitions</title>
    <link rel="stylesheet" href="<c:url value='/assets/css/exhibition.css' />">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <header class="main-header">
        <div class="logo">
            <a href="<c:url value='/exhibition' />">artgallery.com</a>
        </div>
        <nav class="main-nav">
            <ul>
                <li><a href="<c:url value='/exhibition' />">EXHIBITIONS</a></li>
                <li><a href="<c:url value='/exhibition/list?state=current' />">CURRENT SHOWS</a></li>
                <li><a href="<c:url value='/exhibition/list?state=upcoming' />">UPCOMING SHOWS</a></li>
                <li><a href="<c:url value='/exhibition/list' />">OUR GALLERY</a></li>
            </ul>
        </nav>
        <div class="hamburger-menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="#FF0000" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
    </header>

    <div class="hero-section">
        <div class="hero-content">
            <h1>EXHIBITIONS</h1>
        </div>
    </div>

    <div class="main-container">
        <section class="gallery-section">
            <div class="photo-grid" id="featuredExhibitions">
                <!-- 전시회 사진 그리드가 AJAX로 로드됩니다 -->
                <div class="loading">Loading exhibitions...</div>
            </div>
        </section>

        <section class="categories">
            <div class="category-filter">
                <ul>
                    <li class="active"><a href="<c:url value='/exhibition' />">All</a></li>
                    <li><a href="<c:url value='/exhibition/list?state=current' />">Current & Upcoming</a></li>
                    <li><a href="<c:url value='/exhibition/list?state=archived' />">Archive</a></li>
                </ul>
            </div>
        </section>

        <section class="current-exhibitions">
            <h2>Current & Upcoming</h2>
            <div class="exhibition-list" id="currentExhibitions">
                <!-- 현재 전시회 리스트가 AJAX로 로드됩니다 -->
                <div class="loading">Loading current exhibitions...</div>
            </div>
            <div class="view-more">
                <a href="<c:url value='/exhibition/list?state=current' />" class="btn primary">View All Current Exhibitions</a>
            </div>
        </section>
    </div>

    <footer>
        <div class="footer-content">
            <div class="footer-sections">
                <div class="footer-column">
                    <h3>EXHIBITIONS</h3>
                    <ul>
                        <li><a href="<c:url value='/exhibition/list?state=current' />">Current Shows</a></li>
                        <li><a href="<c:url value='/exhibition/list?state=upcoming' />">Upcoming Shows</a></li>
                        <li><a href="<c:url value='/exhibition/list?state=archived' />">Archive</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>OUR GALLERY</h3>
                    <ul>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Visit us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>FOLLOW US</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Twitter</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-info">
                <div class="address">
                    National Museum of Modern and Contemporary Art<br>
                    Seoul, Korea
                </div>
                <div class="contact">
                    info@artgallery.com<br>
                    +82-2-3701-9500
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2025 Art Gallery. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="<c:url value='/assets/js/exhibition.js' />"></script>
</body>
</html>