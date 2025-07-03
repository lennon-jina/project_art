package com.art.vo;

public class UserTitleVO {
    private int titleId;
    private String titleName;
    private boolean isActive;

    // Getter, Setter
    public int getTitleId() {
        return titleId;
    }
    public void setTitleId(int titleId) {
        this.titleId = titleId;
    }
    public String getTitleName() {
        return titleName;
    }
    public void setTitleName(String titleName) {
        this.titleName = titleName;
    }
    public boolean isActive() {
        return isActive;
    }
    public void setActive(boolean active) {
        isActive = active;
    }
}
