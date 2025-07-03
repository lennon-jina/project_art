package com.art.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import org.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.art.dao.IArtworkDAO;
import com.art.dao.IChoiceDAO;
import com.art.dao.IQuestionDAO;
import com.art.dao.IQuizDAO;
import com.art.vo.ArtworkVO;
import com.art.vo.ChoiceVO;
import com.art.vo.QuestionVO;
import com.art.vo.QuizVO;

@Service
public class QuizServiceImpl implements IQuizService {

    @Autowired
    private IQuizDAO quizDAO;
    
    @Autowired
    private IQuestionDAO questionDAO;
    
    @Autowired
    private IChoiceDAO choiceDAO;
    
    @Autowired
    private IArtworkDAO artworkDAO;
    
    @Autowired
    private IArtworkService artworkService;
    
    private static final Random random = new Random();

    @Override
    @Transactional
    public QuizVO generateQuiz(int artworkId) {
        // 1. 작품 정보 조회
        ArtworkVO artwork = artworkService.getArtworkById(artworkId);
        if (artwork == null) {
            System.out.println("Artwork not found for ID: " + artworkId);
            return null;
        }
        
        System.out.println("Found artwork: " + artwork.getTitle());
        System.out.println("Artwork details for ID " + artworkId + ":");
        System.out.println("Title: " + artwork.getTitle());
        System.out.println("Artist: " + artwork.getArtist());
        System.out.println("DateDisplay: " + artwork.getDateDisplay());
        System.out.println("StyleTitle: " + artwork.getStyleTitle());
        System.out.println("TechniqueTitles: " + artwork.getTechniqueTitles());
        System.out.println("TermTitles: " + artwork.getTermTitles());
        
        // 2. 이미 생성된 퀴즈가 있는지 확인
        QuizVO existingQuiz = quizDAO.selectQuizByArtworkId(artworkId);
        if (existingQuiz != null) {
            List<QuestionVO> questions = questionDAO.selectQuestionsByQuizId(existingQuiz.getQuizId());

            if (questions != null && !questions.isEmpty()) {
                boolean allQuestionsHaveChoices = true;
                
                // 모든 질문이 선택지를 가지고 있는지 확인
                for (QuestionVO question : questions) {
                    List<ChoiceVO> choices = choiceDAO.selectChoicesByQuestionId(question.getQuestionId());
                    if (choices == null || choices.isEmpty()) {
                        allQuestionsHaveChoices = false;
                        break;
                    }
                    question.setChoices(choices);
                }
                
                if (allQuestionsHaveChoices) {
                    System.out.println("Found existing quiz with " + questions.size() + " questions and all questions have choices");
                    existingQuiz.setArtwork(artwork);
                    return existingQuiz;
                } else {
                    System.out.println("Found existing quiz but some questions don't have choices. Deleting and regenerating...");
                    choiceDAO.deleteChoicesByQuizId(existingQuiz.getQuizId());
                    questionDAO.deleteQuestionsByQuizId(existingQuiz.getQuizId());
                    quizDAO.deleteQuiz(existingQuiz.getQuizId());
                }
            } else {
                System.out.println("Found existing quiz with no questions. Deleting and regenerating...");
                choiceDAO.deleteChoicesByQuizId(existingQuiz.getQuizId());
                questionDAO.deleteQuestionsByQuizId(existingQuiz.getQuizId());
                quizDAO.deleteQuiz(existingQuiz.getQuizId());
            }
        }
        
        // 3. 다른 모든 작품 데이터 가져오기 (오답 선택지용)
        List<ArtworkVO> allArtworks = artworkDAO.getAllArtworks();
        if (allArtworks == null || allArtworks.isEmpty()) {
            System.out.println("No artwork data available for creating choices!");
            return null;
        }
        
        // 4. 현재 작품 제외
        allArtworks.removeIf(art -> art.getArtworkId() == artworkId);
        
        // 5. 새 퀴즈 생성
        QuizVO quiz = new QuizVO();
        quiz.setArtworkId(artworkId);
        quiz.setQuizTitle(artwork.getTitle() + " Quiz");
        quizDAO.insertQuiz(quiz);
        System.out.println("Created new quiz with ID: " + quiz.getQuizId());
        
        // 6. 문제 유형별로 문제 생성
        List<String> questionTypes = Arrays.asList(
                "DATE_DISPLAY", "TERM_TITLES", "STYLE_TITLE", "TECHNIQUE_TITLES");

        int orderNum = 1;
        int createdQuestions = 0;
        for (String type : questionTypes) {
            System.out.println("Trying to create question of type: " + type);
            QuestionVO question = createQuestion(artwork, type, orderNum++, quiz.getQuizId());
            if (question != null) {
                try {
                    questionDAO.insertQuestion(question);
                    System.out.println("Created question of type " + type + " with ID: " + question.getQuestionId());
                    boolean choicesCreated = createChoicesForQuestion(question, artwork, allArtworks);
                    
                    // 선택지 생성에 실패한 경우, 질문 삭제
                    if (!choicesCreated) {
                        System.out.println("❌ Failed to create choices for question type " + type + ". Deleting question.");
                        questionDAO.deleteQuestion(question.getQuestionId());
                    } else {
                        createdQuestions++;
                    }
                } catch (Exception e) {
                    System.out.println("❌ Error inserting question of type " + type + ": " + e.getMessage());
                }
            } else {
                System.out.println("❌ Failed to create question of type: " + type);
            }
        }

        if (createdQuestions == 0) {
            System.out.println("❌ No questions could be created for quiz ID: " + quiz.getQuizId() + ". Deleting quiz...");
            try {
                choiceDAO.deleteChoicesByQuizId(quiz.getQuizId());
                questionDAO.deleteQuestionsByQuizId(quiz.getQuizId());
                quizDAO.deleteQuiz(quiz.getQuizId());
            } catch (Exception e) {
                System.out.println("⚠️ Error while deleting incomplete quiz: " + e.getMessage());
            }
            return null;
        }
        
        // 완성된 퀴즈를 다시 DB에서 가져와서 반환
        QuizVO generatedQuiz = quizDAO.selectQuizById(quiz.getQuizId());
        List<QuestionVO> createdQuestionsList = questionDAO.selectQuestionsByQuizId(quiz.getQuizId());
        System.out.println("Created " + createdQuestionsList.size() + " questions for quiz ID: " + quiz.getQuizId());

        for (int i = 0; i < createdQuestionsList.size(); i++) {
            QuestionVO q = createdQuestionsList.get(i);
            System.out.println("Question " + (i+1) + ": Type=" + q.getQuestionType() + ", Text=" + q.getQuestionText());
            List<ChoiceVO> choices = choiceDAO.selectChoicesByQuestionId(q.getQuestionId());
            System.out.println("  Choices: " + choices.size());
            for (ChoiceVO c : choices) {
                System.out.println("    - " + c.getChoiceText() + " (Correct: " + c.getIsCorrect() + ")");
            }
        }

        generatedQuiz.setArtwork(artwork);
        return generatedQuiz;
    }

