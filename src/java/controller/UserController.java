package com.art.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.art.service.IAchievementService;
import com.art.service.IUserService;
import com.art.vo.AchievementVO;
import com.art.vo.UserTitleVO;
import com.art.vo.UserVO;

@Controller
public class UserController {
    
    @Autowired
    private IUserService userService;
    
    @Autowired
    private IAchievementService achievementService;
    
    @GetMapping("/login")
    public String loginPage(Model model) {
        return "login/login"; 
    }
    
    @PostMapping("/loginProcess")
    public String loginProcess(UserVO userVO, HttpSession session, RedirectAttributes redirectAttributes) {
        try {
            UserVO loggedInUser = userService.loginUser(userVO);
            session.setAttribute("user", loggedInUser);
            return "redirect:/"; // 성공 시 홈페이지로 리다이렉트
        } catch (Exception e) {
            // addFlashAttribute는 리다이렉트 후에도 사용 가능한 일회성 데이터
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            return "redirect:/login"; // 실패 시 로그인 페이지로 리다이렉트
        }
    }

    @PostMapping("/registerProcess")
    public String registerProcess(UserVO userVO, RedirectAttributes redirectAttributes) {
        try {
            userService.registerUser(userVO);
            redirectAttributes.addFlashAttribute("successMessage", "회원가입이 완료되었습니다. 로그인해주세요.");
            return "redirect:/login";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            redirectAttributes.addFlashAttribute("userVO", userVO);
            return "redirect:/login";
        }
    }

    @PostMapping("/checkUsername")
    @ResponseBody
    public boolean checkUsername(String username) {
        return userService.checkUsernameExists(username);
    }
    
    @PostMapping("/checkEmail")
    @ResponseBody
    public boolean checkEmail(String email) {
        return userService.checkEmailExists(email);
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
    
    @GetMapping("/mypage")
    public String myPage(HttpSession session, Model model) {
        UserVO user = (UserVO) session.getAttribute("user");

        if (user == null) {
            return "redirect:/login";
        }
        
        if (user.getProfileImage() == null || user.getProfileImage().equals("") 
        	    || user.getProfileImage().equals("default1.jpg") || user.getProfileImage().equals("default.jpg")) {
        	    user.setProfileImage(null);
        	}

        model.addAttribute("user", user);

        // 사용자의 칭호 목록 가져오기
        List<UserTitleVO> userTitles = userService.getUserTitles(user.getUserId());
        
        // 초보 감상가 칭호가 있는지 확인
        boolean hasBeginnerTitle = false;
        int beginnerIndex = -1;
        
        for (int i = 0; i < userTitles.size(); i++) {
            if ("초보 감상가".equals(userTitles.get(i).getTitleName())) {
                hasBeginnerTitle = true;
                beginnerIndex = i;
                break;
            }
        }
        
        // 초보 감상가 칭호가 없으면 추가
        if (!hasBeginnerTitle) {
            // 새 업적으로 초보 감상가 추가
            AchievementVO achievement = new AchievementVO();
            achievement.setUserId(user.getUserId());
            achievement.setAchievementType("초보 감상가");
            achievement.setAchievementLevel(1); // 활성화 상태로 설정
            achievement.setAchievedDate(new Date());
            
            // 업적 저장
            achievementService.saveAchievement(achievement);
            
            // 칭호 목록 다시 가져오기
            userTitles = userService.getUserTitles(user.getUserId());
            
            // 추가된 초보 감상가 칭호 찾기
            for (int i = 0; i < userTitles.size(); i++) {
                if ("초보 감상가".equals(userTitles.get(i).getTitleName())) {
                    beginnerIndex = i;
                    break;
                }
            }
        }
        
        // 초보 감상가 칭호를 맨 앞으로 이동
        if (beginnerIndex > 0) {
            UserTitleVO beginnerTitle = userTitles.remove(beginnerIndex);
            userTitles.add(0, beginnerTitle);
        }
        
        model.addAttribute("userTitles", userTitles);

        return "login/mypage";
    }
    
    @PostMapping("/mypage/updateTitle")
    @ResponseBody
    public String updateTitle(@RequestParam("titleId") int titleId, HttpSession session) {
        try {
            UserVO user = (UserVO) session.getAttribute("user");
            if (user == null) {
                return "로그인이 필요합니다.";
            }

            // 이미 선택된 칭호라면 해제, 아니면 적용
            boolean isAlreadyActive = userService.isTitleActive(user.getUserId(), titleId);

            if (isAlreadyActive) {
                // 칭호 해제
                userService.deactivateTitle(user.getUserId(), titleId);
            } else {
                // 모든 칭호 비활성화 후 새 칭호만 활성화
                userService.deactivateAllTitles(user.getUserId());
                userService.activateTitle(user.getUserId(), titleId);
            }
            
            // 세션의 user 최신화
            String updatedTitle = userService.getActiveTitleName(user.getUserId());
            if (updatedTitle == null || updatedTitle.isEmpty()) {
                updatedTitle = "초보 감상가"; // 기본 칭호
            }
            user.setTitle(updatedTitle);
            session.setAttribute("user", user);
            
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }
    
}
