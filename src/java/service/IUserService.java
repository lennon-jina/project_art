package com.art.service;

import java.util.List;

import com.art.vo.UserTitleVO;
import com.art.vo.UserVO;

public interface IUserService {
    // 회원가입
    void registerUser(UserVO userVO) throws Exception;
    
    // 로그인
    UserVO loginUser(UserVO userVO) throws Exception;
    
    // 아이디 중복 체크
    boolean checkUsernameExists(String username);
    
    // 이메일 중복 체크
    boolean checkEmailExists(String email);
    
    // 사용자 정보 조회
    UserVO getUserById(int userId);
    
    // 퀴즈 점수 업데이트
    void updateQuizScore(UserVO userVO);
    
    // 사용자 칭호 업데이트
    void updateUserTitle(UserVO userVO);
    
    // 프로필 이미지 업데이트
    void updateProfileImage(UserVO userVO);
    
    // 칭호 관련
    void updateUserTitle(int userId, int titleId) throws Exception;
    String getTitleNameById(int titleId) throws Exception;
    
    // 칭호 이름으로 바로 업데이트 (반고흐 이벤트용)
    void updateUserTitleName(int userId, String titleName) throws Exception;

	boolean isTitleActive(int userId, int titleId) throws Exception;
	
	void activateTitle(int userId, int titleId) throws Exception;
	
	void deactivateTitle(int userId, int titleId) throws Exception;
	
	String getActiveTitleName(int userId) throws Exception;
	
	List<UserTitleVO> getUserTitles(int userId);
	
	void deactivateAllTitles(int userId) throws Exception;
}