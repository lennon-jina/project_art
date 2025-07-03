package com.art.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.art.vo.ArtworkVO;

@Mapper
public interface IArtworkDAO {
    int insertArtwork(ArtworkVO artwork);
    int updateArtwork(ArtworkVO artwork);
    ArtworkVO selectArtworkByApiId(@Param("apiId") String apiId);
    ArtworkVO selectArtworkById(@Param("artworkId") int artworkId);
    List<ArtworkVO> selectAllArtworks();
    List<ArtworkVO> selectArtworksByApiIds(@Param("apiIds") List<String> apiIds);
    List<ArtworkVO> getAllArtworks();
    
    // ✅ 별칭 추가로 사용할 수도 있음 (선택)
    default ArtworkVO selectByApiId(String apiId) {
        return selectArtworkByApiId(apiId);
    }
}