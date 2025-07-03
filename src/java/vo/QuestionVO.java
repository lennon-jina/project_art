package com.art.vo;

import java.util.List;

public class QuestionVO {
    private int questionId;
    private int quizId;
    private String questionType; // DATE_DISPLAY, TERM_TITLES, STYLE_TITLE, TECHNIQUE_TITLES
    private String questionText;
    private String correctAnswer;
    private int orderNum;
    
    // 관계 매핑을 위한 객체
    private QuizVO quiz;
    private List<ChoiceVO> choices;
    
    // 기본 생성자
    public QuestionVO() {}
    
    // 필수 필드 생성자
    public QuestionVO(int quizId, String questionType, String questionText, String correctAnswer) {
        this.quizId = quizId;
        this.questionType = questionType;
        this.questionText = questionText;
        this.correctAnswer = correctAnswer;
    }
    
    // Getter와 Setter
    public int getQuestionId() {
        return questionId;
    }
    
    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }
    
    public int getQuizId() {
        return quizId;
    }
    
    public void setQuizId(int quizId) {
        this.quizId = quizId;
    }
    
    public String getQuestionType() {
        return questionType;
    }
    
    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }
    
    public String getQuestionText() {
        return questionText;
    }
    
    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }
    
    public String getCorrectAnswer() {
        return correctAnswer;
    }
    
    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
    
    public int getOrderNum() {
        return orderNum;
    }
    
    public void setOrderNum(int orderNum) {
        this.orderNum = orderNum;
    }
    
    public QuizVO getQuiz() {
        return quiz;
    }
    
    public void setQuiz(QuizVO quiz) {
        this.quiz = quiz;
    }
    
    public List<ChoiceVO> getChoices() {
        return choices;
    }
    
    public void setChoices(List<ChoiceVO> choices) {
        this.choices = choices;
    }
    
    @Override
    public String toString() {
        return "QuestionVO [questionId=" + questionId + ", quizId=" + quizId + ", questionType=" + questionType
                + ", questionText=" + questionText + ", correctAnswer=" + correctAnswer + ", orderNum=" + orderNum + "]";
    }
}