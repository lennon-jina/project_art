package com.art.vo;

import java.sql.Timestamp;

public class QuizVO {
    private int quizId;
    private int artworkId;
    private String quizTitle;
    private Timestamp createdDate;
    
    // 관계 매핑을 위한 객체
    private ArtworkVO artwork;
    
    // 기본 생성자
    public QuizVO() {}
    
    // 필수 필드 생성자
    public QuizVO(int artworkId, String quizTitle) {
        this.artworkId = artworkId;
        this.quizTitle = quizTitle;
    }
    
    // Getter와 Setter
    public int getQuizId() {
        return quizId;
    }
    
    public void setQuizId(int quizId) {
        this.quizId = quizId;
    }
    
    public int getArtworkId() {
        return artworkId;
    }
    
    public void setArtworkId(int artworkId) {
        this.artworkId = artworkId;
    }
    
    public String getQuizTitle() {
        return quizTitle;
    }
    
    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }
    
    public Timestamp getCreatedDate() {
        return createdDate;
    }
    
    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }
    
    public ArtworkVO getArtwork() {
        return artwork;
    }
    
    public void setArtwork(ArtworkVO artwork) {
        this.artwork = artwork;
    }
    
    @Override
    public String toString() {
        return "QuizVO [quizId=" + quizId + ", artworkId=" + artworkId + ", quizTitle=" + quizTitle 
                + ", createdDate=" + createdDate + "]";
    }
}