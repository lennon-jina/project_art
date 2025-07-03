package com.art.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.art.service.IAchievementService;
import com.art.vo.AchievementVO;

@RestController
@RequestMapping("/achievement")
public class AchievementController {

    @Autowired
    private IAchievementService achievementService;

    @PostMapping("/award")
    public String awardAchievement(@RequestParam int userId, @RequestParam String artistName) {
        AchievementVO achievement = new AchievementVO();
        achievement.setUserId(userId);
        achievement.setAchievementType(artistName + " Master");
        achievement.setAchievementLevel(1);
        achievement.setAchievedDate(new Date());
        achievementService.saveAchievement(achievement);
        return "success";
    }
}