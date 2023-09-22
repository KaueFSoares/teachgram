package br.com.teachgram.api.service;

import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.*;
import br.com.teachgram.api.domain.user.validation.UserDataValidationService;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserDataValidationService userDataValidationService;

    @Autowired
    public UserService(
            UserRepository userRepository,
            UserDataValidationService userDataValidationService
    ) {
        this.userRepository = userRepository;
        this.userDataValidationService = userDataValidationService;
    }

    private User getAuthenticatedUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(auth.getName()).orElseThrow(() -> new AuthException("User not authorized."));
    }

    public UserDetailsDTO update(UpdateRequestDTO dto) {
        var user = getAuthenticatedUser();

        userDataValidationService.validate(dto);

        user.update(dto);

        return new UserDetailsDTO(user);
    }

    public DeleteResponseDTO delete() {
        var user = getAuthenticatedUser();

        user.setDeleted(true);

        return new DeleteResponseDTO("User deleted successfully.");
    }

    public UserDetailsDTO details() {
        var user = getAuthenticatedUser();

        return new UserDetailsDTO(user);
    }

    public FriendDetailsDTO addFriend(String id) {
        var user = getAuthenticatedUser();

        var friend = userRepository.findByIdWithPosts(id).orElseThrow(() -> new AuthException("Friend not found."));

        user.getFriends().add(friend);

        var friendsCount = userRepository.countFriendsForUser(friend.getId());

        return new FriendDetailsDTO(friend, friendsCount);
    }

    public Page<FriendShortDetailsDTO> getManyFriends(Pageable pageable) {
        var user = getAuthenticatedUser();

        return userRepository.getFriends(user.getId(), pageable).map(FriendShortDetailsDTO::new);
    }

    public FriendDetailsDTO getSingleFriend(String id) {
        var user = getAuthenticatedUser();

        var friend = userRepository.findFriend(user.getId(), id).orElseThrow(() -> new AuthException("Friend not found."));

        var friendsCount = userRepository.countFriendsForUser(friend.getId());

        return new FriendDetailsDTO(friend, friendsCount);
    }

    public DeleteResponseDTO deleteFriend(String id) {
        var user = userRepository.findByIdWithPosts(getAuthenticatedUser().getId()).orElseThrow(() -> new AuthException("User not found."));

        var friend = userRepository.findFriend(user.getId(), id).orElseThrow(() -> new AuthException("Friend not found."));

        user.getFriends().remove(friend);

        return new DeleteResponseDTO("Friend deleted successfully.");
    }
}
