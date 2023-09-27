package br.com.teachgram.api.service;

import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.*;
import br.com.teachgram.api.domain.user.validation.UserDataValidationService;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.infra.exception.NotFoundException;
import br.com.teachgram.api.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserDataValidationService userDataValidationService;
    private final MessageService messageService;

    @Autowired
    public UserService(
            UserRepository userRepository,
            UserDataValidationService userDataValidationService,
            MessageService messageService
    ) {
        this.userRepository = userRepository;
        this.userDataValidationService = userDataValidationService;
        this.messageService = messageService;
    }

    private User getAuthenticatedUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(auth.getName()).orElseThrow(() -> new AuthException(messageService.getMessage("error.user.unauthorized")));
    }

    public UserDetailsDTO update(UpdateRequestDTO dto) {
        var user = getAuthenticatedUser();

        var newDTO = dto.withId(user.getId());

        userDataValidationService.validate(newDTO);

        user.update(newDTO);

        return new UserDetailsDTO(user);
    }

    public DeleteResponseDTO delete() {

        var user = getAuthenticatedUser();

        user.setDeleted(true);

        return new DeleteResponseDTO(messageService.getMessage("message.deleted.user"));
    }

    public UserDetailsDTO details() {

        var user = getAuthenticatedUser();

        return new UserDetailsDTO(user);
    }

    public FriendDetailsDTO addFriend(String id) {

        var user = getAuthenticatedUser();

        var friend = userRepository.findFriendById(id).orElseThrow(() -> new NotFoundException(messageService.getMessage("error.user.friend-not-found")));

        user.addFriend(friend);

        var friendsCount = userRepository.countFriendsForUser(friend.getId());

        return new FriendDetailsDTO(friend, friendsCount);
    }

    public Page<FriendShortDetailsDTO> getManyFriends(Pageable pageable) {

        var user = getAuthenticatedUser();

        return userRepository.getFriends(user.getId(), pageable).map(FriendShortDetailsDTO::new);
    }

    public FriendDetailsDTO getSingleFriend(String id) {

        var user = getAuthenticatedUser();

        var friend = userRepository.findFriend(user.getId(), id).orElseThrow(() -> new NotFoundException(messageService.getMessage("error.user.friend-not-found")));

        var friendsCount = userRepository.countFriendsForUser(friend.getId());

        return new FriendDetailsDTO(friend, friendsCount);
    }

    public DeleteResponseDTO deleteFriend(String id) {
        var user = getAuthenticatedUser();

        var friend = userRepository.findFriend(user.getId(), id).orElseThrow(() -> new NotFoundException(messageService.getMessage("error.user.friend-not-found")));

        user.removeFriend(friend);

        return new DeleteResponseDTO(messageService.getMessage("message.deleted.friend"));
    }
}