    // 작품 정보에서 문제 유형별로 문제 생성
    private QuestionVO createQuestion(ArtworkVO artwork, String questionType, int orderNum, int quizId) {
        QuestionVO question = new QuestionVO();
        question.setQuizId(quizId);
        question.setQuestionType(questionType);
        question.setOrderNum(orderNum);
        
        String correctAnswer = "";
        String questionText = "";
        
        switch (questionType) {
            case "DATE_DISPLAY":
                correctAnswer = artwork.getDateDisplay();
                if (correctAnswer == null || correctAnswer.isEmpty()) {
                    correctAnswer = "Unknown";
                }
                questionText = "\"" + artwork.getTitle() + "\"은(는) 언제 제작되었나요?";
                break;

            case "TERM_TITLES":
                // 작품의 태그/키워드에서 첫 번째 태그 선택
                String termTitles = artwork.getTermTitles();
                System.out.println("TERM_TITLES value: " + termTitles);
                
                if (termTitles != null && !termTitles.isEmpty()) {
                    try {
                        // JSON 배열 형식인지 확인 (첫 번째 시도)
                        if (termTitles.trim().startsWith("[")) {
                            JSONArray jsonArray = new JSONArray(termTitles);
                            if (jsonArray.length() > 0) {
                                correctAnswer = jsonArray.getString(0);
                                questionText = "이 작품에 해당하는 분류나 기술적 태그로 적절하지 않은 것은?";
                                System.out.println("Parsed as JSON array. First tag: " + correctAnswer);
                            }
                        } else {
                            // 쉼표로 구분된 문자열로 처리 (두 번째 시도)
                            String[] terms = termTitles.split(",");
                            if (terms.length > 0) {
                                correctAnswer = terms[0].trim().replace("\"", "");
                                questionText = "이 작품에 해당하는 분류나 기술적 태그로 적절하지 않은 것은?";
                                System.out.println("Parsed as comma-separated string. First tag: " + correctAnswer);
                            }
                        }
                    } catch (Exception e) {
                        System.out.println("Error parsing TERM_TITLES: " + e.getMessage());
                        // 파싱 실패 시 기본값 설정
                        correctAnswer = "Art";
                        questionText = "이 작품에 해당하는 분류나 기술적 태그로 적절하지 않은 것은?";
                    }
                } else {
                    // 태그가 없는 경우 기본값
                    correctAnswer = "Art";
                    questionText = "이 작품에 해당하는 분류나 기술적 태그로 적절하지 않은 것은?";
                }
                break;
                
            case "STYLE_TITLE":
                correctAnswer = artwork.getStyleTitle();
                if (correctAnswer == null || correctAnswer.isEmpty()) {
                    // 스타일 정보가 없는 경우, 작가와 제작 시기로 추측
                    String artist = artwork.getArtist();
                    if (artist.contains("Picasso")) {
                        correctAnswer = "Cubism";
                    } else if (artist.contains("van Gogh")) {
                        correctAnswer = "Post-Impressionism";
                    } else if (artist.contains("Chagall")) {
                        correctAnswer = "Surrealism";
                    } else {
                        // 기본값
                        correctAnswer = "Modernism";
                    }
                }
                questionText = "이 작품이 속한 미술 사조는 무엇인가요?";
                break;
                
            case "TECHNIQUE_TITLES":
                String techniqueTitles = artwork.getTechniqueTitles();
                System.out.println("TECHNIQUE_TITLES value: " + techniqueTitles);
                
                if (techniqueTitles != null && !techniqueTitles.isEmpty()) {
                    try {
                        // JSON 배열 형식인지 확인
                        if (techniqueTitles.trim().startsWith("[")) {
                            JSONArray jsonArray = new JSONArray(techniqueTitles);
                            if (jsonArray.length() > 0) {
                                correctAnswer = jsonArray.getString(0);
                                System.out.println("Parsed as JSON array. First technique: " + correctAnswer);
                            } else {
                                correctAnswer = "Oil on canvas";
                                System.out.println("Empty JSON array, using default technique");
                            }
                        } else {
                            // 쉼표로 구분된 문자열로 처리
                            String[] techniques = techniqueTitles.split(",");
                            if (techniques.length > 0) {
                                correctAnswer = techniques[0].trim().replace("\"", "");
                                System.out.println("Parsed as comma-separated string. First technique: " + correctAnswer);
                            } else {
                                correctAnswer = "Oil on canvas";
                                System.out.println("Empty comma-separated string, using default technique");
                            }
                        }
                    } catch (Exception e) {
                        System.out.println("Error parsing TECHNIQUE_TITLES: " + e.getMessage());
                        e.printStackTrace();
                        // 파싱 실패 시 기본값 설정
                        correctAnswer = "Oil on canvas";
                        System.out.println("Exception occurred, using default technique: " + correctAnswer);
                    }
                } else {
                    // 기법 정보가 없는 경우 기본값
                    correctAnswer = "Oil on canvas";
                    System.out.println("No TECHNIQUE_TITLES, using default technique: " + correctAnswer);
                }
                questionText = "\"" + artwork.getTitle() + "\"의 제작에 사용된 기법/재료는 무엇인가요?";
                break;
                
            default:
                return null; // 지원하지 않는 유형
        }
        
        // 문제와 정답이 모두 있는 경우에만 반환
        if (!correctAnswer.isEmpty() && !questionText.isEmpty()) {
            question.setCorrectAnswer(correctAnswer);
            question.setQuestionText(questionText);
            return question;
        }
        
        return null;
    }
    
