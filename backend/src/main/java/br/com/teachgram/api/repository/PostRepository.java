package br.com.teachgram.api.repository;

import br.com.teachgram.api.domain.post.Post;
import br.com.teachgram.api.domain.post.dto.ShortUserPostDetailsDTO;
import br.com.teachgram.api.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, String> {

    @Query("select p from Post p where p.user = ?1 and p.deleted = false")
    Page<Post> findAllByUserAndDeletedFalse(User user, Pageable pageable);
}
