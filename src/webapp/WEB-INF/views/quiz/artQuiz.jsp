<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Art Quiz</title>
    <!-- 외부 라이브러리 CDN -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <!-- 아이콘 라이브러리 추가 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- 내부 리소스 연결 -->
    <script>
        var userId = ${sessionScope.user.userId};
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/artQuiz.css">
    <script src="${pageContext.request.contextPath}/assets/js/artQuiz.js"></script>
</head>
<body>
    <div class="container">
        <div class="header">
            <button class="list-button" onclick="location.href='${pageContext.request.contextPath}/quiz'">
                <i class="fas fa-list"></i> 목록으로
            </button>
            <button class="give-up-btn" id="give-up-btn">GIVE UP</button>
        </div>
        <div class="quiz-container">
            <div class="artwork-section">
                <div class="artwork-display">
                    <img id="artwork-image" src="/assets/image/room.jpg" alt="Artwork">
                    <div class="artwork-info">
                        <h2 id="artwork-title"></h2>
                        <p id="artwork-artist"></p>
                    </div>
                </div>
            </div>
            <div class="quiz-section">
                <div class="quiz-header">
                    <h1>Art Quiz</h1>
                    <p>Test your knowledge about this masterpiece</p>
                    <div class="progress-info">
                        <span id="question-counter">Question 1/4</span>
                    </div>
                </div>
                <div class="quiz-content">
                    <div class="question-container" id="question-container">
                        <!-- Questions will be loaded here -->
                    </div>
                    <div class="navigation-buttons">
                        <button id="prev-btn" class="nav-btn" disabled>Previous</button>
                        <button id="next-btn" class="nav-btn">Next</button>
                        <button id="submit-btn" class="submit-btn" style="display: none;" type="button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Results Modal -->
    <div id="result-modal" class="result-modal">
        <div class="result-content">
            <span class="close-result" id="close-result">&times;</span>
            <h2 class="result-title">Quiz Results</h2>
            <div class="score-display">
                <div class="score-text" id="score-text"></div>
                <div class="score-message" id="score-message"></div>
            </div>
            <div class="result-details" id="result-details"></div>
            <div class="result-actions">
                <button id="retry-btn" class="result-btn retry-btn">Try Again</button>
                <button id="next-artwork-btn" class="result-btn next-artwork-btn">Next Artwork</button>
            </div>
        </div>
    </div>
</body>
</html>