    // 문제와 작품 정보를 기반으로 4지선다 선택지 생성 (다른 작품에서 데이터 가져오기)
 // createChoicesForQuestion 메소드 수정 부분
    private boolean createChoicesForQuestion(QuestionVO question, ArtworkVO artwork, List<ArtworkVO> otherArtworks) {
        String correctAnswer = question.getCorrectAnswer();
        List<String> options = new ArrayList<>();
        
        // TERM_TITLES 문제는 오답이 정답이 되도록 처리
        boolean isTermTitlesQuestion = "TERM_TITLES".equals(question.getQuestionType());
        
        // 문제 유형에 따라 다른 작품에서 데이터 추출
        switch (question.getQuestionType()) {
            case "DATE_DISPLAY":
                // 정답 추가
                options.add(correctAnswer);
                
                // 다른 작품의 제작 연도 활용 (3개의 오답)
                addRandomOptions(options, otherArtworks, "DATE_DISPLAY", correctAnswer, 3);
                break;
                
            case "TERM_TITLES":
                // TERM_TITLES 문제는 반대로 작동 - 3개의 정답과 1개의 오답
                try {
                    String termTitles = artwork.getTermTitles();
                    List<String> terms = new ArrayList<>();
                    
                    // JSON 배열 또는 쉼표로 구분된 문자열 처리
                    if (termTitles != null && !termTitles.isEmpty()) {
                        if (termTitles.trim().startsWith("[")) {
                            // JSON 배열 형식
                            JSONArray jsonArray = new JSONArray(termTitles);
                            for (int i = 0; i < jsonArray.length() && i < 3; i++) {
                                terms.add(jsonArray.getString(i));
                            }
                        } else {
                            // 쉼표로 구분된 문자열
                            String[] termArray = termTitles.split(",");
                            for (int i = 0; i < termArray.length && i < 3; i++) {
                                terms.add(termArray[i].trim().replace("\"", ""));
                            }
                        }
                    }
                    
                    // 작품의 실제 태그 추가 (정답 보기)
                    for (String term : terms) {
                        options.add(term);
                    }
                    
                    // 부족한 경우 기본 정답 추가
                    while (options.size() < 3) {
                        if (!options.contains("paint")) options.add("paint");
                        else if (!options.contains("canvas")) options.add("canvas");
                        else if (!options.contains("oil on canvas")) options.add("oil on canvas");
                        else options.add("artwork");
                    }
                    
                    // 오답 추가 (적절하지 않은 태그) - 이것이 이 문제의 "정답"이 됨
                    options.add("3D modeling"); // 명확한 오답
                    
                    // 문제의 정답을 오답으로 설정 (사용자가 선택해야 하는 것)
                    correctAnswer = "3D modeling";
                    question.setCorrectAnswer(correctAnswer);
                    
                } catch (Exception e) {
                    System.out.println("Error in TERM_TITLES choices: " + e.getMessage());
                    // 파싱 오류 시 기본 보기 설정
                    options.add("paint");
                    options.add("canvas");
                    options.add("oil on canvas");
                    options.add("3D modeling"); // 오답
                    
                    correctAnswer = "3D modeling";
                    question.setCorrectAnswer(correctAnswer);
                }
                break;
                
            case "STYLE_TITLE":
                // 정답 추가
                options.add(correctAnswer);
                
                // 다른 스타일 3개 추가 (대표적인 사조들)
                List<String> styles = Arrays.asList(
                    "Post-Impressionism", "Cubism", "Surrealism", "Baroque", 
                    "Impressionism", "Expressionism", "Renaissance", "Abstract Expressionism");
                
                for (String style : styles) {
                    if (!style.equals(correctAnswer) && options.size() < 4) {
                        options.add(style);
                    }
                }
                break;
                
            case "TECHNIQUE_TITLES":
                // 정답 추가
                options.add(correctAnswer);
                
                // 다른 작품의 기법 활용 (3개의 오답)
                addRandomOptions(options, otherArtworks, "TECHNIQUE_TITLES", correctAnswer, 3);
                break;
        }
        
        // 선택지 개수가 부족한 경우 기본 옵션 추가
        while (options.size() < 4) {
            switch (question.getQuestionType()) {
                case "DATE_DISPLAY":
                    addDefaultDateOption(options, correctAnswer);
                    break;
                case "STYLE_TITLE":
                    if (!options.contains("Impressionism")) options.add("Impressionism");
                    else if (!options.contains("Cubism")) options.add("Cubism");
                    else if (!options.contains("Surrealism")) options.add("Surrealism");
                    else options.add("Abstract Art");
                    break;
                case "TECHNIQUE_TITLES":
                    if (!options.contains("Oil on canvas")) options.add("Oil on canvas");
                    else if (!options.contains("Watercolor")) options.add("Watercolor");
                    else if (!options.contains("Acrylic")) options.add("Acrylic");
                    else options.add("Mixed media");
                    break;
                default:
                    options.add("Option " + options.size());
            }
        }
        
        // TERM_TITLES 문제를 제외하고는 순서 섞기
        if (!isTermTitlesQuestion) {
            Collections.shuffle(options);
        }
        
        // 선택지 삽입
        boolean success = true;
        try {
            for (int i = 0; i < options.size(); i++) {
                String option = options.get(i);
                String isCorrect = option.equals(correctAnswer) ? "Y" : "N";
                
                ChoiceVO choice = new ChoiceVO();
                choice.setQuestionId(question.getQuestionId());
                choice.setChoiceText(option);
                choice.setIsCorrect(isCorrect);
                choice.setOrderNum(i + 1);
                
                choiceDAO.insertChoice(choice);
            }
        } catch (Exception e) {
            System.out.println("Error creating choices: " + e.getMessage());
            e.printStackTrace();
            success = false;
        }
        
        return success;
    }
    
