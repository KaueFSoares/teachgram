package br.com.teachgram.api.domain.post.dto;

import br.com.teachgram.api.domain.post.Post;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public record PostDetailsDTO(
        String id,
        String title,
        String description,
        String photoLink,
        String videoLink,
        Integer likes,
        Boolean privatePost,
        String userId,
        String username,
        String userPhotoLink,
        Long createdAt
) {
    public PostDetailsDTO(Post post) {
        this(
                post.getId(),
                post.getTitle(),
                post.getDescription(),
                post.getPhotoLink(),
                post.getVideoLink(),
                post.getLikes(),
                post.getPrivatePost(),
                post.getUser().getId(),
                post.getUser().getActualUsername(),
                post.getUser().getPhoto(),
                post.getCreatedAt().toInstant(ZoneOffset.of("-03:00")).toEpochMilli()
        );
    }
}
