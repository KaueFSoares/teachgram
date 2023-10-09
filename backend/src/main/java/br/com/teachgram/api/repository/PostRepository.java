package br.com.teachgram.api.repository;

import br.com.teachgram.api.domain.post.Post;
import br.com.teachgram.api.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, String> {

    @Query("select p from Post p where p.user = ?1 and p.deleted = false")
    Page<Post> findAllByUserAndDeletedFalse(User user, Pageable pageable);

    @Query("select p from Post p where p.id = :id and p.deleted = false")
    Post findByIdAndDeletedFalse(String id);

    @Query("select p from Post p where p.deleted = false order by p.createdAt desc")
    Page<Post> getAllPostsByTimeDescWithoutOwnPosts(Pageable pageable);

    @Query("select count(p) from Post p where p.deleted = false and p.user.id = :id")
    Long countPostsForUser(String id);
}
