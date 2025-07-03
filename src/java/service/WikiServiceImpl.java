package com.art.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class WikiServiceImpl implements IWikiService {

    @Override
    public String getAuthorImageUrl(String authorName) {
        try {
            String cleanName = toWikiTitle(authorName);
            String apiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + URLEncoder.encode(cleanName, "UTF-8");

            System.out.println("📘 [Wiki 요청] 작가 원본 이름: " + authorName);
            System.out.println("🧼 [Wiki 요청] 정제된 이름: " + cleanName);
            System.out.println("🔗 [Wiki 요청] 최종 URL: " + apiUrl);

            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) sb.append(line);
            br.close();

            JSONObject json = new JSONObject(sb.toString());
            if (json.has("thumbnail")) {
                return json.getJSONObject("thumbnail").getString("source");
            } else {
                return "/assets/img/default.png"; // 이미지 없을 경우 기본
            }

        } catch (Exception e) {
            System.out.println("❌ [Wiki 실패] " + e.getMessage());
            return "/assets/img/default.png"; // 실패 시 기본 이미지
        }
    }

    @Override
    public Map<String, String> getAuthorSummary(String authorName) {
        Map<String, String> result = new HashMap<>();
        try {
            String cleanName = toWikiTitle(authorName);
            String apiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + URLEncoder.encode(cleanName, "UTF-8");

            System.out.println("📘 [Wiki Summary 요청] 작가 원본 이름: " + authorName);
            System.out.println("🧼 [Wiki Summary 요청] 정제된 이름: " + cleanName);
            System.out.println("🔗 [Wiki Summary 요청] 최종 URL: " + apiUrl);

            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) sb.append(line);
            br.close();

            JSONObject json = new JSONObject(sb.toString());
            result.put("summary", json.optString("extract", "No summary available"));
            result.put("image", json.has("thumbnail") ? json.getJSONObject("thumbnail").getString("source") : "/assets/img/default.png");

        } catch (Exception e) {
            System.out.println("❌ [Wiki Summary 실패] " + e.getMessage());
            result.put("summary", "정보를 불러올 수 없습니다.");
            result.put("image", "/assets/img/default.png");
        }
        return result;
    }

    // ✨ 이름 정제 공통 처리 메서드
    private String toWikiTitle(String authorName) {
        if (authorName == null || authorName.trim().equals("") || authorName.contains("없음")) {
            return "Unknown_artist";
        }
        return authorName.split("\\(")[0]
                         .split("\\n")[0]
                         .trim()
                         .replace(" ", "_");
    }
}
