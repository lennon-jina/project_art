package com.art.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.art.vo.AchievementVO;

@Mapper
public interface IAchievementDAO {
    int insertAchievement(AchievementVO achievement);
    List<AchievementVO> selectAchievementsByUserId(@Param("userId") int userId);
}