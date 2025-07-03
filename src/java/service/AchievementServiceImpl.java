package com.art.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.dao.IAchievementDAO;
import com.art.vo.AchievementVO;

@Service
public class AchievementServiceImpl implements IAchievementService {

    @Autowired
    private IAchievementDAO achievementDAO;

    @Override
    public void saveAchievement(AchievementVO achievement) {
        achievementDAO.insertAchievement(achievement);
    }

    @Override
    public List<AchievementVO> getAchievementsByUserId(int userId) {
        return achievementDAO.selectAchievementsByUserId(userId);
    }
}
