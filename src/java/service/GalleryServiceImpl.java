package com.art.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.dao.IGalleryDAO;
import com.art.vo.GalleryVO;

@Service
public class GalleryServiceImpl implements IGalleryService {

    @Autowired
    private IGalleryDAO galleryDAO;

    @Override
    public List<GalleryVO> getAllImages() {
        return galleryDAO.selectAllImages(); 
    }
    
    @Override
    public List<String> getDistinctAuthors() {
        return galleryDAO.selectDistinctAuthors();
    }
}