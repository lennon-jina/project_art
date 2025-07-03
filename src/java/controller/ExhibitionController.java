package com.art.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.art.service.ExhibitionService;
import com.art.vo.ExhibitionVO;

@Controller
@RequestMapping("/exhibition")
public class ExhibitionController {
    
    @Autowired
    private ExhibitionService exhibitionService;
    
    // 전시회 메인 페이지
    @GetMapping({"", "/"})
    public String exhibitionMain(Model model) {
        // 메인 페이지는 JavaScript에서 AJAX로 데이터를 불러옵니다
        return "exhibition/exhibitionMain";
    }
    
    // 전시회 목록 페이지
    @GetMapping("/list")
    public String exhibitionList(Model model,
                                @RequestParam(value = "page", defaultValue = "1") int page,
                                @RequestParam(value = "state", required = false) String state) {
        
        List<ExhibitionVO> exhibitions;
        String pageTitle = "All Exhibitions";
        
        if ("current".equals(state)) {
            exhibitions = exhibitionService.getCurrentExhibitions();
            pageTitle = "Current & Upcoming Exhibitions";
        } else if ("upcoming".equals(state)) {
            exhibitions = exhibitionService.getUpcomingExhibitions();
            pageTitle = "Upcoming Exhibitions";
        } else if ("archived".equals(state)) {
            exhibitions = exhibitionService.getEndedExhibitions();
            pageTitle = "Exhibition Archive";
        } else {
            exhibitions = exhibitionService.getExhibitionList(page);
        }
        
        int totalCount = exhibitions.size();
        
        model.addAttribute("exhibitions", exhibitions);
        model.addAttribute("totalCount", totalCount);
        model.addAttribute("currentPage", page);
        model.addAttribute("state", state);
        model.addAttribute("pageTitle", pageTitle);
        
        return "exhibition/exhibitionList";
    }
    
    // 전시회 상세 페이지
    @GetMapping("/detail/{exhibitionId}")
    public String exhibitionDetail(@PathVariable("exhibitionId") String exhibitionId, Model model) {
        ExhibitionVO exhibition = exhibitionService.getExhibitionDetail(exhibitionId);
        model.addAttribute("exhibition", exhibition);
        return "exhibition/exhibitionDetail";
    }
    
    // 전시회 검색
    @GetMapping("/search")
    public String searchExhibition(@RequestParam("keyword") String keyword, Model model) {
        List<ExhibitionVO> searchResults = exhibitionService.searchExhibitions(keyword);
        model.addAttribute("exhibitions", searchResults);
        model.addAttribute("keyword", keyword);
        model.addAttribute("totalCount", searchResults.size());
        model.addAttribute("pageTitle", "Search Results: " + keyword);
        return "exhibition/exhibitionList";
    }
    
    // AJAX 호출을 위한 전시회 데이터 조회
    @GetMapping("/api/list")
    @ResponseBody
    public List<ExhibitionVO> getExhibitionData(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "state", required = false) String state,
            @RequestParam(value = "exclude", required = false) String excludeId,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        
        List<ExhibitionVO> exhibitions;
        
        if ("current".equals(state)) {
            exhibitions = exhibitionService.getCurrentExhibitions();
        } else if ("upcoming".equals(state)) {
            exhibitions = exhibitionService.getUpcomingExhibitions();
        } else if ("archived".equals(state)) {
            exhibitions = exhibitionService.getEndedExhibitions();
        } else {
            exhibitions = exhibitionService.getExhibitionList(page);
        }
        
        // 특정 ID를 제외하고 결과 반환 (관련 전시회 기능용)
        if (excludeId != null && !excludeId.isEmpty()) {
            exhibitions.removeIf(e -> excludeId.equals(e.getExhibitionId()));
        }
        
        // 결과 개수 제한
        if (exhibitions.size() > limit) {
            exhibitions = exhibitions.subList(0, limit);
        }
        
        return exhibitions;
    }
}