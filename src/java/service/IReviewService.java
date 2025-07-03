package com.art.service;

import java.util.List;
import com.art.vo.ReviewVO;

public interface IReviewService {
    // 틀린 문제 저장
    boolean saveReview(ReviewVO review);
    
    // 사용자별 틀린 문제 목록 조회
    List<ReviewVO> getReviewsByUserId(int userId);
    
    // 문제별 틀린 현황 조회
    List<ReviewVO> getReviewsByQuestionId(int questionId);
    
    // 리뷰 삭제
    boolean deleteReview(int reviewId);
}