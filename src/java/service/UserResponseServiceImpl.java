package com.art.service;

import com.art.dao.IUserResponseDAO;
import com.art.vo.AchievementVO;
import com.art.vo.UserResponseVO;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserResponseServiceImpl implements IUserResponseService {

    @Autowired
    private IUserResponseDAO userResponseDAO;

    @Override
    public void saveUserResponse(UserResponseVO response) {
        userResponseDAO.insertUserResponse(response);
    }
    
    @Autowired
    private IAchievementService achievementService;

    public void processAchievements(int userId, List<UserResponseVO> userResponses) {
        Map<String, List<Integer>> authorQuestions = Map.of(
            "Van Gogh", List.of(28560, 80607),
            "Picasso", List.of(5357, 28067),
            "Chagall", List.of(59426, 23700)
        );

        Map<Integer, String> quizToAuthor = Map.of(
            28560, "Van Gogh",
            80607, "Van Gogh",
            5357, "Picasso",
            28067, "Picasso",
            59426, "Chagall",
            23700, "Chagall"
        );

        Map<String, Integer> authorCorrectCount = new HashMap<>();

        for (UserResponseVO response : userResponses) {
            if ("Y".equals(response.getCorrectYn())) {
                String author = quizToAuthor.get(response.getQuizQuestId());
                if (author != null) {
                    authorCorrectCount.put(author, authorCorrectCount.getOrDefault(author, 0) + 1);
                }
            }
        }

        for (Map.Entry<String, Integer> entry : authorCorrectCount.entrySet()) {
            if (entry.getValue() == 2) { // 2개 다 맞춘 경우
                AchievementVO achievement = new AchievementVO();
                achievement.setUserId(userId);
                achievement.setAchievementType(entry.getKey() + " Master");
                achievement.setAchievementLevel(1);
                achievement.setAchievedDate(new Date());

                achievementService.saveAchievement(achievement);
            }
        }
    }
}