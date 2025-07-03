package com.art.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.art.vo.ReviewVO;

@Mapper
public interface IReviewDAO {
    // 복습 항목 생성
    int insertReview(ReviewVO review);
    
    // 복습 항목 조회
    ReviewVO selectReviewById(@Param("reviewId") int reviewId);
    
    // 사용자 ID로 복습 항목 목록 조회
    List<ReviewVO> selectReviewsByUserId(@Param("userId") int userId);
    
    // 문제 ID로 복습 항목 목록 조회
    List<ReviewVO> selectReviewsByQuestionId(@Param("questionId") int questionId);
    
    // 복습 항목 삭제
    int deleteReview(@Param("reviewId") int reviewId);
    
    // 사용자 ID와 문제 ID로 복습 항목 조회 (이미 틀린 문제인지 확인용)
    ReviewVO selectReviewByUserIdAndQuestionId(@Param("userId") int userId, @Param("questionId") int questionId);
}