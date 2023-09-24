package br.com.teachgram.api.domain.post.dto;

import br.com.teachgram.api.domain.post.Post;

public record ShortUserPostDetailsDTO(
        String id,
        String photoLink
) {
    public ShortUserPostDetailsDTO(Post post) {
        this(
                post.getId(),
                post.getPhotoLink()
        );
    }
}
