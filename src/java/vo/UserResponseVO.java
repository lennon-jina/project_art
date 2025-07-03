package com.art.vo;

import java.util.Date;

public class UserResponseVO {
    private int id;
    private int quizQuestionId;
    private int selectedOption;
    private String correctYn; // boolean → String으로 바꿈
    private Date responseDate;

    public UserResponseVO() {
    }

    public UserResponseVO(int id, int quizQuestionId, int selectedOption, 
                          String correctYn, Date responseDate) {
        this.id = id;
        this.quizQuestionId = quizQuestionId;
        this.selectedOption = selectedOption;
        this.correctYn = correctYn;
        this.responseDate = responseDate;
    }

    // Getter / Setter
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getQuizQuestId() {
        return quizQuestionId;
    }
    public void setQuizQuestId(int quizQuestionId) {
        this.quizQuestionId = quizQuestionId;
    }
    public int getSelectedOption() {
        return selectedOption;
    }
    public void setSelectedOption(int selectedOption) {
        this.selectedOption = selectedOption;
    }
    public String getCorrectYn() {
        return correctYn;
    }
    public void setCorrectYn(String correctYn) {
        this.correctYn = correctYn;
    }
    public Date getResponseDate() {
        return responseDate;
    }
    public void setResponseDate(Date responseDate) {
        this.responseDate = responseDate;
    }
}
