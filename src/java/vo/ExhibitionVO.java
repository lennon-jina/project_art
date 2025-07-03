package com.art.vo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ExhibitionVO {
    private int id;
    private String exhibitionId;    // 전시회 ID
    private String title;           // 전시회 제목
    private String startDate;       // 시작일 (YYYY-MM-DD)
    private String endDate;         // 종료일 (YYYY-MM-DD)
    private String place;           // 전시 장소
    private String ticketInfo;      // 티켓 정보
    private String introduction;    // 전시회 소개
    private String imageUrl;        // 이미지 URL
    private String detailUrl;       // 상세 정보 URL
    private String genre;           // 장르
    private String duration;        // 관람시간
    private String numberPages;     // 전시품(수)정보
    private String tableOfContents; // 안내 및 유의사항
    private String author;          // 작가
    private String contactPoint;    // 문의
    private String actor;           // 출연진및제작진
    private String contributor;     // 주최/후원
    private String audience;        // 연령
    private String charge;          // 관람료 할인정보
    private String spatialCoverage; // 예매안내
    private String subDescription;  // 좌석정보
    private String collectedDate;   // 수집일
    private String issuedDate;      // 자료생성일자
    private int viewCount;          // 조회수
    private String eventSite;       // 추가된 필드: 이벤트 사이트

    public ExhibitionVO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getExhibitionId() {
        return exhibitionId;
    }

    public void setExhibitionId(String exhibitionId) {
        this.exhibitionId = exhibitionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = normalizeDate(startDate);
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = normalizeDate(endDate);
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getTicketInfo() {
        return ticketInfo;
    }

    public void setTicketInfo(String ticketInfo) {
        this.ticketInfo = ticketInfo;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDetailUrl() {
        return detailUrl;
    }

    public void setDetailUrl(String detailUrl) {
        this.detailUrl = detailUrl;
    }
    
    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getNumberPages() {
        return numberPages;
    }

    public void setNumberPages(String numberPages) {
        this.numberPages = numberPages;
    }

    public String getTableOfContents() {
        return tableOfContents;
    }

    public void setTableOfContents(String tableOfContents) {
        this.tableOfContents = tableOfContents;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContactPoint() {
        return contactPoint;
    }

    public void setContactPoint(String contactPoint) {
        this.contactPoint = contactPoint;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getContributor() {
        return contributor;
    }

    public void setContributor(String contributor) {
        this.contributor = contributor;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }

    public String getCharge() {
        return charge;
    }

    public void setCharge(String charge) {
        this.charge = charge;
    }

    public String getSpatialCoverage() {
        return spatialCoverage;
    }

    public void setSpatialCoverage(String spatialCoverage) {
        this.spatialCoverage = spatialCoverage;
    }

    public String getSubDescription() {
        return subDescription;
    }

    public void setSubDescription(String subDescription) {
        this.subDescription = subDescription;
    }

    public String getCollectedDate() {
        return collectedDate;
    }

    public void setCollectedDate(String collectedDate) {
        this.collectedDate = collectedDate;
    }

    public String getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(String issuedDate) {
        this.issuedDate = issuedDate;
    }

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }
    
    public String getEventSite() {
        return eventSite;
    }

    public void setEventSite(String eventSite) {
        this.eventSite = eventSite;
    }

    // 전시 상태 확인 (현재/예정/종료)
    public String getExhibitionStatus() {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date today = new Date();
            if (this.startDate == null || this.endDate == null) {
                return "상태미정";
            }
            Date start = sdf.parse(this.startDate);
            Date end = sdf.parse(this.endDate);

            if (today.before(start)) {
                return "예정";
            } else if (today.after(end)) {
                return "종료";
            } else {
                return "진행중";
            }
        } catch (ParseException e) {
            return "상태미정";
        }
    }

    // 전시 기간 형식화
    public String getFormattedPeriod() {
        if (startDate != null && endDate != null) {
            return startDate + " ~ " + endDate;
        } else {
            return "기간 정보 없음";
        }
    }

    // 날짜 형식을 맞춰주는 헬퍼 메서드
    private String normalizeDate(String date) {
        if (date == null || date.trim().isEmpty()) {
            return null;
        }
        date = date.trim();
        if (date.matches("\\d{4}")) {
            return date + "-01-01"; // 연도만 있을 경우 1월 1일로 보정
        } else if (date.matches("\\d{4}-\\d{2}")) {
            return date + "-01"; // 연-월만 있을 경우 1일로 보정
        } else if (date.matches("\\d{4}-\\d{2}-\\d{2}")) {
            return date; // 올바른 포맷
        } else {
            return null; // 잘못된 포맷은 null 처리
        }
    }
}
