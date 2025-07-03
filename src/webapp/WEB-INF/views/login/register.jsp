<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원가입 - 미술 웹페이지</title>
    <link rel="stylesheet" href="<c:url value='/css/main.css' />">
    <style>
        .register-container {
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .register-container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        
        .check-btn {
            background-color: #2196F3;
            color: white;
            border: none;
            padding: 5px 10px;
            margin-left: 5px;
            border-radius: 3px;
            cursor: pointer;
        }
        
        .check-btn:hover {
            background-color: #0b7dda;
        }
        
        .register-btn {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }
        
        .register-btn:hover {
            background-color: #45a049;
        }
        
        .login-link {
            text-align: center;
            margin-top: 15px;
        }
        
        .error-message {
            color: red;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .field-error {
            color: red;
            font-size: 12px;
            margin-top: 5px;
        }
        
        .check-result {
            font-size: 12px;
            margin-top: 5px;
        }
        
        .available {
            color: green;
        }
        
        .not-available {
            color: red;
        }
    </style>
</head>
<body>
    <%-- 헤더 포함 
    <jsp:include page="../menu.jsp" /> --%>

    <div class="register-container">
        <h2>회원가입</h2>
        
        <c:if test="${not empty errorMessage}">
            <div class="error-message">${errorMessage}</div>
        </c:if>
        
        <form action="<c:url value='/registerProcess' />" method="post" id="registerForm">
            <div class="form-group">
                <label for="username">아이디 *</label>
                <div style="display: flex;">
                    <input type="text" id="username" name="username" required value="${userVO.username}">
                    <button type="button" id="checkUsername" class="check-btn">중복확인</button>
                </div>
                <div id="usernameResult" class="check-result"></div>
            </div>
            
            <div class="form-group">
                <label for="password">비밀번호 *</label>
                <input type="password" id="password" name="password" required>
                <div id="passwordError" class="field-error"></div>
            </div>
            
            <div class="form-group">
                <label for="confirmPassword">비밀번호 확인 *</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
                <div id="confirmPasswordError" class="field-error"></div>
            </div>
            
            <div class="form-group">
                <label for="email">이메일 *</label>
                <div style="display: flex;">
                    <input type="email" id="email" name="email" required value="${userVO.email}">
                    <button type="button" id="checkEmail" class="check-btn">중복확인</button>
                </div>
                <div id="emailResult" class="check-result"></div>
            </div>
            
            <div class="form-group">
                <label for="nickname">닉네임 *</label>
                <input type="text" id="nickname" name="nickname" required value="${userVO.nickname}">
            </div>
            
            <button type="submit" class="register-btn" id="submitBtn">회원가입</button>
        </form>
        
        <div class="login-link">
            이미 계정이 있으신가요? <a href="<c:url value='/user/login' />">로그인</a>
        </div>
    </div>
    
    <%-- 푸터 포함
    <jsp:include page="../footer.jsp" />  --%>
    
    <script>
        // 아이디 중복 체크
        document.getElementById('checkUsername').addEventListener('click', function() {
            const username = document.getElementById('username').value;
            if (username.trim() === '') {
                document.getElementById('usernameResult').innerHTML = '아이디를 입력해주세요';
                document.getElementById('usernameResult').className = 'check-result not-available';
                return;
            }
            
            // AJAX 요청
            fetch('<c:url value="/checkUsername" />', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'username=' + encodeURIComponent(username)
            })
            .then(response => response.json())
            .then(exists => {
                if (exists) {
                    document.getElementById('usernameResult').innerHTML = '이미 사용 중인 아이디입니다';
                    document.getElementById('usernameResult').className = 'check-result not-available';
                } else {
                    document.getElementById('usernameResult').innerHTML = '사용 가능한 아이디입니다';
                    document.getElementById('usernameResult').className = 'check-result available';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
        
        // 이메일 중복 체크
        document.getElementById('checkEmail').addEventListener('click', function() {
            const email = document.getElementById('email').value;
            if (email.trim() === '') {
                document.getElementById('emailResult').innerHTML = '이메일을 입력해주세요';
                document.getElementById('emailResult').className = 'check-result not-available';
                return;
            }
            
            // AJAX 요청
            fetch('<c:url value="/checkEmail" />', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'email=' + encodeURIComponent(email)
            })
            .then(response => response.json())
            .then(exists => {
                if (exists) {
                    document.getElementById('emailResult').innerHTML = '이미 사용 중인 이메일입니다';
                    document.getElementById('emailResult').className = 'check-result not-available';
                } else {
                    document.getElementById('emailResult').innerHTML = '사용 가능한 이메일입니다';
                    document.getElementById('emailResult').className = 'check-result available';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
        
        // 비밀번호 확인
        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').innerHTML = '비밀번호가 일치하지 않습니다';
            } else {
                document.getElementById('confirmPasswordError').innerHTML = '';
            }
        });
        
        // 폼 제출 전 유효성 검사
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            let isValid = true;
            
            // 비밀번호 일치 확인
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').innerHTML = '비밀번호가 일치하지 않습니다';
                isValid = false;
            }
            
            // 비밀번호 길이 확인
            if (password.length < 6) {
                document.getElementById('passwordError').innerHTML = '비밀번호는 6자 이상이어야 합니다';
                isValid = false;
            }
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    </script>
</body>
</html>