package com.art.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.art.vo.QuestionVO;

@Mapper
public interface IQuestionDAO {
    // 문제 생성
    int insertQuestion(QuestionVO question);
    
    // 문제 조회
    QuestionVO selectQuestionById(@Param("questionId") int questionId);
    
    // 퀴즈 ID로 문제 목록 조회
    List<QuestionVO> selectQuestionsByQuizId(@Param("quizId") int quizId);
    
    // 문제 업데이트
    int updateQuestion(QuestionVO question);
    
    // 문제 삭제
    int deleteQuestion(@Param("questionId") int questionId);
    
    // 퀴즈 ID로 모든 문제 삭제
    int deleteQuestionsByQuizId(@Param("quizId") int quizId);
}