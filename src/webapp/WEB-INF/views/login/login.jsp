<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WheelWidget - 로그인</title>

  <!-- 외부 라이브러리 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400&display=swap" rel="stylesheet">

  <!-- ✨ 내부 CSS 연결 -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/login.css">

  <!-- ✨ 내부 JS 연결 -->
  <script src="${pageContext.request.contextPath}/assets/js/login.js"></script>
</head>

<body>
  <!-- 상단 무한 스크롤 배너 -->
  <div class="banner-container">
    <div class="banner-content">
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
    </div>
    <div class="banner-content" aria-hidden="true">
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
      <div class="banner-item"><b>Welcome to Visual Explore</b> 😊 Explore the world of masterpieces at Visual Explore</div>
    </div>
  </div>

  <div class="main-container">
    <div class="form-section">
      <!-- 로그인 폼 -->
      <div class="login-section">
        <h1>Welcome back!</h1>
        <p>Enter your username and password to log in to your admin panel</p>
        
        <form id="loginForm" action="${pageContext.request.contextPath}/loginProcess" method="post">
	        <label for="username">Username</label>
<input type="text" id="username" name="username" placeholder="Enter your username">
	        
	        <label for="password">Password</label>
	        <input type="password" id="password" name="password" placeholder="Your password">
	        
	        <div class="remember-me">
	          <input type="checkbox" id="remember">
	          <label for="remember">Remember me</label>
	        </div>
	        
	        <button type="submit" class="auth-button" id="login-button">Log In</button>
        </form>
        
        <div class="auth-options">
          <div>Don't have account yet? <a href="#" id="showSignup">Sign up</a></div>
          <div><a href="#">Forgot your password?</a></div>
        </div>
      </div>
      
      <!-- 회원가입 폼 -->
      <div class="signup-section">
        <h1>Create an account</h1>
        <p>Sign up to start using WheelWidget on your website</p>
        
        <form id="signupForm" action="${pageContext.request.contextPath}/registerProcess" method="post">
	        <label for="fullname">Name</label>
	        <input type="text" id="fullname" name="nickname" placeholder="Enter your full name">
	        
	        <label for="signup-username">Nickname</label> 
        	<input type="text" name="username" id="signup-username" placeholder="Enter your username" required>
	        
	        <label for="signup-email">Email</label>
	        <input type="email" id="signup-email" name="email" placeholder="example@example.com">
	        
	        <label for="signup-password">Password</label>
	        <input type="password" id="signup-password" name="password" placeholder="Create a strong password">
	        
	        <label for="confirm-password">Confirm Password</label>
	        <input type="password" id="confirm-password" placeholder="Confirm your password">
	        
	        <button type="submit" class="auth-button" id="signup-button">Sign Up</button>
        </form>
        
        <div class="auth-options">
          <div>Already have an account? <a href="#" id="showLogin">Log in</a></div>
        </div>
      </div>
    </div>
    
    <div class="widget-section">
      <div class="widget-content">
        <!-- 로그인 위젯 -->
        <div class="login-widget">
          <div class="widget-logo">
            <img src="${pageContext.request.contextPath}/assets/img/logo.png" alt="Wheel Widget">
            
          </div>
          
          <div class="widget-title">아름다움과 영감을 탐험하세요</div>
          <div class="widget-subtitle">다채로운 작품 속에서 당신만의 이야기를 발견하고, 예술이 주는 감동을 일상 속에 담아보세요.</div>
          
          <div class="widget-image-container">
            <!-- 로그인 이미지 필요시 삽입 -->
            <img src="${pageContext.request.contextPath}/assets/img/login2.png" alt="Wheel Widget Preview">
          </div>
         </div> 
        <!-- 회원가입 위젯 -->
        <div class="signup-widget">
          <div class="widget-logo">
            <img src="${pageContext.request.contextPath}/assets/img/logo.png" alt="Wheel Widget">
          </div>
          
          <div class="widget-title">Visual Explore에 지금 합류하세요!</div>
          <div class="widget-subtitle">당신의 창조적 순간을 이곳에서 시작하세요.</div>
          
          <div class="widget-image-container">
            <!-- 회원가입 이미지 필요시 삽입 -->
            <img src="${pageContext.request.contextPath}/assets/img/login2.png" alt="Wheel Widget Benefits">
          </div>
        </div>
      </div>
    </div>
  </div>
<script>
// 순수 JavaScript로 오류 메시지 처리
window.onload = function() {
  var errorMsg = "${errorMessage}";
  var successMsg = "${successMessage}";
  
  if (errorMsg && errorMsg !== "") {
    alert(errorMsg);
  }
  
  if (successMsg && successMsg !== "") {
    alert(successMsg);
  }
};
</script>
</body>
</html>