    // 랜덤 옵션 추가 헬퍼 메소드
    private void addRandomOptions(List<String> options, List<ArtworkVO> artworks, 
                                 String type, String correctAnswer, int count) {
        // 이미 사용된 옵션들
        Set<String> usedOptions = new HashSet<>(options);
        
        // 사용 가능한 옵션 수집
        List<String> availableOptions = new ArrayList<>();
        for (ArtworkVO art : artworks) {
            String value = "";
            switch (type) {
                case "DATE_DISPLAY":
                    value = art.getDateDisplay();
                    break;
                case "TECHNIQUE_TITLES":
                    String techniqueData = art.getTechniqueTitles();
                    // JSON 배열 또는 쉼표로 구분된 문자열 처리
                    if (techniqueData != null && !techniqueData.isEmpty()) {
                        try {
                            if (techniqueData.trim().startsWith("[")) {
                                JSONArray jsonArray = new JSONArray(techniqueData);
                                if (jsonArray.length() > 0) {
                                    value = jsonArray.getString(0);
                                }
                            } else {
                                String[] techniques = techniqueData.split(",");
                                if (techniques.length > 0) {
                                    value = techniques[0].trim().replace("\"", "");
                                }
                            }
                        } catch (Exception e) {
                            System.out.println("Error parsing technique in addRandomOptions: " + e.getMessage());
                            // 오류 발생 시 이 작품의 기법은 무시
                            continue;
                        }
                    }
                    break;
            }
            
            if (value != null && !value.isEmpty() && !value.equals(correctAnswer) 
                    && !usedOptions.contains(value)) {
                availableOptions.add(value);
                usedOptions.add(value); // 중복 방지
            }
        }
        
        // 랜덤 선택
        Collections.shuffle(availableOptions);
        int added = 0;
        for (int i = 0; i < availableOptions.size() && added < count; i++) {
            options.add(availableOptions.get(i));
            added++;
        }
        
        // 옵션이 부족한 경우 추가 기본 옵션 사용
        String[] defaultOptions = null;
        if (type.equals("TECHNIQUE_TITLES")) {
            defaultOptions = new String[]{"Watercolor", "Acrylic paint", "Mixed media", "Charcoal", "Pastel"};
        } else if (type.equals("DATE_DISPLAY")) {
            defaultOptions = new String[]{"1800-1810", "1850-1860", "1900-1910", "1950-1960", "2000-2010"};
        }
        
        if (defaultOptions != null && added < count) {
            for (String option : defaultOptions) {
                if (added >= count) break;
                if (!options.contains(option) && !option.equals(correctAnswer)) {
                    options.add(option);
                    added++;
                }
            }
        }
    }
    
