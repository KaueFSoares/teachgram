package br.com.teachgram.api.service;

import br.com.teachgram.api.infra.constant.MESSAGE;
import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.*;
import br.com.teachgram.api.domain.user.validation.UserDataValidationService;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.infra.exception.NotFoundException;
import br.com.teachgram.api.repository.FriendshipRepository;
import br.com.teachgram.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final FriendshipRepository friendshipRepository;
    private final UserDataValidationService userDataValidationService;
    private final MessageService messageService;

    @Autowired
    public UserService(
            UserRepository userRepository,
            UserDataValidationService userDataValidationService,
            MessageService messageService,
            FriendshipRepository friendshipRepository
    ) {
        this.userRepository = userRepository;
        this.userDataValidationService = userDataValidationService;
        this.messageService = messageService;
        this.friendshipRepository = friendshipRepository;
    }

    private User getAuthenticatedUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(auth.getName()).orElseThrow(() -> new AuthException(messageService.getMessage(MESSAGE.USER_UNAUTHORIZED)));
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

        return new DeleteResponseDTO(messageService.getMessage(MESSAGE.DELETED_USER));
    }

    public UserDetailsDTO details() {
        var user = getAuthenticatedUser();

        return new UserDetailsDTO(user);
    }

    public FriendDetailsDTO addFriend(String id) {

        var user = getAuthenticatedUser();

        var friend = userRepository.findFriendById(id).orElseThrow(() -> new NotFoundException(messageService.getMessage(MESSAGE.USER_FRIEND_NOT_FOUND)));

        user.addFriend(friend);

        var friendsCount = userRepository.countFriendsForUser(friend.getId());

        return new FriendDetailsDTO(friend, friendsCount);
    }

    public Page<FriendShortDetailsDTO> getManyFriends(Pageable pageable) {
        var user = getAuthenticatedUser();

        return friendshipRepository.getAllByFirstUserId(user.getId(), pageable).map(f -> new FriendShortDetailsDTO(f.getSecondUser()));
    }

    public FriendDetailsDTO getSingleFriend(String username) {
        var user = getAuthenticatedUser();

        var friendship = friendshipRepository.findByFirstUserIdAndSecondUserUsername(user.getId(), username).orElseThrow(() -> new NotFoundException(messageService.getMessage(MESSAGE.USER_FRIEND_NOT_FOUND)));

        var friendsCount = userRepository.countFriendsForUser(friendship.getSecondUser().getId());

        return new FriendDetailsDTO(friendship.getSecondUser(), friendsCount);
    }

    public DeleteResponseDTO deleteFriend(String id) {
        var user = getAuthenticatedUser();

        var friendship = friendshipRepository.findByFirstUserIdAndSecondUserId(user.getId(), id).orElseThrow(() -> new NotFoundException(messageService.getMessage(MESSAGE.USER_FRIEND_NOT_FOUND)));

        user.removeFriend(friendship.getSecondUser());

        return new DeleteResponseDTO(messageService.getMessage(MESSAGE.DELETED_FRIEND));
    }
}
