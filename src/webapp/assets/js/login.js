document.addEventListener('DOMContentLoaded', function() {
  // 필요한 요소 선택
  const showSignupBtn = document.getElementById('showSignup');
  const showLoginBtn = document.getElementById('showLogin');
  const signupSubmitBtn = document.getElementById('signup-button');
  const loginSection = document.querySelector('.login-section');
  const signupSection = document.querySelector('.signup-section');
  const loginWidget = document.querySelector('.login-widget');
  const signupWidget = document.querySelector('.signup-widget');
  const formSection = document.querySelector('.form-section');
  const widgetSection = document.querySelector('.widget-section');
  const mainContainer = document.querySelector('.main-container');
  
  // 섹션 위치 상태 추적
  let isSwapped = false;
  
  // 애니메이션 중인지 상태 추적 (중복 클릭 방지)
  let isAnimating = false;
  
  // 초기 설정 - 회원가입 폼은 숨기고 로그인 폼은 표시
  loginSection.style.display = 'flex';
  signupSection.style.display = 'none';
  loginWidget.style.display = 'block';
  signupWidget.style.display = 'none';
  
  // 페이지 로드 시 초기 애니메이션 (선택적)
  gsap.from([formSection, widgetSection], {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: "power3.out"
  });
  
  // 회원가입 폼으로 전환 (위치 교체)
  showSignupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // 애니메이션 중이면 무시
    if (isAnimating) return;
    
    if (!isSwapped) {
      isAnimating = true;
      
      // GSAP 애니메이션 타임라인 생성
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
        }
      });
      
      // 입력폼과 위젯에 약간의 스케일 및 회전 효과를 추가하여 더 역동적으로
      tl.to([formSection, widgetSection], {
        duration: 0.2,
        scale: 0.97,
        ease: "power1.in"
      }, 0);
      
      // 양쪽 섹션을 화면 바깥으로 이동 (formSection은 왼쪽으로, widgetSection은 오른쪽으로)
      // + 동시에 약간 회전하고 투명도 감소
      tl.to(formSection, {
        duration: 0.6,
        x: '-110%',
        rotation: -5,
        opacity: 0.5,
        ease: "power2.inOut"
      }, 0.1);
      
      tl.to(widgetSection, {
        duration: 0.6,
        x: '110%',
        rotation: 5,
        opacity: 0.5,
        ease: "power2.inOut"
      }, 0.1);
      
      // 컨텐츠 교체 및 DOM에서 순서 변경
      tl.add(() => {
        // 컨텐츠 교체
        loginSection.style.display = 'none';
        signupSection.style.display = 'flex';
        loginWidget.style.display = 'none';
        signupWidget.style.display = 'block';
        
        // DOM에서 순서 변경 (formSection과 widgetSection의 위치 교체)
        mainContainer.insertBefore(widgetSection, formSection);
        
        // 위치 속성 초기화 (왼쪽/오른쪽으로 숨겨진 상태)
        gsap.set(formSection, { x: '110%', rotation: 5 });
        gsap.set(widgetSection, { x: '-110%', rotation: -5 });
      });
      
      // 양쪽 섹션을 다시 화면 중앙으로 가져오기
      // + 동시에 회전 복구 및 투명도 원복
      tl.to(formSection, {
        duration: 0.6,
        x: '0%',
        rotation: 0,
        opacity: 1,
        ease: "power2.out"
      }, ">");
      
      tl.to(widgetSection, {
        duration: 0.6,
        x: '0%',
        rotation: 0,
        opacity: 1,
        ease: "power2.out"
      }, "<");
      
      // 모든 요소를 원래 스케일로 복원하고 약간의 튀는 효과 추가
      tl.to([formSection, widgetSection], {
        duration: 0.4,
        scale: 1,
        ease: "back.out(1.5)"
      }, ">");
      
      // 위치 교체 상태로 변경
      isSwapped = true;
    }
  });
  
  // 로그인 폼으로 전환 (원래 위치로 복귀)
  showLoginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // 애니메이션 중이면 무시
    if (isAnimating) return;
    
    if (isSwapped) {
      isAnimating = true;
      
      // GSAP 애니메이션 타임라인 생성
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
        }
      });
      
      // 입력폼과 위젯에 약간의 스케일 및 회전 효과를 추가하여 더 역동적으로
      tl.to([formSection, widgetSection], {
        duration: 0.2,
        scale: 0.97,
        ease: "power1.in"
      }, 0);
      
      // 양쪽 섹션을 화면 바깥으로 이동 (현재 formSection은 오른쪽으로, widgetSection은 왼쪽으로)
      // + 동시에 약간 회전하고 투명도 감소
      tl.to(formSection, {
        duration: 0.6,
        x: '110%',
        rotation: 5,
        opacity: 0.5,
        ease: "power2.inOut"
      }, 0.1);
      
      tl.to(widgetSection, {
        duration: 0.6,
        x: '-110%',
        rotation: -5,
        opacity: 0.5,
        ease: "power2.inOut"
      }, 0.1);
      
      // 컨텐츠 교체 및 DOM에서 순서 변경
      tl.add(() => {
        // 컨텐츠 교체
        signupSection.style.display = 'none';
        loginSection.style.display = 'flex';
        signupWidget.style.display = 'none';
        loginWidget.style.display = 'block';
        
        // DOM에서 순서 변경 (formSection과 widgetSection의 위치 교체, 원래대로)
        mainContainer.insertBefore(formSection, widgetSection);
        
        // 위치 속성 초기화 (왼쪽/오른쪽으로 숨겨진 상태)
        gsap.set(formSection, { x: '-110%', rotation: -5 });
        gsap.set(widgetSection, { x: '110%', rotation: 5 });
      });
      
      // 양쪽 섹션을 다시 화면 중앙으로 가져오기
      // + 동시에 회전 복구 및 투명도 원복
      tl.to(formSection, {
        duration: 0.6,
        x: '0%',
        rotation: 0,
        opacity: 1,
        ease: "power2.out"
      }, ">");
      
      tl.to(widgetSection, {
        duration: 0.6,
        x: '0%',
        rotation: 0,
        opacity: 1,
        ease: "power2.out"
      }, "<");
      
      // 모든 요소를 원래 스케일로 복원하고 약간의 튀는 효과 추가
      tl.to([formSection, widgetSection], {
        duration: 0.4,
        scale: 1,
        ease: "back.out(1.5)"
      }, ">");
      
      // 위치 교체 상태 원래대로
      isSwapped = false;
    }
  });
  
  // 무한 스크롤 배너 애니메이션 개선 (선택적)
  const bannerContents = document.querySelectorAll('.banner-content');
  
  // GSAP로 CSS 애니메이션 대체 (더 부드러운 성능)
  bannerContents.forEach(content => {
    // CSS 애니메이션 제거
    content.style.animation = 'none';
    
    // GSAP 무한 애니메이션 적용
    gsap.to(content, {
      x: '-100%',
      duration: 50,
      ease: "none", // 선형 이동
      repeat: -1,   // 무한 반복
      immediateRender: true
    });
  });
  
  // 회원가입 제출 버튼 이벤트
  signupSubmitBtn.addEventListener('click', function(e) {
	e.preventDefault();
    // 입력값 가져오기
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // 간단한 유효성 검사
    if (!fullname || !email || !password || !confirmPassword) {
      // 경고 메시지를 더 매력적으로 표시 (선택적)
      gsap.to(signupSection, {
        x: [-10, 10, -8, 8, -5, 5, 0],
        duration: 0.5,
        ease: "power1.inOut"
      });
      
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    if (password !== confirmPassword) {
      // 경고 메시지를 더 매력적으로 표시 (선택적)
      gsap.to(signupSection, {
        x: [-10, 10, -8, 8, -5, 5, 0],
        duration: 0.5,
        ease: "power1.inOut"
      });
      
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    // 회원가입 성공 알림
    alert('회원가입이 완료되었습니다! 로그인 화면으로 이동합니다.');
    
    // 애니메이션 중이면 무시
    if (isAnimating) return;
    
    // 로그인 폼으로 자동 전환 (showLoginBtn 클릭 이벤트와 동일한 로직)
    if (isSwapped) {
      isAnimating = true;
      
      // GSAP 애니메이션 타임라인 생성
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
        }
      });
      
      // 입력폼과 위젯에 약간의 스케일 및 회전 효과를 추가하여 더 역동적으로
      tl.to([formSection, widgetSection], {
        duration: 0.2,
        scale: 0.97,
        ease: "power1.in"
      }, 0);
      
      // 양쪽 섹션을 화면 바깥으로 이동 (현재 formSection은 오른쪽으로, widgetSection은 왼쪽으로)
      // + 동시에 약간 회전하고 투명도 감소
      tl.to(formSection, {
        duration: 0.6,
        x: '110%',
        rotation: 5,
        opacity: 0.5,
        ease: "power2.inOut"
      }, 0.1);
      
      tl.to(widgetSection, {
        duration: 0.6,
        x: '-110%',
        rotation: -5,
        opacity: 0.5,
        ease: "power2.inOut"
      }, 0.1);
      
      // 컨텐츠 교체 및 DOM에서 순서 변경
      tl.add(() => {
        // 컨텐츠 교체
        signupSection.style.display = 'none';
        loginSection.style.display = 'flex';
        signupWidget.style.display = 'none';
        loginWidget.style.display = 'block';
        
        // 이메일 필드에 회원가입 이메일 자동 입력
        document.getElementById('email').value = email;
        
        // DOM에서 순서 변경 (formSection과 widgetSection의 위치 교체, 원래대로)
        mainContainer.insertBefore(formSection, widgetSection);
        
        // 위치 속성 초기화 (왼쪽/오른쪽으로 숨겨진 상태)
        gsap.set(formSection, { x: '-110%', rotation: -5 });
        gsap.set(widgetSection, { x: '110%', rotation: 5 });
      });
      
      // 양쪽 섹션을 다시 화면 중앙으로 가져오기
      // + 동시에 회전 복구 및 투명도 원복
      tl.to(formSection, {
        duration: 0.6,
        x: '0%',
        rotation: 0,
        opacity: 1,
        ease: "power2.out"
      }, ">");
      
      tl.to(widgetSection, {
        duration: 0.6,
        x: '0%',
        rotation: 0,
        opacity: 1,
        ease: "power2.out"
      }, "<");
      
      // 모든 요소를 원래 스케일로 복원하고 약간의 튀는 효과 추가
      tl.to([formSection, widgetSection], {
        duration: 0.4,
        scale: 1,
        ease: "back.out(1.5)"
      }, ">");
      
      // 위치 교체 상태 원래대로
      isSwapped = false;
    }
    
    document.getElementById('signupForm').submit(); // 폼 submit
  });
  
  // 입력 필드에 포커스 효과 추가 (선택적)
  const inputFields = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
  
  inputFields.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        scale: 1.02,
        duration: 0.3,
        ease: "power1.out",
        backgroundColor: 'rgba(255, 255, 255, 0.07)'
      });
    });
    
    input.addEventListener('blur', () => {
      gsap.to(input, {
        scale: 1,
        duration: 0.3,
        ease: "power1.in",
        backgroundColor: 'rgba(255, 255, 255, 0.05)'
      });
    });
  });
  
  // 버튼에 호버 효과 추가 (선택적)
  const buttons = document.querySelectorAll('.auth-button');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.03,
        duration: 0.3,
        ease: "power1.out",
        backgroundColor: '#741102'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power1.in",
        backgroundColor: '#741102'
      });
    });
    
    button.addEventListener('mousedown', () => {
      gsap.to(button, {
        scale: 0.98,
        duration: 0.1,
        ease: "power1.in"
      });
    });
    
    button.addEventListener('mouseup', () => {
      gsap.to(button, {
        scale: 1.03,
        duration: 0.1,
        ease: "power1.out"
      });
    });
  });
});