    // 기본 날짜 옵션 추가
    private void addDefaultDateOption(List<String> options, String correctAnswer) {
        // 정답에서 숫자 추출
        String yearStr = correctAnswer.replaceAll("[^0-9]", "");
        int year;
        try {
            year = Integer.parseInt(yearStr);
        } catch (NumberFormatException e) {
            year = 1900; // 기본값
        }
        
        // 비슷한 연도 생성
        Set<String> usedOptions = new HashSet<>(options);
        String wrongYear;
        do {
            int offset = random.nextInt(30) - 15; // -15 ~ +15 범위의 랜덤 오프셋
            wrongYear = String.valueOf(year + offset);
        } while (usedOptions.contains(wrongYear) || wrongYear.equals(String.valueOf(year)));
        
        options.add(wrongYear);
    }

    @Override
    public QuizVO getQuizById(int quizId) {
        QuizVO quiz = quizDAO.selectQuizById(quizId);
        if (quiz != null) {
            // 작품 정보 조회
            ArtworkVO artwork = artworkDAO.selectArtworkById(quiz.getArtworkId());
            quiz.setArtwork(artwork);
            
            // 문제 목록 조회
            List<QuestionVO> questions = questionDAO.selectQuestionsByQuizId(quizId);
            for (QuestionVO question : questions) {
                // 선택지 목록 조회
                List<ChoiceVO> choices = choiceDAO.selectChoicesByQuestionId(question.getQuestionId());
                question.setChoices(choices);
            }
        }
        return quiz;
    }

