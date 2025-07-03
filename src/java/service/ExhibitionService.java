package com.art.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.dao.ExhibitionDAO;
import com.art.vo.ExhibitionVO;

@Service
public class ExhibitionService {

    @Autowired
    private ExhibitionDAO exhibitionDAO;

    private final int PAGE_SIZE = 10;

    // 전시회 목록 조회
    public List<ExhibitionVO> getExhibitionList(int page) {
        int offset = (page - 1) * PAGE_SIZE;
        return exhibitionDAO.getExhibitionList(offset, PAGE_SIZE);
    }

    // 전시회 상세정보 조회
    public ExhibitionVO getExhibitionDetail(String exhibitionId) {
        return exhibitionDAO.getExhibitionDetail(exhibitionId);
    }

    // 전시회 총 개수 조회
    public int getTotalExhibitionCount() {
        return exhibitionDAO.getTotalExhibitionCount();
    }

    // 전시회 검색
    public List<ExhibitionVO> searchExhibitions(String keyword) {
        return exhibitionDAO.searchExhibitions(keyword);
    }

    // 현재 진행 중인 전시회 조회
    public List<ExhibitionVO> getCurrentExhibitions() {
        return exhibitionDAO.getCurrentExhibitions();
    }

    // 예정된 전시회 조회
    public List<ExhibitionVO> getUpcomingExhibitions() {
        return exhibitionDAO.getUpcomingExhibitions();
    }
    
    // 종료된 전시회 조회
    public List<ExhibitionVO> getEndedExhibitions() {
        return exhibitionDAO.getEndedExhibitions();
    }
}