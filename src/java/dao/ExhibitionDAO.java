package com.art.dao;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.art.vo.ExhibitionVO;

@Repository
public class ExhibitionDAO {

    @Autowired
    private SqlSession sqlSession;

    private final String API_BASE_URL = "http://api.kcisa.kr/openapi/API_CCA_145/request";
    private final String API_KEY = "a5556689-56db-4e94-bfed-1b593e6a0cea";

    // 전체 API 데이터를 몽땅 불러와 저장하는 메소드
    public void fetchAndSaveAllExhibitions() {
        int pageSize = 100;
        int pageNo = 1;
        boolean hasMore = true;

        while (hasMore) {
            try {
                StringBuilder urlBuilder = new StringBuilder(API_BASE_URL);
                urlBuilder.append("?serviceKey=").append(URLEncoder.encode(API_KEY, "UTF-8"));
                urlBuilder.append("&numOfRows=").append(pageSize);
                urlBuilder.append("&pageNo=").append(pageNo);

                URL url = new URL(urlBuilder.toString());
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/xml");

                if (conn.getResponseCode() == 200) {
                    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder builder = factory.newDocumentBuilder();
                    Document doc = builder.parse(conn.getInputStream());
                    doc.getDocumentElement().normalize();

                    NodeList itemList = doc.getElementsByTagName("item");

                    if (itemList.getLength() == 0) {
                        hasMore = false;
                    } else {
                        for (int i = 0; i < itemList.getLength(); i++) {
                            Node itemNode = itemList.item(i);
                            if (itemNode.getNodeType() == Node.ELEMENT_NODE) {
                                Element itemElement = (Element) itemNode;
                                ExhibitionVO exhibition = new ExhibitionVO();

                                exhibition.setExhibitionId(getTagValue("LOCAL_ID", itemElement));
                                exhibition.setTitle(getTagValue("TITLE", itemElement));
                                String period = getTagValue("PERIOD", itemElement);
                                String[] dates = parsePeriod(period);
                                exhibition.setStartDate(dates[0]);
                                exhibition.setEndDate(dates[1]);
                                exhibition.setPlace(getTagValue("EVENT_SITE", itemElement));
                                exhibition.setIntroduction(getTagValue("DESCRIPTION", itemElement));
                                exhibition.setImageUrl(getTagValue("IMAGE_OBJECT", itemElement));
                                exhibition.setDetailUrl(getTagValue("URL", itemElement));
                                exhibition.setGenre(getTagValue("GENRE", itemElement));
                                exhibition.setDuration(getTagValue("DURATION", itemElement));
                                exhibition.setCharge(getTagValue("CHARGE", itemElement));

                                saveExhibition(exhibition);
                            }
                        }
                        pageNo++;
                    }
                } else {
                    hasMore = false;
                }

                conn.disconnect();
                Thread.sleep(300); // 요청 사이 약간 텀 주기
            } catch (Exception e) {
                hasMore = false;
                e.printStackTrace();
            }
        }
    }

    private String getTagValue(String tag, Element element) {
        try {
            NodeList nlList = element.getElementsByTagName(tag).item(0).getChildNodes();
            Node nValue = nlList.item(0);
            if (nValue != null) {
                return nValue.getNodeValue();
            }
        } catch (Exception e) {
            // 무시
        }
        return null;
    }

    public List<ExhibitionVO> getExhibitionList(int offset, int pageSize) {
        Map<String, Object> params = new HashMap<>();
        params.put("offset", offset);
        params.put("limit", pageSize);

        List<ExhibitionVO> dbList = sqlSession.selectList("exhibition.getExhibitionList", params);

        if (dbList == null || dbList.isEmpty()) {
            fetchAndSaveAllExhibitions();
            dbList = sqlSession.selectList("exhibition.getExhibitionList", params);
        }

        return dbList;
    }

    public ExhibitionVO getExhibitionDetail(String exhibitionId) {
        return sqlSession.selectOne("exhibition.getExhibitionById", exhibitionId);
    }

    private void saveExhibition(ExhibitionVO exhibition) {
    	System.out.println("Saving Exhibition: " + exhibition.getExhibitionId() + " - " + exhibition.getTitle());
        ExhibitionVO existing = sqlSession.selectOne("exhibition.getExhibitionById", exhibition.getExhibitionId());

        if (existing == null) {
            sqlSession.insert("exhibition.insertExhibition", exhibition);
        } else {
            sqlSession.update("exhibition.updateExhibition", exhibition);
        }
    }

    public int getTotalExhibitionCount() {
        Integer count = sqlSession.selectOne("exhibition.getTotalExhibitionCount");
        return count != null ? count : 0;
    }

    public List<ExhibitionVO> searchExhibitions(String keyword) {
        return sqlSession.selectList("exhibition.searchExhibitions", keyword);
    }

    public List<ExhibitionVO> getCurrentExhibitions() {
        return sqlSession.selectList("exhibition.getCurrentExhibitions");
    }

    public List<ExhibitionVO> getUpcomingExhibitions() {
        return sqlSession.selectList("exhibition.getUpcomingExhibitions");
    }

    public List<ExhibitionVO> getEndedExhibitions() {
        return sqlSession.selectList("exhibition.getEndedExhibitions");
    }

    private String[] parsePeriod(String period) {
        if (period == null || period.trim().isEmpty()) {
            return new String[]{null, null};
        }

        period = period.trim();
        String startDate = null;
        String endDate = null;

        if (period.contains("~")) {
            String[] parts = period.split("~");
            startDate = parts[0].trim();
            endDate = parts.length > 1 ? parts[1].trim() : null;
        } else {
            startDate = period;
        }

        if (startDate != null) {
            if (startDate.matches("\\d{4}")) {
                startDate += "-01-01";
            } else if (startDate.matches("\\d{4}-\\d{2}")) {
                startDate += "-01";
            }
        }

        if (endDate != null) {
            if (endDate.matches("\\d{4}")) {
                endDate += "-12-31";
            } else if (endDate.matches("\\d{4}-\\d{2}")) {
                endDate += "-28";
            }
        }

        return new String[]{startDate, endDate};
    }
}
