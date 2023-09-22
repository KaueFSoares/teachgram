package br.com.teachgram.api.repository;

import br.com.teachgram.api.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, String> {
}
