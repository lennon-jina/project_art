package com.art.vo;

/**
 * 미술 작품 정보를 담는 Value Object 클래스
 */
public class ArtworkVO {
    private int artworkId;     // 데이터베이스 ID (ARTWORK_ID)
    private String title;      // 작품 제목 (TITLE)
    private String imageUrl;   // 이미지 URL (IMAGE_URL)
    private String artist;     // 작가 이름 (ARTIST)
    private String dateDisplay; // 제작 연도 (DATE_DISPLAY)
    private String styleTitle;  // 화풍 스타일 (STYLE_TITLE)
    private String techniqueTitles; // 기법 (TECHNIQUE_TITLES)
    private String termTitles;  // 용어 (TERM_TITLES)
    private String apiId;      // Art Institute of Chicago API ID (API_ID)
    private String createdDate; // 데이터 생성 날짜 (CREATED_DATE)

    // 기본 생성자
    public ArtworkVO() {}

    // 필요한 필드만 초기화하는 생성자
    public ArtworkVO(int artworkId, String apiId, String title, String imageUrl,
                     String artist, String dateDisplay) {
        this.artworkId = artworkId;
        this.apiId = apiId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.artist = artist;
        this.dateDisplay = dateDisplay;
    }

    // API ID만으로 초기화하는 생성자
    public ArtworkVO(String apiId) {
        this.apiId = apiId;
    }

    // Getter와 Setter
    public int getArtworkId() {
        return artworkId;
    }
    public void setArtworkId(int artworkId) {
        this.artworkId = artworkId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public String getArtist() {
        return artist;
    }
    public void setArtist(String artist) {
        this.artist = artist;
    }
    public String getDateDisplay() {
        return dateDisplay;
    }
    public void setDateDisplay(String dateDisplay) {
        this.dateDisplay = dateDisplay;
    }
    public String getStyleTitle() {
        return styleTitle;
    }
    public void setStyleTitle(String styleTitle) {
        this.styleTitle = styleTitle;
    }
    public String getTechniqueTitles() {
        return techniqueTitles;
    }
    public void setTechniqueTitles(String techniqueTitles) {
        this.techniqueTitles = techniqueTitles;
    }
    public String getTermTitles() {
        return termTitles;
    }
    public void setTermTitles(String termTitles) {
        this.termTitles = termTitles;
    }
    public String getApiId() {
        return apiId;
    }
    public void setApiId(String apiId) {
        this.apiId = apiId;
    }
    public String getCreatedDate() {
        return createdDate;
    }
    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "ArtworkVO [artworkId=" + artworkId + ", apiId=" + apiId + ", title=" + title + 
               ", imageUrl=" + imageUrl + ", artist=" + artist + ", dateDisplay=" + dateDisplay +
               ", styleTitle=" + styleTitle + ", techniqueTitles=" + techniqueTitles + 
               ", termTitles=" + termTitles + ", createdDate=" + createdDate + "]";
    }
}