package br.com.teachgram.api.domain.post;

import br.com.teachgram.api.domain.post.dto.CreatePostRequestDTO;
import br.com.teachgram.api.domain.post.dto.UpdatePostRequestDTO;
import br.com.teachgram.api.domain.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false, unique = true)
    @Size(max = 36)
    private String id;

    private Boolean deleted = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "private")
    private Boolean privatePost = false;

    @Size(max = 50)
    private String title;

    @Size(max = 200)
    private String description;

    private String photoLink;

    private String videoLink;

    private Integer likes = 0;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    public Post(CreatePostRequestDTO dto, User user) {
        this.title = dto.title();
        this.description = dto.description();
        this.photoLink = dto.photoLink();
        this.videoLink = dto.videoLink();
        this.user = user;
    }

    public void update(UpdatePostRequestDTO dto) {
        if (dto.title() != null) {
            this.title = dto.title();
        }

        if (dto.description() != null) {
            this.description = dto.description();
        }

        if (dto.photoLink() != null) {
            this.photoLink = dto.photoLink();
        }

        if (dto.videoLink() != null) {
            this.videoLink = dto.videoLink();
        }

        this.updatedAt = LocalDateTime.now();
    }

    public void setLikes(Integer likes) {
        if (likes < 0) {
            this.likes = 0;
        } else {
            this.likes = likes;
        }
    }
}
