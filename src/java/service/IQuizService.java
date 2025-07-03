package com.art.service;

import java.util.List;
import com.art.vo.QuizVO;
import com.art.vo.QuestionVO;
import com.art.vo.ChoiceVO;
public interface IQuizService {
	
    // 작품 ID로 퀴즈 생성 (자동 생성 로직)
    QuizVO generateQuiz(int artworkId);
    
    // 퀴즈 ID로 퀴즈 조회 (문제와 선택지 포함)
    QuizVO getQuizById(int quizId);
    
    // 작품 ID로 퀴즈 조회 (이미 생성된 퀴즈 반환)
    QuizVO getQuizByArtworkId(int artworkId);
    
    // 모든 퀴즈 조회
    List<QuizVO> getAllQuizzes();
    
    // 퀴즈 ID로 문제 목록 조회
    List<QuestionVO> getQuestionsByQuizId(int quizId);
    
    // 문제 ID로 선택지 목록 조회
    List<ChoiceVO> getChoicesByQuestionId(int questionId);
    
    // 퀴즈 삭제 (연관된 문제와 선택지도 함께 삭제)
    boolean deleteQuiz(int quizId);
    
}