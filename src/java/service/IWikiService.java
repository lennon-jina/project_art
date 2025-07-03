package com.art.service;

import java.util.Map;

public interface IWikiService {
    String getAuthorImageUrl(String authorName);
    Map<String, String> getAuthorSummary(String authorName);
}