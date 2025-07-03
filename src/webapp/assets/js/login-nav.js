// 로그인 상태 관리를 위한 변수
let isLoggedIn = false;

// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', function() {
    // 세션 스토리지에서 로그인 상태 확인
    checkLoginStatus();
});

// 로그인 상태 확인 함수
function checkLoginStatus() {
    // 세션 스토리지에서 로그인 상태 확인
    isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // 로그인 상태일 때 UI 업데이트
        document.getElementById('loginTab').style.display = 'none';
        document.getElementById('logoutTab').style.display = 'block';
        document.getElementById('mypageTab').style.display = 'block';
    } else {
        // 로그아웃 상태일 때 UI 업데이트
        document.getElementById('loginTab').style.display = 'block';
        document.getElementById('logoutTab').style.display = 'none';
        document.getElementById('mypageTab').style.display = 'none';
    }
}

// 로그인 폼 표시 함수
function showLoginForm() {
    document.getElementById('loginFormPopup').style.display = 'flex';
}

// 로그인 폼 닫기 함수
function closeLoginForm() {
    document.getElementById('loginFormPopup').style.display = 'none';
}

// 로그인 처리 함수
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 간단한 클라이언트 측 유효성 검사
    if (!username || !password) {
        alert('아이디와 비밀번호를 모두 입력해주세요.');
        return false;
    }
    
    // 실제 구현에서는 서버로 로그인 요청을 보내야 합니다.
    // 여기서는 시뮬레이션만 합니다.
    
    // 성공했다고 가정
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
    
    // UI 업데이트
    isLoggedIn = true;
    checkLoginStatus();
    
    // 폼 닫기
    closeLoginForm();
    
    // 폼 초기화
    document.getElementById('loginForm').reset();
    
    return false;
}

// 로그아웃 함수
function logout() {
    // 세션 스토리지에서 로그인 정보 제거
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    
    // UI 업데이트
    isLoggedIn = false;
    checkLoginStatus();
}

// ESC 키를 누르면 로그인 폼 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLoginForm();
    }
});

// 로그인 폼 외부 클릭 시 닫기
document.getElementById('loginFormPopup').addEventListener('click', function(event) {
    if (event.target === this) {
        closeLoginForm();
    }
});