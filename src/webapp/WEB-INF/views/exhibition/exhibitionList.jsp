<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art Gallery - Exhibition List</title>
    <link rel="stylesheet" href="<c:url value='/assets/css/exhibition.css' />">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body class="list-page">
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

    <div class="main-container">
        <h1 class="list-title">
            <c:choose>
                <c:when test="${state eq 'current'}">Current & Upcoming</c:when>
                <c:when test="${state eq 'upcoming'}">Upcoming Exhibitions</c:when>
                <c:when test="${state eq 'archived'}">Exhibition Archive</c:when>
                <c:when test="${not empty keyword}">Search Results: ${keyword}</c:when>
                <c:otherwise>ALL EXHIBITIONS</c:otherwise>
            </c:choose>
        </h1>

        <section class="exhibition-list-section">
            <c:if test="${empty exhibitions}">
                <div class="no-results">
                    <p>No exhibitions found.</p>
                </div>
            </c:if>
            
            <!-- 컴팩트 리스트 형태로 변경 -->
            <div class="compact-exhibition-list" id="exhibitionList">
                <c:forEach items="${exhibitions}" var="exhibition">
                    <div class="compact-exhibition-item">
                        <div class="exhibition-image-container">
                            <c:choose>
                                <c:when test="${not empty exhibition.imageUrl}">
                                    <img src="${exhibition.imageUrl}" alt="${exhibition.title}" onerror="this.src='<c:url value='/assets/img/load.png' />'">
                                </c:when>
                                <c:otherwise>
                                    <img src="<c:url value='/assets/img/load.png' />" alt="No Image Available">
                                </c:otherwise>
                            </c:choose>
                        </div>
                        <div class="exhibition-info-container">
                            <div class="exhibition-title-area">
                                <h2 class="exhibition-title">ONLINE: "${exhibition.title}"</h2>
                            </div>
                            <div class="exhibition-genre-area">
                                <span class="starts-ends">Starts / Ends</span>
                                <p class="genre-value">${not empty exhibition.genre ? exhibition.genre : '기간 정보 없음'}</p>
                            </div>
                        </div>
                        <div class="action-area">
                            <a href="<c:url value='/exhibition/detail/${exhibition.exhibitionId}' />" class="discover-more-btn">DISCOVER MORE</a>
                        </div>
                    </div>
                </c:forEach>
            </div>
            
            <!-- 향상된 페이지네이션 -->
            <div class="pagination">
                <c:set var="totalPages" value="${(totalCount + 9) / 10}" />
                <c:set var="displayPages" value="10" />
                <c:set var="startPage" value="${(currentPage - 1) / displayPages * displayPages + 1}" />
                <c:set var="endPage" value="${startPage + displayPages - 1}" />
                
                <c:if test="${endPage > totalPages}">
                    <c:set var="endPage" value="${totalPages}" />
                </c:if>
                
                <!-- 처음 페이지로 이동 -->
                <c:if test="${currentPage > 1}">
                    <a href="<c:url value='/exhibition/list?page=1' />" class="page-link first-page">&laquo;</a>
                </c:if>
                
                <!-- 이전 페이지로 이동 -->
                <c:if test="${currentPage > 1}">
                    <a href="<c:url value='/exhibition/list?page=${currentPage - 1}' />" class="page-link prev-page">&lt;</a>
                </c:if>
                
                <!-- 페이지 번호 -->
                <c:forEach begin="${startPage}" end="${endPage}" var="i">
                    <a href="<c:url value='/exhibition/list?page=${i}' />" class="page-link ${i eq currentPage ? 'current' : ''}">
                        ${i}
                    </a>
                </c:forEach>
                
                <!-- 다음 페이지로 이동 -->
                <c:if test="${currentPage < totalPages}">
                    <a href="<c:url value='/exhibition/list?page=${currentPage + 1}' />" class="page-link next-page">&gt;</a>
                </c:if>
                
                <!-- 마지막 페이지로 이동 -->
                <c:if test="${currentPage < totalPages}">
                    <a href="<c:url value='/exhibition/list?page=${totalPages}' />" class="page-link last-page">&raquo;</a>
                </c:if>
            </div>
        </section>
        
        <c:if test="${not empty keyword}">
            <div class="back-to-list">
                <a href="<c:url value='/exhibition/list' />" class="btn secondary">Back to All Exhibitions</a>
            </div>
        </c:if>
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
    <script>
        $(document).ready(function() {
            // URL에서 현재 페이지 번호 가져오기
            const urlParams = new URLSearchParams(window.location.search);
            const currentPage = parseInt(urlParams.get('page')) || 1;
            
            // 만약 페이지가 1보다 크고 전시회 목록이 없다면 추가 페이지 로드 시도
            if (currentPage > 1 && $('.compact-exhibition-item').length === 0) {
                loadMoreExhibitions(currentPage);
            }
        });
        
        // 추가 페이지를 로드하는 함수
        function loadMoreExhibitions(page) {
            $.ajax({
                url: './api/list',
                type: 'GET',
                data: { page: page, limit: 10 },
                dataType: 'json',
                success: function(data) {
                    if (data && data.length > 0) {
                        const container = $('#exhibitionList');
                        data.forEach(function(exhibition) {
                            const imageUrl = exhibition.imageUrl || '/assets/img/load.png';
                            const genre = exhibition.genre || '기간 정보 없음';
                            const card = `
                                <div class="compact-exhibition-item">
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
                                        <a href="./detail/${exhibition.exhibitionId}" class="discover-more-btn">DISCOVER MORE</a>
                                    </div>
                                </div>
                            `;
                            container.append(card);
                        });
                        
                        // 이미지 크기 조정
                        fixLayout();
                    }
                },
                error: function(error) {
                    console.error('Error loading additional exhibitions:', error);
                }
            });
        }
    </script>
</body>
</html>