package com.art.controller;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.art.service.IArtworkService;
import com.art.service.IQuizService;
import com.art.vo.ArtworkVO;
import com.art.vo.ChoiceVO;
import com.art.vo.QuestionVO;
import com.art.vo.QuizVO;

@Controller
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    private IArtworkService artworkService;
    
    @Autowired
    private IQuizService quizService;
    
    @GetMapping
    public String showQuizPage(@RequestParam(name = "artworkId", required = false) String artworkId, Model model) {
        if (artworkId == null) {
            return "quiz/artQuizList";
        }
        
        // API_ID로 작품 조회
        ArtworkVO artwork = artworkService.getArtworkByApiId(artworkId);
        if (artwork == null) {
            System.err.println("❌ Artwork not found for API ID: " + artworkId);
            return "error/404";
        }
        
        model.addAttribute("artwork", artwork);
        return "quiz/artQuiz";
    }
    
    // API 방식으로 퀴즈 데이터 제공 (기존 방식과 호환을 위해 JSON 문자열 직접 반환)
    @GetMapping(value = "/api/list", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    @ResponseBody
    public String getQuizDataJson() {
        try {
            List<ArtworkVO> artworks = artworkService.getAllArtworks();
            JSONArray array = new JSONArray();
            
            for (ArtworkVO artwork : artworks) {
                JSONObject obj = new JSONObject();
                obj.put("id", artwork.getApiId());
                obj.put("title", artwork.getTitle());
                obj.put("artist", artwork.getArtist());
                obj.put("date", artwork.getDateDisplay());
                obj.put("image_url", artwork.getImageUrl());
                array.put(obj);
            }
            
            return new String(array.toString().getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        } catch (Exception e) {
            e.printStackTrace();
            return new JSONObject().put("error", "작품 목록 오류").toString();
        }
    }
    
    @GetMapping(value = "/api/{artworkId}", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    @ResponseBody
    public String getQuizQuestionJson(@PathVariable String artworkId) {
        try {
            long startTime = System.currentTimeMillis();
            System.out.println("========== STARTING API REQUEST FOR ARTWORK ID: " + artworkId + " ==========");
            
            // 작품 정보 조회
            ArtworkVO artwork = artworkService.getArtworkByApiId(artworkId);
            if (artwork == null) {
                System.err.println("Artwork not found for API ID: " + artworkId);
                return new JSONObject().put("error", "작품을 찾을 수 없습니다.").toString();
            }
            
            System.out.println("Found artwork: " + artwork.getTitle() + ", Internal ID: " + artwork.getArtworkId());
            
            // DB에서 기존 퀴즈 데이터 확인
            QuizVO existingQuiz = quizService.getQuizByArtworkId(artwork.getArtworkId());
            
            // 기존 퀴즈가 있으면 사용하고, 없으면 새로 생성
            QuizVO quiz;
            if (existingQuiz != null) {
                quiz = existingQuiz;
                System.out.println("Using existing quiz with ID: " + quiz.getQuizId());
            } else {
                // generateQuiz 메소드는 QuizServiceImpl에 이미 구현되어 있고,
                // 해당 메소드에서 artwork 데이터를 기반으로 문제와 오답을 생성함
                quiz = quizService.generateQuiz(artwork.getArtworkId());
                System.out.println("Generated new quiz with ID: " + quiz.getQuizId());
                
                if (quiz == null) {
                    return new JSONObject().put("error", "퀴즈 생성에 실패했습니다.").toString();
                }
            }
            
            // JSON 응답 생성
            JSONObject result = new JSONObject();
            result.put("quizId", quiz.getQuizId());
            result.put("artworkImage", artwork.getImageUrl()); // ✅ 이미지 URL 추가
            result.put("artworkTitle", artwork.getTitle());    // ✅ 제목도 추가
            result.put("artistName", artwork.getArtist());     // ✅ 작가명도 추가
            
            // 퀴즈 질문 조회
            List<QuestionVO> questions = quizService.getQuestionsByQuizId(quiz.getQuizId());
            
            JSONArray questionsArray = new JSONArray();
            for (QuestionVO question : questions) {
                JSONObject questionObj = new JSONObject();
                questionObj.put("question", question.getQuestionText());
                questionObj.put("questionId", question.getQuestionId());
                
                // 선택지 조회
                List<ChoiceVO> choices = quizService.getChoicesByQuestionId(question.getQuestionId());
                
                JSONArray optionsArray = new JSONArray();
                int correctIndex = -1;
                
                for (int i = 0; i < choices.size(); i++) {
                    ChoiceVO choice = choices.get(i);
                    optionsArray.put(choice.getChoiceText());
                    
                    if ("Y".equals(choice.getIsCorrect())) {
                        correctIndex = i;
                    }
                }
                
                questionObj.put("options", optionsArray);
                questionObj.put("correctAnswer", correctIndex);
                
                questionsArray.put(questionObj);
            }
            
            result.put("quizQuestions", questionsArray);
            
            String jsonResult = result.toString();
            
            long endTime = System.currentTimeMillis();
            System.out.println("========== API REQUEST COMPLETED IN " + (endTime - startTime) + "ms ==========");
            System.out.println("Returning JSON result: " + jsonResult.substring(0, Math.min(200, jsonResult.length())) + "...");
            
            // UTF-8로 인코딩 보장
            return new String(jsonResult.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error generating quiz JSON: " + e.getMessage());
            return new JSONObject().put("error", "퀴즈 데이터 오류: " + e.getMessage()).toString();
        }
    }
    
    @PostMapping(value = "/api/submit", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    @ResponseBody
    public String submitQuizAnswers(
            @RequestParam(name = "quizId") int quizId,
            @RequestParam(name = "userId", required = false, defaultValue = "-1") int userId,
            @RequestBody Map<String, Integer> answers) {
        try {
            System.out.println("퀴즈 제출 요청 - Quiz ID: " + quizId + ", User ID: " + userId);
            System.out.println("제출된 답안: " + answers);
            
            // 채점 로직
            int correctCount = 0;
            JSONObject questionResults = new JSONObject();
            
            for (String questionIdStr : answers.keySet()) {
                int questionId = Integer.parseInt(questionIdStr);
                int userAnswerIndex = answers.get(questionIdStr);
                
                // DB에서 해당 문제의 선택지 목록 가져오기
                List<ChoiceVO> choices = quizService.getChoicesByQuestionId(questionId);
                
                boolean isCorrect = false;
                if (choices != null && userAnswerIndex >= 0 && userAnswerIndex < choices.size()) {
                    // 사용자가 선택한 선택지가 정답인지 확인
                    isCorrect = "Y".equals(choices.get(userAnswerIndex).getIsCorrect());
                }
                
                if (isCorrect) correctCount++;
                questionResults.put(questionIdStr, isCorrect);
            }
            
            JSONObject result = new JSONObject();
            result.put("success", true);
            result.put("score", correctCount);
            result.put("total", answers.size());
            result.put("questionResults", questionResults);
            
            // 사용자 점수 기록 (선택사항)
            if (userId > 0) {
                // 여기에 사용자 점수 저장 로직 추가 (필요시)
            }
            
            return new String(result.toString().getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        } catch (Exception e) {
            e.printStackTrace();
            return new JSONObject()
                    .put("success", false)
                    .put("message", "답안 제출 중 오류가 발생했습니다: " + e.getMessage())
                    .toString();
        }
    }
}