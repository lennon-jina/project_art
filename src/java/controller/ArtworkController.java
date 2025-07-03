package com.art.controller;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.art.service.IArtworkService;
import com.art.vo.ArtworkVO;

@Controller
@RequestMapping("/quizartwork")
public class ArtworkController {
    @Autowired
    private IArtworkService artworkService;
    
    private List<String> defaultArtworkIds;
    
    @PostConstruct
    public void init() {
        // int를 String으로 변환
        defaultArtworkIds = new ArrayList<>();
        for (Integer id : List.of(111326, 61128, 16488, 16169, 11434, 28067, 6565, 118718)) {
            defaultArtworkIds.add(id.toString());
        }
    }
    
    @GetMapping("/api/list")
    @ResponseBody
    public String getArtworkListJson() {
        try {
            List<ArtworkVO> artworks = artworkService.getArtworksByIds(defaultArtworkIds);
            JSONArray array = new JSONArray();
            for (ArtworkVO a : artworks) {
                JSONObject obj = new JSONObject();
                obj.put("id", a.getApiId());
                obj.put("title", a.getTitle());
                obj.put("artist", a.getArtist());
                obj.put("date", a.getDateDisplay()); // dateCreated → dateDisplay로 변경
                obj.put("image_url", a.getImageUrl());
                array.put(obj);
            }
            return array.toString();
        } catch (Exception e) {
            return new JSONObject().put("error", "작품 목록 오류").toString();
        }
    }
    
    @GetMapping("/api/{id}")
    @ResponseBody
    public String getArtworkJson(@PathVariable String id) { // int → String으로 변경
        ArtworkVO artwork = artworkService.getArtworkByApiId(id);
        if (artwork == null)
            return new JSONObject().put("error", "작품 없음").toString();
        
        JSONObject obj = new JSONObject();
        obj.put("id", artwork.getApiId());
        obj.put("title", artwork.getTitle());
        obj.put("artist_display", artwork.getArtist());
        obj.put("date_display", artwork.getDateDisplay()); // dateCreated → dateDisplay로 변경
        
        // description 필드가 없어졌으므로, techniqueTitles로 대체
        if (artwork.getTechniqueTitles() != null) {
            obj.put("technique_titles", artwork.getTechniqueTitles());
        } else {
            obj.put("description", ""); // 하위 호환성을 위해 빈 문자열 제공
        }
        
        obj.put("image_url", artwork.getImageUrl());
        
        // 추가 정보가 있으면 포함
        if (artwork.getStyleTitle() != null) {
            obj.put("style_title", artwork.getStyleTitle());
        }
        if (artwork.getTermTitles() != null) {
            obj.put("term_titles", artwork.getTermTitles());
        }
        
        return obj.toString();
    }
    
    @GetMapping("/list")
    public String getArtworkListPage(Model model) {
        List<ArtworkVO> artworks = artworkService.getArtworksByIds(defaultArtworkIds);
        model.addAttribute("artworks", artworks);
        return "quiz/artQuizList";
    }
}