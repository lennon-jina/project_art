package com.art.dao;

import com.art.vo.UserResponseVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface IUserResponseDAO {
    int insertUserResponse(UserResponseVO userResponse);
    UserResponseVO selectUserResponseById(@Param("id") int id);
    List<UserResponseVO> selectUserResponsesByQuizQuestId(@Param("quizQuestId") int quizQuestId);
    List<UserResponseVO> selectUserResponsesByArtworkId(@Param("artworkId") int artworkId);
}