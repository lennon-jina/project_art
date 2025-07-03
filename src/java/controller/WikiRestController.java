package com.art.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.art.service.IWikiService;

@RestController
@RequestMapping("/api/wiki")
public class WikiRestController {

    @Autowired
    private IWikiService wikiService;

    @GetMapping("/image/{authorName}")
    public Map<String, String> getAuthorImage(@PathVariable String authorName) {
        Map<String, String> result = new HashMap<>();
        result.put("image", wikiService.getAuthorImageUrl(authorName));
        return result;
    }

    @GetMapping("/summary/{authorName}")
    public Map<String, String> getAuthorSummary(@PathVariable String authorName) {
        return wikiService.getAuthorSummary(authorName);
    }
}
