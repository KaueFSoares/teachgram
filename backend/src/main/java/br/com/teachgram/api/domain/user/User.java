package br.com.teachgram.api.domain.user;

import br.com.teachgram.api.domain.friendship.Friendship;
import br.com.teachgram.api.domain.post.Post;
import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import br.com.teachgram.api.domain.user.dto.UpdateRequestDTO;
import br.com.teachgram.api.infra.constant.VAR;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Table(name = "users")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false, unique = true)
    @Size(max = 36)
    private String id;

    private Boolean deleted = false;

    private LocalDateTime createdAt = LocalDateTime.now(ZoneId.of(VAR.OFFSET));

    private LocalDateTime updatedAt = LocalDateTime.now(ZoneId.of(VAR.OFFSET));

    private String name;

    private String email;

    private String username;

    private String phone;

    private String bio;

    private String password;

    @Size(max = 2000)
    private String photo;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(mappedBy = "firstUser", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Friendship> friends = new ArrayList<>();

    public User(SignupRequestDTO dto) {
        this.name = dto.name();
        this.email = dto.email();
        this.username = dto.username();
        this.bio = dto.bio();
        this.phone = dto.phone();
        this.photo = dto.photo();
    }

    public User(String id, String email, String password, Boolean deleted) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.deleted = deleted;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Set.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !deleted;
    }

    public void update(UpdateRequestDTO dto) {

        if (dto.email() != null && !dto.email().isEmpty()) {
            this.email = dto.email();
        }

        if (dto.name() != null && !dto.name().isEmpty()) {
            this.name = dto.name();
        }

        if (dto.username() != null && !dto.username().isEmpty()) {
            this.username = dto.username();
        }

        if (dto.bio() != null && !dto.bio().isEmpty()) {
            this.bio = dto.bio();
        }

        if (dto.phone() != null && !dto.phone().isEmpty()) {
            this.phone = dto.phone();
        }

        if (dto.photo() != null && !dto.photo().isEmpty()) {
            this.photo = dto.photo();
        }

        if (dto.password() != null && !dto.password().isEmpty()) {
            this.password = new BCryptPasswordEncoder().encode(dto.password());
        }

        this.updatedAt = LocalDateTime.now(ZoneId.of(VAR.OFFSET));

    }

    public void addFriend(User user) {
        var friendship = new Friendship();
        friendship.setFirstUser(this);
        friendship.setSecondUser(user);

        this.friends.add(friendship);
    }

    public String getActualUsername(){
        return this.username;
    }
}
