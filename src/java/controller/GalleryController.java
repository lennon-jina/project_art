package com.art.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.art.service.IGalleryService;
import com.art.service.IWikiService;

@Controller
public class GalleryController {

    @Autowired
    private IGalleryService galleryService;

    @Autowired
    private IWikiService wikiService;

    // 교체된 작가 목록 (위키 사진 확인됨)
    private static final List<String> curatedAuthorList = List.of(
        "Claude Monet",
        "Pablo Picasso",
        "Henri Matisse",
        "Paul Cézanne",
        "Georges Seurat",
        "Mary Cassatt",
        "Paul Gauguin",
        "Marc Chagall",
        "Edward Hopper",
        "Vincent van Gogh"
    );

    @GetMapping("/gallery")
    public String showGalleryPage(Model model) {
        List<Map<String, String>> authors = new ArrayList<>();
        for (String name : curatedAuthorList) {
            Map<String, String> author = new HashMap<>();
            author.put("name", name);
            author.put("imgUrl", wikiService.getAuthorImageUrl(name));
            authors.add(author);
        }
        model.addAttribute("authors", authors); // 이 부분을 수정하여 이미지 URL이 포함된 authors를 전달
        return "gallery/GalleryMain";
    }
    
    @GetMapping("/gallery/artwork")
    public String showArtworkPage(Model model, @RequestParam(required = false) String artist) {
        // artist 파라미터를 받아서 모델에 추가
        model.addAttribute("artistName", artist);
        
        // 작가 정보가 필요한 경우 추가로 작가 정보 조회
        if (artist != null && !artist.isEmpty()) {
            // 위키서비스에서 작가 이미지 URL 가져오기
            String imageUrl = wikiService.getAuthorImageUrl(artist);
            model.addAttribute("artistImageUrl", imageUrl);
            
            // 작가 설명 추가 (간단한 설명)
            String artistDescription = getArtistDescription(artist);
            model.addAttribute("artistDescription", artistDescription);
            
            // 작가의 작품 정보 가져오기 (예시로 빈 리스트 대신 실제 작품 리스트 추가)
            // 여기서는 실제 API 호출 대신 더미 데이터 사용 
            List<Map<String, Object>> artworks = getDummyArtworks(artist);
            model.addAttribute("artworks", artworks);
        }
        
        return "gallery/artwork"; // artwork.jsp로 포워딩
    }

    // 작가별 간단한 설명을 제공하는 메서드
    private String getArtistDescription(String artist) {
        Map<String, String> descriptions = new HashMap<>();
        descriptions.put("Claude Monet", "클로드 모네(1840-1926)는 프랑스의 화가이자 인상주의 회화의 창시자로, 자연을 인식한 대로 그리려는 시도에서 현대주의의 중요한 선구자입니다.");
        descriptions.put("Pablo Picasso", "파블로 피카소(1881-1973)는 스페인 출신의 화가, 조각가, 판화가로 입체주의 운동을 공동 창립했으며, 20세기에 가장 영향력 있는 예술가 중 한 명입니다.");
        descriptions.put("Henri Matisse", "앙리 마티스(1869-1954)는 색채 사용과 유려하고 독창적인 드로잉으로 유명한 프랑스 예술가입니다.");
        descriptions.put("Paul Cézanne", "폴 세잔(1839-1906)은 프랑스의 후기 인상파 화가로 20세기 초 입체파와 야수파 등 현대 미술에 큰 영향을 미쳤습니다.");
        descriptions.put("Georges Seurat", "조르주 쇠라(1859-1891)는 프랑스의 후기 인상파 화가로, 점묘법을 발전시킨 것으로 알려져 있습니다.");
        descriptions.put("Mary Cassatt", "메리 카사트(1844-1926)는 미국의 인상파 화가로, 특히 어머니와 아이의 일상을 묘사한 작품으로 유명합니다.");
        descriptions.put("Paul Gauguin", "폴 고갱(1848-1903)은 프랑스의 후기 인상파 화가로, 원시주의와 상징주의에 큰 영향을 미쳤습니다.");
        descriptions.put("Marc Chagall", "마르크 샤갈(1887-1985)은 러시아 출신의 프랑스 화가로, 꿈과 환상을 주제로 한 작품으로 유명합니다.");
        descriptions.put("Edward Hopper", "에드워드 호퍼(1882-1967)는 미국의 현실주의 화가로, 도시와 시골 풍경, 고독과 소외를 주제로 한 작품으로 유명합니다.");
        descriptions.put("Vincent van Gogh", "빈센트 반 고흐(1853-1890)는 네덜란드 출신의 화가로, 독특한 색채와 대담한 붓터치가, 후기 인상파 미술과 현대 미술에 큰 영향을 미쳤습니다.");
        
        return descriptions.getOrDefault(artist, artist + "의 작품 갤러리");
    }

    // 더미 작품 데이터를 생성하는 메서드 (실제 API 대신 사용)
    private List<Map<String, Object>> getDummyArtworks(String artist) {
        List<Map<String, Object>> artworks = new ArrayList<>();
        
        // 작가별 대표 작품 이미지 ID (시카고 아트 인스티튜트 API 용)
        // 실제 API를 사용하지 않고 하드코딩된 값 사용
        Map<String, List<String>> artistWorks = new HashMap<>();
        artistWorks.put("Claude Monet", List.of("16568", "14598", "16571", "26314", "14601", "111436", "16569", "16570", "25998", "26418"));
        artistWorks.put("Pablo Picasso", List.of("147504", "28862", "5357", "111429", "147503", "111475", "25573", "65487", "16526", "61129"));
        artistWorks.put("Henri Matisse", List.of("79307", "109275", "80607", "9503", "9502", "21727", "90433", "88893", "64442", "78451"));
        artistWorks.put("Vincent van Gogh", List.of("28560", "64975", "80724", "74806", "41541", "13718", "80607", "65903", "28067", "52014"));
        // 나머지 작가들의 작품 추가...
        
        // 해당 작가의 작품 목록이 있으면 사용, 없으면 더미 데이터 생성
        List<String> imageIds = artistWorks.getOrDefault(artist, List.of());
        
        for (int i = 0; i < 10; i++) {
            Map<String, Object> artwork = new HashMap<>();
            String imageId = i < imageIds.size() ? imageIds.get(i) : "";
            
            artwork.put("index", i);
            artwork.put("imageId", imageId);
            artwork.put("title", "Artwork " + (i + 1) + " by " + artist);
            
            artworks.add(artwork);
        }
        
        return artworks;
    }
}
