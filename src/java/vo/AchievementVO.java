package com.art.vo;

import java.util.Date;

public class AchievementVO {
	private int id;
    private int userId;
    private String achievementType;
    private int achievementLevel;
    private Date achievedDate;
    private String titleName;
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getAchievementType() {
		return achievementType;
	}
	public void setAchievementType(String achievementType) {
		this.achievementType = achievementType;
	}
	public int getAchievementLevel() {
		return achievementLevel;
	}
	public void setAchievementLevel(int achievementLevel) {
		this.achievementLevel = achievementLevel;
	}
	public Date getAchievedDate() {
		return achievedDate;
	}
	public void setAchievedDate(Date achievedDate) {
		this.achievedDate = achievedDate;
	}
	public String getTitleName() {
		return titleName;
	}
	public void setTitleName(String titleName) {
		this.titleName = titleName;
	}
	
}
