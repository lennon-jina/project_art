package com.art.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.art.dao.IReviewDAO;
import com.art.vo.ReviewVO;

@Service
public class ReviewServiceImpl implements IReviewService {

    @Autowired
    private IReviewDAO reviewDAO;
    
    @Override
    public boolean saveReview(ReviewVO review) {
        try {
            // 이미 있는 리뷰인지 확인
            ReviewVO existingReview = reviewDAO.selectReviewByUserIdAndQuestionId(
                    review.getUserId(), review.getQuestionId());
            
            if (existingReview != null) {
                // 이미 있으면 무시 (또는 업데이트 로직 추가 가능)
                return true;
            }
            
            // 없으면 새로 추가
            return reviewDAO.insertReview(review) > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ReviewVO> getReviewsByUserId(int userId) {
        return reviewDAO.selectReviewsByUserId(userId);
    }

    @Override
    public List<ReviewVO> getReviewsByQuestionId(int questionId) {
        return reviewDAO.selectReviewsByQuestionId(questionId);
    }

    @Override
    public boolean deleteReview(int reviewId) {
        try {
            return reviewDAO.deleteReview(reviewId) > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}