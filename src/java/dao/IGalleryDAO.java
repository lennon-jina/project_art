package com.art.dao;

import java.util.List;

import com.art.vo.GalleryVO;

public interface IGalleryDAO {
    List<GalleryVO> selectAllImages();
    
    List<String> selectDistinctAuthors();
}