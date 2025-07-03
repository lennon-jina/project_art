package com.art.vo;

import java.sql.Timestamp;

public class ReviewVO {
    private int reviewId;
    private int userId;
    private int questionId;
    private int wrongChoiceId;
    private Timestamp reviewDate;
    
    // 관계 매핑을 위한 객체
    private UserVO user;
    private QuestionVO question;
    private ChoiceVO wrongChoice;
    
    // 기본 생성자
    public ReviewVO() {}
    
    // 필수 필드 생성자
    public ReviewVO(int userId, int questionId, int wrongChoiceId) {
        this.userId = userId;
        this.questionId = questionId;
        this.wrongChoiceId = wrongChoiceId;
    }
    
    // Getter와 Setter
    public int getReviewId() {
        return reviewId;
    }
    
    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public int getQuestionId() {
        return questionId;
    }
    
    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }
    
    public int getWrongChoiceId() {
        return wrongChoiceId;
    }
    
    public void setWrongChoiceId(int wrongChoiceId) {
        this.wrongChoiceId = wrongChoiceId;
    }
    
    public Timestamp getReviewDate() {
        return reviewDate;
    }
    
    public void setReviewDate(Timestamp reviewDate) {
        this.reviewDate = reviewDate;
    }
    
    public UserVO getUser() {
        return user;
    }
    
    public void setUser(UserVO user) {
        this.user = user;
    }
    
    public QuestionVO getQuestion() {
        return question;
    }
    
    public void setQuestion(QuestionVO question) {
        this.question = question;
    }
    
    public ChoiceVO getWrongChoice() {
        return wrongChoice;
    }
    
    public void setWrongChoice(ChoiceVO wrongChoice) {
        this.wrongChoice = wrongChoice;
    }
    
    @Override
    public String toString() {
        return "ReviewVO [reviewId=" + reviewId + ", userId=" + userId + ", questionId=" + questionId
                + ", wrongChoiceId=" + wrongChoiceId + ", reviewDate=" + reviewDate + "]";
    }
}