<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지 - WheelWidget</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/mypage.css">
    <!-- Font Awesome 아이콘 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <!-- 수정된 스타일 추가 -->
    <style>
        .profile-section, .info-section, .title-section {
            background-color: #e9e3cc; /* 더 옅은 색상으로 변경 */
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 왼쪽 사이드바 -->
        <div class="sidebar">
            <div class="logo">
                <a href="/" id="logo-link">
                    <img src="/assets/img/logo.png" alt="WheelWidget 로고">
                </a>
            </div>
            <ul class="menu">
                <li class="active"><a href="/mypage"><i class="fas fa-user"></i> 마이페이지</a></li>
                <li><a href="/dashboard"><i class="fas fa-tachometer-alt"></i> 대시보드</a></li>
                <li><a href="#" class="menu-alert"><i class="fas fa-heart"></i> 좋아요</a></li>
                <li><a href="#" class="menu-alert"><i class="fas fa-cog"></i> 설정</a></li>
                <li><a href="#" class="menu-alert"><i class="fas fa-question-circle"></i> 도움말</a></li>
                <li class="logout"><a href="/logout"><i class="fas fa-sign-out-alt"></i> 로그아웃</a></li>
            </ul>
        </div>

        <!-- 메인 콘텐츠 영역 -->
        <div class="main-content">
            <div class="header">
                <h1>마이페이지</h1>
                <div class="user-info">
                    <span><i class="fas fa-bell"></i></span>
                    <span class="user-name">${user.username}</span>
                    <div class="user-avatar">
                    	<c:choose>
						    <c:when test="${not empty user.profileImage}">
						        <img id="profile-image-preview" src="${user.profileImage}" alt="프로필 이미지">
						    </c:when>
						    <c:otherwise>
						        <img id="profile-image-preview" src="${pageContext.request.contextPath}/assets/img/profile.png" alt="기본 프로필 이미지">
						    </c:otherwise>
						</c:choose>
                    </div>
                </div>
            </div>

            <!-- 사용자 프로필 섹션 -->
            <div class="profile-section">
                <div class="profile-header">
                    <div class="profile-avatar">
                    	<c:choose>
						    <c:when test="${not empty user.profileImage}">
						        <img id="profile-image-preview" src="${user.profileImage}" alt="프로필 이미지">
						    </c:when>
						    <c:otherwise>
						        <img id="profile-image-preview" src="${pageContext.request.contextPath}/assets/img/profile.png" alt="기본 프로필 이미지">
						    </c:otherwise>
						</c:choose>
                        <button class="change-avatar-btn"><i class="fas fa-camera"></i></button>
                        <input type="file" id="profile-image-input" accept="image/*" style="display: none;">
                    </div>
                    <div class="profile-details">
                        <h2>${user.nickname} <span class="user-id">@${user.username}</span></h2>
                        <p class="email">${user.email}</p>
                        <p class="join-date">가입일: ${user.regDate}</p>
                    </div>
                </div>
            </div>

            <!-- 정보 수정 섹션 -->
            <div class="info-section">
                <h3>내 정보</h3>
                <form id="userInfoForm" action="/mypage/update" method="post">
                    <div class="form-group">
                        <label for="name">이름</label>
                        <input type="text" id="name" name="name" value="${user.nickname}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="username">아이디</label>
                        <input type="text" id="username" name="username" value="${user.username}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="email">이메일</label>
                        <input type="email" id="email" name="email" value="${user.email}" readonly>
                    </div>
                    <div class="form-buttons">
                        <button type="button" id="changePasswordBtn" class="secondary-btn">비밀번호 변경</button>
                        <button type="button" id="editInfoBtn" class="primary-btn">정보 수정</button>
                    </div>
                </form>
            </div>

            <!-- 나의 칭호 섹션 -->
            <div class="title-section">
                <h3>나의 칭호</h3>
                <div class="titles-container">
                    <c:forEach items="${userTitles}" var="title">
                        <div class="title-badge ${title.active ? 'active' : ''}">
                            <span class="title-name">${title.titleName}</span>
                            <c:if test="${title.active}">
                                <span class="active-badge">사용중</span>
                            </c:if>
                            <button class="title-select-btn" data-title-id="${title.titleId}">
                                <c:choose>
                                    <c:when test="${title.active}">해제</c:when>
                                    <c:otherwise>적용</c:otherwise>
                                </c:choose>
                            </button>
                        </div>
                    </c:forEach>
                    
                    <c:if test="${empty userTitles}">
                        <p class="no-titles">초보애호가</p>
                    </c:if>
                </div>
            </div>
        </div>
    </div>

    <!-- 비밀번호 변경 모달 -->
    <div id="passwordModal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>비밀번호 변경</h2>
            <form id="passwordChangeForm" action="/mypage/changePassword" method="post">
                <div class="form-group">
                    <label for="currentPassword">현재 비밀번호</label>
                    <input type="password" id="currentPassword" name="currentPassword" required>
                </div>
                <div class="form-group">
                    <label for="newPassword">새 비밀번호</label>
                    <input type="password" id="newPassword" name="newPassword" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">비밀번호 확인</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>
                <div class="form-buttons">
                    <button type="button" class="secondary-btn cancel-btn">취소</button>
                    <button type="submit" class="primary-btn">변경하기</button>
                </div>
            </form>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/assets/js/mypage.js"></script>
</body>
</html>