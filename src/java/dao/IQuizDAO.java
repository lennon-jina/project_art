package com.art.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.art.vo.QuizVO;

@Mapper
public interface IQuizDAO {
    // 퀴즈 생성
    int insertQuiz(QuizVO quiz);
    
    // 퀴즈 조회
    QuizVO selectQuizById(@Param("quizId") int quizId);
    
    // 작품 ID로 퀴즈 조회
    QuizVO selectQuizByArtworkId(@Param("artworkId") int artworkId);
    
    // 모든 퀴즈 조회
    List<QuizVO> selectAllQuizzes();
    
    // 퀴즈 업데이트
    int updateQuiz(QuizVO quiz);
    
    // 퀴즈 삭제
    int deleteQuiz(@Param("quizId") int quizId);
}