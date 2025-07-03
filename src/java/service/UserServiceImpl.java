package com.art.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.art.dao.IUserDAO;
import com.art.vo.UserTitleVO;
import com.art.vo.UserVO;

@Service
public class UserServiceImpl implements IUserService {
    
    @Autowired
    private IUserDAO userDAO;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @Override
    public boolean isTitleActive(int userId, int titleId) throws Exception {
        return userDAO.isTitleActive(userId, titleId);
    }

    @Override
    public void activateTitle(int userId, int titleId) throws Exception {
        userDAO.activateTitle(userId, titleId);
    }

    @Override
    public void deactivateTitle(int userId, int titleId) throws Exception {
        userDAO.deactivateTitle(userId, titleId);
    }

    @Override
    public String getActiveTitleName(int userId) throws Exception {
        return userDAO.getActiveTitleName(userId);
    }
    
    @Override
    public List<UserTitleVO> getUserTitles(int userId) {
        return userDAO.getUserTitles(userId);
    }
    
    // 회원가입
    @Override
    public void registerUser(UserVO userVO) throws Exception {
        // 아이디 중복 체크
        if (userDAO.getUserByUsername(userVO.getUsername()) != null) {
            throw new Exception("이미 존재하는 아이디입니다.");
        }
        
        // 이메일 중복 체크
        if (userDAO.getUserByEmail(userVO.getEmail()) != null) {
            throw new Exception("이미 사용 중인 이메일입니다.");
        }
        
        // 비밀번호 암호화
        userVO.setPassword(passwordEncoder.encode(userVO.getPassword()));
        
        // 사용자 등록
        userDAO.registerUser(userVO);
    }
    
    // 로그인
    @Override
    public UserVO loginUser(UserVO userVO) throws Exception {
        UserVO user = userDAO.getUserByUsername(userVO.getUsername());
        
        if (user == null) {
            throw new Exception("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        
        if (!passwordEncoder.matches(userVO.getPassword(), user.getPassword())) {
            throw new Exception("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        
        return user;
    }
    
    // 아이디 중복 체크
    @Override
    public boolean checkUsernameExists(String username) {
        return userDAO.getUserByUsername(username) != null;
    }
    
    // 이메일 중복 체크
    @Override
    public boolean checkEmailExists(String email) {
        return userDAO.getUserByEmail(email) != null;
    }
    
    // 사용자 정보 조회
    @Override
    public UserVO getUserById(int userId) {
        return userDAO.getUserById(userId);
    }
    
    // 퀴즈 점수 업데이트
    @Override
    public void updateQuizScore(UserVO userVO) {
        userDAO.updateQuizScore(userVO);
    }
    
    // 사용자 칭호 업데이트 (UserVO 객체 사용)
    @Override
    public void updateUserTitle(UserVO userVO) {
        userDAO.updateUserTitle(userVO);
    }
    
    // 프로필 이미지 업데이트
    @Override
    public void updateProfileImage(UserVO userVO) {
        userDAO.updateProfileImage(userVO);
    }
    
    // 칭호 관련 (userId와 titleId 사용)
    // 중복 메서드 제거: 이름은 같지만 매개변수가 다른 메서드 하나만 남기기
    @Override
    public void updateUserTitle(int userId, int titleId) throws Exception {
        // 1. 모든 칭호 비활성화
        userDAO.deactivateAllTitles(userId);

        // 2. 선택한 칭호 활성화
        userDAO.activateTitle(userId, titleId);

        // 3. titleName 찾아서 user.title 업데이트
        String titleName = userDAO.findTitleNameById(titleId);
        
        if (titleName == null) {
            throw new Exception("존재하지 않는 칭호입니다.");
        }

        UserVO user = new UserVO();
        user.setUserId(userId);
        user.setTitle(titleName);

        userDAO.updateUserTitle(user);
    }
    
    @Override
    public String getTitleNameById(int titleId) throws Exception {
        return userDAO.findTitleNameById(titleId);
    }
    
    // 칭호 이름으로 바로 업데이트 (반고흐 이벤트용)
    @Override
    public void updateUserTitleName(int userId, String titleName) throws Exception {
        UserVO user = new UserVO();
        user.setUserId(userId);
        user.setTitle(titleName);

        userDAO.updateUserTitle(user);
    }
    
    @Override
    public void deactivateAllTitles(int userId) throws Exception {
        userDAO.deactivateAllTitles(userId);
    }
}