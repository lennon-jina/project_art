package com.art.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.art.service.IWikiService;

@Controller
public class AuthorController {

    @Autowired
    private IWikiService wikiService;

    @GetMapping("/artwork")
    public String showAuthorPage(@RequestParam("name") String authorName, Model model) {
        // 1. Wiki 요약/이미지
        Map<String, String> wikiInfo = wikiService.getAuthorSummary(authorName);

        // 2. View로 전달 (프론트엔드에서 artwork 가져올 거니까 artwork 목록 X)
        model.addAttribute("authorName", authorName);
        model.addAttribute("summary", wikiInfo.get("summary"));
        model.addAttribute("imageUrl", wikiInfo.get("image"));

        return "gallery/artwork"; // ✅ artwork.jsp
    }
}