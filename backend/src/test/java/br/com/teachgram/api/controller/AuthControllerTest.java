package br.com.teachgram.api.controller;

import br.com.teachgram.api.TestsBase;
import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.UserSeeder;
import br.com.teachgram.api.domain.user.dto.LoginRequestDTO;
import br.com.teachgram.api.domain.user.dto.RefreshTokenRequestDTO;
import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import br.com.teachgram.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

class AuthControllerTest extends TestsBase {

    private final JacksonTester<RefreshTokenRequestDTO> refreshTokenRequestDTO;
    private final JacksonTester<SignupRequestDTO> signupRequestDTO;

    @Autowired
    public AuthControllerTest(
            MockMvc mockMvc,
            JacksonTester<LoginRequestDTO> jsonLoginRequestDTO,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UserSeeder userSeeder,

            JacksonTester<RefreshTokenRequestDTO> refreshTokenRequestDTO,
            JacksonTester<SignupRequestDTO> signupRequestDTO
    ) {
        super(mockMvc, jsonLoginRequestDTO, userRepository, passwordEncoder, userSeeder);

        this.refreshTokenRequestDTO = refreshTokenRequestDTO;
        this.signupRequestDTO = signupRequestDTO;
    }

    @AfterEach
    void tearDown() {
        super.userRepository.deleteAll();
        super.userSeeder.seed();
    }

    private MockHttpServletResponse getResponse(String jsonContent) throws Exception {
        return mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();
    }

    private User createDeletedUser() {
        var user = new User();

        user.setName("deleted");
        user.setEmail("deleted@deleted");
        user.setPhone("deleted");
        user.setBio("deleted");
        user.setPassword(super.passwordEncoder.encode("deleted"));

        super.userRepository.save(user);

        user.setDeleted(true);

        return user;
    }

    private String getJsonContent(String mail, String password, String name, String phone, String bio) throws IOException {
        return signupRequestDTO.write(
                new SignupRequestDTO(
                        name,
                        mail,
                        password,
                        bio,
                        phone,
                        "test"
                )
        ).getJson();
    }


    @Test
    @DisplayName("Wake up test")
    void wakeUp() throws Exception {
        // Just for cleaning the time from the first test
        System.out.println("-----AuthControllerTest: wakeUp-----");
    }

    @Test
    @DisplayName("Must return 200 when login with valid credentials")
    void login1() throws Exception {
        var jsonContent = super.jsonLoginRequestDTO.write(
                new LoginRequestDTO(
                        "seed@seed",
                        "seed"
                )
        ).getJson();

        var response = getResponse(jsonContent);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    @DisplayName("Must return 401 when login with invalid credentials")
    void login2() throws Exception {
        var jsonContent = super.jsonLoginRequestDTO.write(
                new LoginRequestDTO(
                        "seed@seed",
                        "wrong_password"
                )
        ).getJson();

        MockHttpServletResponse response = getResponse(jsonContent);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("Must return 400 when login with invalid email")
    void login3() throws Exception {

        var jsonContent = super.jsonLoginRequestDTO.write(
                new LoginRequestDTO(
                        "",
                        "wrong_password"
                )
        ).getJson();

        MockHttpServletResponse response = getResponse(jsonContent);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Must return 400 when login with invalid password")
    void login4() throws Exception {

        var jsonContent = super.jsonLoginRequestDTO.write(
                new LoginRequestDTO(
                        "seed@seed",
                        ""
                )
        ).getJson();

        MockHttpServletResponse response = getResponse(jsonContent);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Must return 404 when login with non-existent email")
    void login5() throws Exception {

        var jsonContent = super.jsonLoginRequestDTO.write(
                new LoginRequestDTO(
                        "non_existent_email@seed",
                        "seed"
                )
        ).getJson();

        MockHttpServletResponse response = getResponse(jsonContent);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @Transactional
    @DisplayName("Must return 403 when login with inactive account")
    void login6() throws Exception {

        super.userRepository.save(createDeletedUser());

        var jsonContent = super.jsonLoginRequestDTO.write(
                new LoginRequestDTO(
                        "deleted@deleted",
                        "deleted"
                )
        ).getJson();

        MockHttpServletResponse response = getResponse(jsonContent);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("Must return 200 when refresh token with valid refresh token")
    void refreshToken1() throws Exception {
        var jsonContent = refreshTokenRequestDTO.write(
                new RefreshTokenRequestDTO(
                        "Bearer " + super.login("seed@seed", "seed").refresh_token()
                )
        ).getJson();

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    @DisplayName("Must return 401 when refresh token with invalid refresh token")
    void refreshToken2() throws Exception {
        var jsonContent = refreshTokenRequestDTO.write(
                new RefreshTokenRequestDTO(
                        "Bearer " + super.login("seed@seed", "seed").refresh_token() + "invalid"
                )
        ).getJson();

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("Must return 201 when signup with valid credentials")
    public void signup1() throws Exception {

        var jsonContent = getJsonContent("test@test", "test", "test", "test", "test");

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.CREATED.value());
    }

    @Test
    @DisplayName("Must return 400 when signup with invalid email")
    public void signup2() throws Exception {

        var jsonContent = getJsonContent("test", "test", "test", "test", "test");

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Must return 400 when signup with invalid password")
    public void signup3() throws Exception {

        var jsonContent = getJsonContent("test@test", "", "test", "test", "test");

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Must return 400 when signup with invalid name")
    public void signup4() throws Exception {

        var jsonContent = getJsonContent("test@test.com", "test", "", "test", "test");

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Must return 400 when signup with invalid bio")
    public void signup5() throws Exception {

        var jsonContent = getJsonContent("test@test", "test", "test", "test", "");

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Must return 409 when signup with already registered email")
    public void signup6() throws Exception {

        var jsonContent = getJsonContent("seed@seed", "test", "test", "test", "test");

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
    }

    @Test
    @DisplayName("Must return 409 when signup with already registered phone")
    public void signup7() throws Exception {

        var jsonContent = getJsonContent("test@test", "test", "test", "seed", "test");

        MockHttpServletResponse response = mockMvc.perform(
                post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
    }

}