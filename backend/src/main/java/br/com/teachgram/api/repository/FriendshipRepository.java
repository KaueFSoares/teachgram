package br.com.teachgram.api.repository;

import br.com.teachgram.api.domain.friendship.Friendship;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, String> {

    Page<Friendship> getAllByFirstUserId(String id, Pageable pageable);

    Optional<Friendship> findByFirstUserIdAndSecondUserUsername(String id, String username);

    Optional<Friendship> findByFirstUserIdAndSecondUserId(String id, String id1);
}
