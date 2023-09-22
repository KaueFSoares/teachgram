package br.com.teachgram.api.domain.user;

import br.com.teachgram.api.domain.post.Post;
import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import br.com.teachgram.api.domain.user.dto.UpdateRequestDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

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

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    private String name;

    private String email;

    private String phone;

    private String bio;

    private String password;

    @Size(max = 2000)
    private String photo;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Post> posts = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id"))
    private Set<User> friends = new HashSet<>();

    public User(SignupRequestDTO dto) {
        this.name = dto.name();
        this.email = dto.email();
        this.bio = dto.bio();
        this.phone = dto.phone();
        this.photo = dto.photo();
    }

    public User(String id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
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
        return true;
    }

    public void update(UpdateRequestDTO dto) {

        if (dto.email() != null) {
            this.email = dto.email();
        }

        if (dto.name() != null) {
            this.name = dto.name();
        }

        if (dto.bio() != null) {
            this.bio = dto.bio();
        }

        if (dto.phone() != null) {
            this.phone = dto.phone();
        }

        if (dto.photo() != null) {
            this.photo = dto.photo();
        }

        if (dto.password() != null) {
            this.password = new BCryptPasswordEncoder().encode(dto.password());
        }

        this.updatedAt = LocalDateTime.now();

    }

    public void addFriend(User user) {
        this.friends.add(user);
    }
}
