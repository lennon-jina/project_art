<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visual Explore</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/main.css" />
    <!-- Google Fonts - Emblema One 추가 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Emblema+One&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Main3 로더 부분 -->
    <div class="loader">
        <div class="count-wrapper">
            <div class="count">
                <div class="digit"><h1>9</h1></div>
                <div class="digit"><h1>8</h1></div>
                <div class="digit"><h1>7</h1></div>
                <div class="digit"><h1>4</h1></div>
                <div class="digit"><h1>2</h1></div>
                <div class="digit"><h1>0</h1></div>
            </div>
        </div>
        
        <div class="count-wrapper">
            <div class="count">
                <div class="digit"><h1>9</h1></div>
                <div class="digit"><h1>5</h1></div>
                <div class="digit"><h1>9</h1></div>
                <div class="digit"><h1>7</h1></div>
                <div class="digit"><h1>4</h1></div>
                <div class="digit"><h1>0</h1></div>
            </div>
        </div>
        
        <div class="revealer revealer-1">
            <svg
                width="151"
                height="148"
                viewBox="0 0 151 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
                    fill="#D4C9B4"
                />
            </svg>
        </div>
        <div class="revealer revealer-2">
            <svg
                width="151"
                height="148"
                viewBox="0 0 151 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
                    fill="#741102"
                />
            </svg>
        </div>
        <div class="revealer revealer-3">
            <svg
                width="151"
                height="148"
                viewBox="0 0 151 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
                    fill="#042D29"
                />
            </svg>
        </div>
    </div>
    
    <!-- Main3 컨테이너 부분 -->
    <div class="container">
        <div class="site-info">
		    <a href="/">
		        <img src="assets/img/logo.png" alt="My Logo" class="site-logo">
		    </a>
		</div>
        
        <div class="toggle-btn">
            <a href="${pageContext.request.contextPath}/menu">
            	<img src="${pageContext.request.contextPath}/assets/img/icon.svg" alt="menu-icon" />
        	</a>
        </div>
        
        <div class="header">
            <h1>Visual Explore</h1>
        </div>
        
        <!-- 새로 추가된 미니 네비게이션 바 -->
        <div class="mini-nav">
		    <div class="mini-nav-item login" id="loginTab">
		        <a href="${pageContext.request.contextPath}/login">LOGIN</a>
		    </div>
		    <div class="mini-nav-item logout" id="logoutTab" style="display: none;">
		        <a href="${pageContext.request.contextPath}/logout">LOGOUT</a>
		    </div>
		    <div class="mini-nav-item mypage" id="mypageTab" style="display: none;">
		        <a href="${pageContext.request.contextPath}/mypage">MYPAGE</a>
		    </div>
		</div>

    <!-- Main4 부분 (처음에는 숨겨져 있음) -->
    <div id="main4-content" style="display: none;">
        <div class="items-container"></div>
        
        <div class="cursor">
            <img src="./assets/img/starburst.png" width="50px" alt="" />
        </div>
        
        <div class="wrapper">
            <nav>
                <div class="nav-item">
                    <p>asdfsadfsadf<br />sadfsadfsadfsadffsa</p>
                </div>
                <div class="nav-item">
                    <p>sdfasdfasdfasfd<br />fasdfasdfasdfasfdsafd</p>
                    <p>sadfasdfsadfasd<br />sadfasdfasfd</p>
                </div>
            </nav>
            <!-- main4의 header 부분은 제거했습니다 -->
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="${pageContext.request.contextPath}/assets/js/main.js"></script>
    <!-- 로그인 관련 스크립트 추가 -->
    <script src="${pageContext.request.contextPath}/assets/js/login.js"></script>
    <script>
    // contextPath 변수 설정
    const contextPath = "${pageContext.request.contextPath}";
    
    // 세션에서 사용자 정보 가져오기 (문제가 발생할 수 있는 부분)
    // not empty sessionScope.user가 true인 경우 true를, 아닌 경우 false를 반환하도록 수정
    const sessionUser = ${not empty sessionScope.user ? 'true' : 'false'};
    
    // 디버깅을 위한 로그 추가
    console.log("세션 사용자 정보:", sessionUser);
    
    // 페이지 로드시 로그인 상태 확인
    document.addEventListener('DOMContentLoaded', function() {
        checkLoginStatus();
    });
    
    // 로그인 상태에 따라 버튼 표시/숨김 처리
    function checkLoginStatus() {
        if (sessionUser === true) {
            document.getElementById('loginTab').style.display = 'none';
            document.getElementById('logoutTab').style.display = 'block';
            document.getElementById('mypageTab').style.display = 'block';
        } else {
            document.getElementById('loginTab').style.display = 'block';
            document.getElementById('logoutTab').style.display = 'none';
            document.getElementById('mypageTab').style.display = 'none';
        }
    }
</script>
</body>
</html>