    @Override
    public QuizVO getQuizByArtworkId(int artworkId) {
        QuizVO quiz = quizDAO.selectQuizByArtworkId(artworkId);
        if (quiz != null) {
            return getQuizById(quiz.getQuizId());
        }
        return null;
    }

    @Override
    public List<QuizVO> getAllQuizzes() {
        List<QuizVO> quizzes = quizDAO.selectAllQuizzes();
        for (QuizVO quiz : quizzes) {
            // 작품 정보 조회
            ArtworkVO artwork = artworkDAO.selectArtworkById(quiz.getArtworkId());
            quiz.setArtwork(artwork);
        }
        return quizzes;
    }

    @Override
    public List<QuestionVO> getQuestionsByQuizId(int quizId) {
        return questionDAO.selectQuestionsByQuizId(quizId);
    }

    @Override
    public List<ChoiceVO> getChoicesByQuestionId(int questionId) {
        return choiceDAO.selectChoicesByQuestionId(questionId);
    }

    @Override
    @Transactional
    public boolean deleteQuiz(int quizId) {
        try {
            // 선택지, 문제, 퀴즈 순으로 삭제
            choiceDAO.deleteChoicesByQuizId(quizId);
            questionDAO.deleteQuestionsByQuizId(quizId);
            quizDAO.deleteQuiz(quizId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}