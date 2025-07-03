package com.art.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.art.vo.ChoiceVO;

@Mapper
public interface IChoiceDAO {
    // 선택지 생성
    int insertChoice(ChoiceVO choice);
    
    // 선택지 조회
    ChoiceVO selectChoiceById(@Param("choiceId") int choiceId);
    
    // 문제 ID로 선택지 목록 조회
    List<ChoiceVO> selectChoicesByQuestionId(@Param("questionId") int questionId);
    
    // 선택지 업데이트
    int updateChoice(ChoiceVO choice);
    
    // 선택지 삭제
    int deleteChoice(@Param("choiceId") int choiceId);
    
    // 문제 ID로 모든 선택지 삭제
    int deleteChoicesByQuestionId(@Param("questionId") int questionId);
    
    // 퀴즈 ID로 모든 선택지 삭제 (연쇄 삭제 용)
    int deleteChoicesByQuizId(@Param("quizId") int quizId);
}