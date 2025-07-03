package com.art.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.art.vo.UserTitleVO;
import com.art.vo.UserVO;

@Repository
public interface IUserDAO {
    // 사용자 등록 (회원가입)
    void registerUser(UserVO userVO);
    
    // 사용자 로그인 (아이디, 비밀번호 확인)
    UserVO loginUser(UserVO userVO);
    
    // 아이디로 사용자 정보 조회
    UserVO getUserById(int userId);
    
    // 사용자명으로 사용자 정보 조회 (아이디 중복 체크용)
    UserVO getUserByUsername(String username);
    
    // 이메일로 사용자 정보 조회 (이메일 중복 체크용)
    UserVO getUserByEmail(String email);
    
    // 사용자 정보 업데이트
    void updateUser(UserVO userVO);
    
    // 퀴즈 점수 업데이트
    void updateQuizScore(UserVO userVO);
    
    // 사용자 칭호 업데이트
    void updateUserTitle(UserVO userVO);
    
    // 프로필 이미지 업데이트
    void updateProfileImage(UserVO userVO);
    
    // titleId로 titleName 찾기
    String findTitleNameById(int titleId) throws Exception;

    boolean isTitleActive(@Param("userId") int userId, @Param("titleId") int titleId);
	
    void activateTitle(@Param("userId") int userId, @Param("titleId") int titleId);

    void deactivateTitle(@Param("userId") int userId, @Param("titleId") int titleId);

    String getActiveTitleName(@Param("userId") int userId);

    List<UserTitleVO> getUserTitles(@Param("userId") int userId);
    
    void deactivateAllTitles(@Param("userId") int userId);
}