package com.art.vo;

public class ChoiceVO {
    private int choiceId;
    private int questionId;
    private String choiceText;
    private String isCorrect; // 'Y' or 'N'
    private int orderNum;
    
    // 관계 매핑을 위한 객체
    private QuestionVO question;
    
    // 기본 생성자
    public ChoiceVO() {}
    
    // 필수 필드 생성자
    public ChoiceVO(int questionId, String choiceText, String isCorrect) {
        this.questionId = questionId;
        this.choiceText = choiceText;
        this.isCorrect = isCorrect;
    }
    
    // Getter와 Setter
    public int getChoiceId() {
        return choiceId;
    }
    
    public void setChoiceId(int choiceId) {
        this.choiceId = choiceId;
    }
    
    public int getQuestionId() {
        return questionId;
    }
    
    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }
    
    public String getChoiceText() {
        return choiceText;
    }
    
    public void setChoiceText(String choiceText) {
        this.choiceText = choiceText;
    }
    
    public String getIsCorrect() {
        return isCorrect;
    }
    
    public void setIsCorrect(String isCorrect) {
        this.isCorrect = isCorrect;
    }
    
    public int getOrderNum() {
        return orderNum;
    }
    
    public void setOrderNum(int orderNum) {
        this.orderNum = orderNum;
    }
    
    public QuestionVO getQuestion() {
        return question;
    }
    
    public void setQuestion(QuestionVO question) {
        this.question = question;
    }
    
    @Override
    public String toString() {
        return "ChoiceVO [choiceId=" + choiceId + ", questionId=" + questionId + ", choiceText=" + choiceText
                + ", isCorrect=" + isCorrect + ", orderNum=" + orderNum + "]";
    }
}