package com.art.vo;

import java.sql.Date;

public class UserVO {
    private int userId;
    private String username;
    private String password;
    private String email;
    private String nickname;
    private Date regDate;
    private String profileImage;
    private int quizScore;
    private String title; // 업적 칭호
    
    // 생성자
    public UserVO() {}
    
    public UserVO(String username, String password, String email, String nickname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
    }
    
    // Getter 및 Setter 메서드
    public int getUserId() {
        return userId;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getNickname() {
        return nickname;
    }
    
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    
    public Date getRegDate() {
        return regDate;
    }
    
    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }
    
    public String getProfileImage() {
        return profileImage;
    }
    
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
    
    public int getQuizScore() {
        return quizScore;
    }
    
    public void setQuizScore(int quizScore) {
        this.quizScore = quizScore;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    @Override
    public String toString() {
        return "UserVO [userId=" + userId + ", username=" + username + ", email=" + email + ", nickname=" + nickname
                + ", regDate=" + regDate + ", quizScore=" + quizScore + ", title=" + title + "]";
    }
}