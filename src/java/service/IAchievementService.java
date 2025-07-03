package com.art.service;

import java.util.List;

import com.art.vo.AchievementVO;

public interface IAchievementService {
    void saveAchievement(AchievementVO achievement);
    List<AchievementVO> getAchievementsByUserId(int userId);
}