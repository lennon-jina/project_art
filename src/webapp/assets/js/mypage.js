// DOM 요소 가져오기
document.addEventListener('DOMContentLoaded', function() {
    // 비밀번호 변경 모달 관련 요소
    const passwordModal = document.getElementById('passwordModal');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const passwordChangeForm = document.getElementById('passwordChangeForm');
    
    // 정보 수정 폼
    const userInfoForm = document.getElementById('userInfoForm');
    const editInfoBtn = document.getElementById('editInfoBtn');
    
    // 프로필 이미지 관련 요소
    const changeAvatarBtn = document.querySelector('.change-avatar-btn');
    const profileImageInput = document.getElementById('profile-image-input');
    const profileImagePreview = document.getElementById('profile-image-preview');
    
    // 칭호 관련 버튼들
    const titleSelectBtns = document.querySelectorAll('.title-select-btn');
    
    // 메뉴 관련 요소
    const menuAlertItems = document.querySelectorAll('.menu-alert');
    const dashboardMenu = document.querySelector('a[href="/dashboard"]');
    const logoLink = document.getElementById('logo-link');

    // 대시보드 메뉴 클릭 이벤트 추가
    if (dashboardMenu) {
        dashboardMenu.addEventListener('click', function(event) {
            event.preventDefault();
            showAlert('업데이트 중입니다!');
        });
    }
    
    // 로고 클릭 이벤트 추가 (화면전환 애니메이션 생략)
    if (logoLink) {
        logoLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = '/?noAnimation=true'; // 애니메이션 생략 파라미터 추가
        });
    }

    // 메뉴 알림 클릭 이벤트
    if (menuAlertItems) {
        menuAlertItems.forEach(function(item) {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                showAlert('업데이트 중입니다!');
            });
        });
    }

    // 비밀번호 변경 모달 열기
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            passwordModal.classList.add('show');
        });
    }

    // 모달 닫기 (X 버튼)
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            passwordModal.classList.remove('show');
        });
    }

    // 모달 닫기 (취소 버튼)
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            passwordModal.classList.remove('show');
        });
    }

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target == passwordModal) {
            passwordModal.classList.remove('show');
        }
    });

    // 비밀번호 변경 폼 제출
    if (passwordChangeForm) {
        passwordChangeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // 비밀번호 유효성 검사
            if (!currentPassword || !newPassword || !confirmPassword) {
                showAlert('모든 필드를 입력해주세요.');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showAlert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
                return;
            }
            
            // 비밀번호 규칙 검사 (최소 8자, 영문/숫자/특수문자 포함)
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                showAlert('비밀번호는 최소 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.');
                return;
            }
            
            // 비밀번호 변경 성공 시 모달 닫기
            passwordModal.classList.remove('show');
            showAlert('비밀번호가 성공적으로 변경되었습니다.');
            
            // 폼 제출
            this.submit();
        });
    }

    // 정보 수정 버튼 클릭 이벤트
    if (editInfoBtn) {
        editInfoBtn.addEventListener('click', function() {
            const nameInput = document.getElementById('name');
            const usernameInput = document.getElementById('username');
            const emailInput = document.getElementById('email');
            
            if (this.textContent === '정보 수정') {
                // 정보 수정 모드로 변경
                nameInput.readOnly = false;
                usernameInput.readOnly = false;
                emailInput.readOnly = false;
                
                nameInput.style.backgroundColor = '#408080';         // 원래 입력칸 색상으로 변경
                usernameInput.style.backgroundColor = '#408080';     // 원래 입력칸 색상으로 변경
                emailInput.style.backgroundColor = '#408080';        // 원래 입력칸 색상으로 변경
                
                this.textContent = '확인';
            } else {
                // 확인 모드: 폼 제출
                // 이메일 유효성 검사
                if (emailInput.value && !isValidEmail(emailInput.value)) {
                    showAlert('유효한 이메일 주소를 입력해주세요.');
                    return;
                }
                
                nameInput.readOnly = true;
                usernameInput.readOnly = true;
                emailInput.readOnly = true;
                
                nameInput.style.backgroundColor = '#e4e4da';
                usernameInput.style.backgroundColor = '#e4e4da';
                emailInput.style.backgroundColor = '#e4e4da';
                
                this.textContent = '정보 수정';
                
                // 실제로는 여기서 폼을 제출하거나 AJAX 요청을 보내야 함
                showAlert('정보가 성공적으로 수정되었습니다.');
                userInfoForm.submit();
            }
        });
    }

    // 프로필 이미지 변경 버튼
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function() {
            profileImageInput.click();
        });
    }
    
    // 프로필 이미지 선택 시 미리보기
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profileImagePreview.src = e.target.result;
                    
                    // 여기서 AJAX로 서버에 이미지를 업로드할 수 있음
                    // 실제 구현은 백엔드가 필요하므로 생략
                    showAlert('프로필 이미지가 변경되었습니다.');
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // 칭호 변경 버튼 이벤트 처리
    if (titleSelectBtns) {
        titleSelectBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const titleId = this.getAttribute('data-title-id');
                const titleBadge = this.closest('.title-badge');
                const isCurrentlyActive = titleBadge.classList.contains('active');

                // 이미 활성화된 칭호라면 비활성화만 처리, 아니라면 새 칭호 활성화
                fetch('/mypage/updateTitle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `titleId=${titleId}`
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 응답이 올바르지 않습니다.');
                    }
                    return response.text();
                })
                .then(result => {
                    if (result === 'success') {
                        if (isCurrentlyActive) {
                            // 현재 활성화된 칭호 비활성화
                            titleBadge.classList.remove('active');
                            const activeBadge = titleBadge.querySelector('.active-badge');
                            if (activeBadge) activeBadge.style.display = 'none';
                            this.textContent = '적용';
                            showAlert('칭호가 해제되었습니다.');
                        } else {
                            // 모든 칭호 UI 비활성화
                            updateTitleUI();
                            
                            // 새로 선택한 칭호 활성화
                            titleBadge.classList.add('active');
                            const activeBadge = titleBadge.querySelector('.active-badge');
                            if (activeBadge) {
                                activeBadge.style.display = 'inline';
                            } else {
                                // 'active-badge' 요소가 없으면 새로 생성
                                const newActiveBadge = document.createElement('span');
                                newActiveBadge.className = 'active-badge';
                                newActiveBadge.textContent = '사용중';
                                titleBadge.querySelector('.title-name').after(newActiveBadge);
                            }
                            this.textContent = '해제';
                            showAlert('칭호가 적용되었습니다.');
                        }
                    } else {
                        showAlert('칭호 변경에 실패했습니다.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showAlert('서버 오류가 발생했습니다. 다시 시도해주세요.');
                });
            });
        });
    }

    // 모든 칭호 UI 상태 초기화 함수
    function updateTitleUI() {
        document.querySelectorAll('.title-badge').forEach(function(badge) {
            badge.classList.remove('active');
            const activeBadge = badge.querySelector('.active-badge');
            if (activeBadge) {
                activeBadge.style.display = 'none';
            }
            const btn = badge.querySelector('.title-select-btn');
            if (btn) {
                btn.textContent = '적용';
            }
        });
    }

    // 알림 표시 함수
    function showAlert(message) {
        // 기존 알림이 있으면 제거
        const existingAlert = document.querySelector('.alert-message');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // 새 알림 생성
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert-message';
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        // 3초 후 알림 제거
        setTimeout(function() {
            alertDiv.remove();
        }, 3000);
    }

    // 이메일 유효성 검사 함수
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
});