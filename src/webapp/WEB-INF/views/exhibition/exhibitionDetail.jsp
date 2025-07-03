<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
// 페이지 출력 전 버퍼 비우기
out.clearBuffer();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${exhibition.title} - Art Gallery</title>
    <link rel="stylesheet" href="<c:url value='/assets/css/exhibition.css' />">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Open Graph 태그 추가 -->
    <meta property="og:title" content="${exhibition.title} - Art Gallery">
    <meta property="og:description" content="${exhibition.introduction}">
    <meta property="og:image" content="${exhibition.imageUrl}">
</head>
<body class="detail-page">
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
        <c:if test="${empty exhibition}">
            <div class="no-exhibition">
                <p>Exhibition information not found.</p>
                <a href="<c:url value='/exhibition/list' />" class="btn">Back to Exhibitions</a>
            </div>
        </c:if>
        
        <c:if test="${not empty exhibition}">
            <section class="exhibition-detail-section">
                <div class="exhibition-header">
                    <h1>${exhibition.title}</h1>
                    <span class="status ${exhibition.exhibitionStatus eq '진행중' ? 'current' : exhibition.exhibitionStatus eq '예정' ? 'upcoming' : 'ended'}">
                        ${exhibition.exhibitionStatus}
                    </span>
                </div>
                
                <div class="exhibition-content">
                    <div class="exhibition-image">
                        <c:choose>
                            <c:when test="${not empty exhibition.imageUrl}">
                                <img src="${exhibition.imageUrl}" alt="${exhibition.title}" onerror="this.src='<c:url value='/assets/img/load.png' />'">
                            </c:when>
                            <c:otherwise>
                                <div class="no-image">No Image Available</div>
                            </c:otherwise>
                        </c:choose>
                    </div>
                    
                    <div class="exhibition-info">
                        <div class="info-group">
                            <h3>EXHIBITION PERIOD</h3>
                            <p>${exhibition.formattedPeriod}</p>
                        </div>
                        
                        <div class="info-group">
                            <h3>LOCATION</h3>
                            <p>${exhibition.place}</p>
                            <c:if test="${not empty exhibition.eventSite}">
                                <p>${exhibition.eventSite}</p>
                            </c:if>
                        </div>
                        
                        <c:if test="${not empty exhibition.genre}">
                            <div class="info-group">
                                <h3>GENRE</h3>
                                <p>${exhibition.genre}</p>
                            </div>
                        </c:if>
                        
                        <c:if test="${not empty exhibition.duration}">
                            <div class="info-group">
                                <h3>VIEWING TIME</h3>
                                <p>${exhibition.duration}</p>
                            </div>
                        </c:if>
                        
                        <c:if test="${not empty exhibition.ticketInfo}">
                            <div class="info-group">
                                <h3>ADMISSION</h3>
                                <p>${exhibition.ticketInfo}</p>
                            </div>
                        </c:if>
                        
                        <c:if test="${not empty exhibition.author}">
                            <div class="info-group">
                                <h3>ARTIST</h3>
                                <p>${exhibition.author}</p>
                            </div>
                        </c:if>
                        
                        <c:if test="${not empty exhibition.audience}">
                            <div class="info-group">
                                <h3>AGE RATING</h3>
                                <p>${exhibition.audience}</p>
                            </div>
                        </c:if>
                        
                        <c:if test="${not empty exhibition.contributor}">
                            <div class="info-group">
                                <h3>ORGANIZED BY</h3>
                                <p>${exhibition.contributor}</p>
                            </div>
                        </c:if>
                        
                        <c:if test="${not empty exhibition.contactPoint}">
                            <div class="info-group">
                                <h3>CONTACT</h3>
                                <p>${exhibition.contactPoint}</p>
                            </div>
                        </c:if>
                        
                        <div class="info-group">
                            <h3>ABOUT THE EXHIBITION</h3>
                            <div class="introduction">
                                ${exhibition.introduction}
                            </div>
                        </div>
                        
                        <c:if test="${not empty exhibition.numberPages}">
                            <div class="info-group">
                                <h3>EXHIBITION ITEMS</h3>
                                <p>${exhibition.numberPages}</p>
                            </div>
                        </c:if>
                        
                        <c:if test="${not empty exhibition.tableOfContents}">
                            <div class="info-group">
                                <h3>INFORMATION & GUIDELINES</h3>
                                <div class="guidelines">
                                    ${exhibition.tableOfContents}
                                </div>
                            </div>
                        </c:if>
                        
                        <!-- "DISCOUNT INFORMATION" 항목 제거함 -->
                        
                        <div class="action-buttons">
                            <c:if test="${not empty exhibition.detailUrl}">
                                <a href="${exhibition.detailUrl}" target="_blank" class="btn primary">Visit Official Website</a>
                            </c:if>
                            <a href="javascript:history.back();" class="btn secondary">Back</a>
                            <button class="btn share-btn" onclick="shareExhibition()">Share</button>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="related-exhibitions">
                <h2>RELATED EXHIBITIONS</h2>
                <div class="exhibition-list" id="relatedExhibitions">
                    <!-- Will be loaded via Ajax -->
                    <div class="loading">Loading related exhibitions...</div>
                </div>
            </section>
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
        function shareExhibition() {
            if (navigator.share) {
                navigator.share({
                    title: '${exhibition.title} - Art Gallery',
                    text: '${exhibition.introduction}',
                    url: window.location.href
                })
                .then(() => console.log('Sharing successful'))
                .catch((error) => console.log('Sharing failed:', error));
            } else {
                // 웹 공유 API가 지원되지 않는 경우
                alert('Your browser does not support the Share API.');
                // URL 복사하기 기능
                const tempInput = document.createElement('input');
                document.body.appendChild(tempInput);
                tempInput.value = window.location.href;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                alert('URL has been copied to clipboard.');
            }
        }
        
        // 페이지 로드 시 관련 전시회 로드
        $(document).ready(function() {
            loadRelatedExhibitions('${exhibition.exhibitionId}');
        });
    </script>
</body>
</html>