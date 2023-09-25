package br.com.teachgram.api.domain.friendship;

import br.com.teachgram.api.domain.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "friends")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Size(max = 36)
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "first_user_id")
    private User firstUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "second_user_id")
    private User secondUser;

}
