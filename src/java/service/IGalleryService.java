package com.art.service;

import java.util.List;

import com.art.vo.GalleryVO;

public interface IGalleryService {
	// DB or API 이미지 조회용
    List<GalleryVO> getAllImages();  
    
    List<String> getDistinctAuthors();
}