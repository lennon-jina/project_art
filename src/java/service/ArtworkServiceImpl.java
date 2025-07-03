package com.art.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.art.dao.IArtworkDAO;
import com.art.vo.ArtworkVO;

@Service
public class ArtworkServiceImpl implements IArtworkService {
    private static final String API_URL = "https://api.artic.edu/api/v1";
    
    @Autowired
    private IArtworkDAO artworkDao;
    
    @Override
    public ArtworkVO getArtworkFromAPI(String artworkId) {
        try {
            ArtworkVO artwork = artworkDao.selectArtworkByApiId(artworkId);
            if (artwork != null) return artwork;
            
            // 기본 필드 + 추가 필드 요청
            String fields = "id,title,image_id,artist_display,date_display,style_title,technique_titles,term_titles";
            String apiUrl = API_URL + "/artworks/" + artworkId + "?fields=" + fields;
            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            
            if (conn.getResponseCode() != 200) {
                System.out.println("API 응답 오류: " + conn.getResponseCode());
                return null;
            }
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) response.append(line);
            reader.close();
            
            JSONObject data = new JSONObject(response.toString()).getJSONObject("data");
            
            artwork = new ArtworkVO();
            artwork.setApiId(data.getString("id"));
            artwork.setTitle(data.getString("title"));
            artwork.setArtist(data.optString("artist_display", "Unknown artist"));
            artwork.setDateDisplay(data.optString("date_display", ""));
            artwork.setStyleTitle(data.optString("style_title", ""));
            
            // 기법과 용어 처리
            if (data.has("technique_titles") && !data.isNull("technique_titles")) {
                artwork.setTechniqueTitles(data.getJSONArray("technique_titles").toString());
            }
            
            if (data.has("term_titles") && !data.isNull("term_titles")) {
                artwork.setTermTitles(data.getJSONArray("term_titles").toString());
            }
            
            // 이미지 URL 설정
            if (data.has("image_id") && !data.isNull("image_id")) {
                String imageId = data.getString("image_id");
                artwork.setImageUrl("https://www.artic.edu/iiif/2/" + imageId + "/full/843,/0/default.jpg");
            }
            
            // insert or update
            if (artworkDao.selectArtworkByApiId(artwork.getApiId()) != null) {
                artworkDao.updateArtwork(artwork);
            } else {
                artworkDao.insertArtwork(artwork);
            }
            
            return artwork;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @Override
    public List<ArtworkVO> getArtworksByIds(List<String> artworkIds) {
        List<ArtworkVO> artworks = new ArrayList<>();
        for (String id : artworkIds) {
            ArtworkVO artwork = getArtworkFromAPI(id);
            if (artwork != null) artworks.add(artwork);
        }
        return artworks;
    }
    
    @Override
    public List<ArtworkVO> getAllArtworks() {
        return artworkDao.selectAllArtworks();
    }
    
    @Override
    public ArtworkVO getArtworkById(int artworkId) {
        return artworkDao.selectArtworkById(artworkId);
    }
    
    @Override
    public ArtworkVO getArtworkByApiId(String apiId) {
        ArtworkVO artwork = artworkDao.selectArtworkByApiId(apiId);
        return (artwork != null) ? artwork : getArtworkFromAPI(apiId);
    }
}