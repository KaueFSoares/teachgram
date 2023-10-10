package br.com.teachgram.api.service;

import br.com.teachgram.api.infra.constant.MESSAGE;
import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.*;
import br.com.teachgram.api.domain.user.validation.UserDataValidationService;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.infra.exception.NotFoundException;
import br.com.teachgram.api.repository.FriendshipRepository;
import br.com.teachgram.api.repository.PostRepository;
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
    private final PostRepository postRepository;
    private final UserDataValidationService userDataValidationService;
    private final MessageService messageService;

    @Autowired
    public UserService(
            UserRepository userRepository,
            UserDataValidationService userDataValidationService,
            MessageService messageService,
            FriendshipRepository friendshipRepository,
            PostRepository postRepository
    ) {
        this.userRepository = userRepository;
        this.userDataValidationService = userDataValidationService;
        this.messageService = messageService;
        this.friendshipRepository = friendshipRepository;
        this.postRepository = postRepository;
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

        var friendsCount = userRepository.countFriendsForUser(user.getId());

        var postsCount = postRepository.countPostsForUser(user.getId());

        return new UserDetailsDTO(user, friendsCount, postsCount);
    }

    public DeleteResponseDTO delete() {

        var user = getAuthenticatedUser();

        user.setDeleted(true);

        return new DeleteResponseDTO(messageService.getMessage(MESSAGE.DELETED_USER));
    }

    public UserDetailsDTO details() {
        var user = getAuthenticatedUser();

        var friendsCount = userRepository.countFriendsForUser(user.getId());

        var postsCount = postRepository.countPostsForUser(user.getId());

        return new UserDetailsDTO(user, friendsCount, postsCount);
    }

    public FriendDetailsDTO addFriend(String id) {

        var user = getAuthenticatedUser();

        var friend = userRepository.findFriendById(id).orElseThrow(() -> new NotFoundException(messageService.getMessage(MESSAGE.USER_FRIEND_NOT_FOUND)));

        user.addFriend(friend);

        var friendsCount = userRepository.countFriendsForUser(friend.getId());

        var postsCount = postRepository.countPostsForUser(friend.getId());

        return new FriendDetailsDTO(friend, friendsCount, postsCount);
    }

    public Page<FriendShortDetailsDTO> getManyFriends(Pageable pageable) {
        var user = getAuthenticatedUser();

        return friendshipRepository.getAllByFirstUserId(user.getId(), pageable).map(f -> new FriendShortDetailsDTO(f.getSecondUser()));
    }

    public FriendDetailsDTO getSingleFriend(String username) {
        var user = getAuthenticatedUser();

        var friendship = friendshipRepository.findByFirstUserIdAndSecondUserUsername(user.getId(), username).orElseThrow(() -> new NotFoundException(messageService.getMessage(MESSAGE.USER_FRIEND_NOT_FOUND)));

        var friendsCount = userRepository.countFriendsForUser(friendship.getSecondUser().getId());

        var postsCount = postRepository.countPostsForUser(friendship.getSecondUser().getId());

        return new FriendDetailsDTO(friendship.getSecondUser(), friendsCount, postsCount);
    }

    public DeleteResponseDTO deleteFriend(String id) {
        var user = getAuthenticatedUser();

        var friendship = friendshipRepository.findByFirstUserIdAndSecondUserId(user.getId(), id).orElseThrow(() -> new NotFoundException(messageService.getMessage(MESSAGE.USER_FRIEND_NOT_FOUND)));

        friendshipRepository.delete(friendship);

        return new DeleteResponseDTO(messageService.getMessage(MESSAGE.DELETED_FRIEND));
    }

    public UserProfileDTO getAnyUser(String username) {
        var user = userRepository.findByUsername(username).orElseThrow(() -> new NotFoundException(messageService.getMessage(MESSAGE.USER_NOT_FOUND)));

        var friendsCount = userRepository.countFriendsForUser(user.getId());

        var postsCount = postRepository.countPostsForUser(user.getId());

        var isFriend = friendshipRepository.existsByFirstUserIdAndSecondUserId(getAuthenticatedUser().getId(), user.getId());

        return new UserProfileDTO(user, friendsCount, postsCount, isFriend);
    }
}
