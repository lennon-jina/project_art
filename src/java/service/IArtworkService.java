package com.art.service;

import java.util.List;
import com.art.vo.ArtworkVO;

public interface IArtworkService {
	
    /**
     * 외부 API에서 작품 정보를 조회하고, DB에 저장하거나 업데이트한다.
     */
    ArtworkVO getArtworkFromAPI(String artworkId);
    
    /**
     * API ID 목록을 기반으로 작품 정보 리스트를 반환한다.
     */
    List<ArtworkVO> getArtworksByIds(List<String> artworkIds);
    
    /**
     * DB에 저장된 모든 작품 정보를 반환한다.
     */
    List<ArtworkVO> getAllArtworks();
    
    /**
     * 내부 DB ID로 작품 정보를 조회한다.
     */
    ArtworkVO getArtworkById(int artworkId);
    
    /**
     * API ID로 작품 정보를 조회한다. 없으면 외부 API에서 가져온다.
     */
    ArtworkVO getArtworkByApiId(String apiId);
    
}