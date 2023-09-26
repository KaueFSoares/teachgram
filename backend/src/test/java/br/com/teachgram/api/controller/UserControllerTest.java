package br.com.teachgram.api.controller;

import br.com.teachgram.api.TestsBase;
import br.com.teachgram.api.domain.user.UserSeeder;
import br.com.teachgram.api.domain.user.dto.LoginRequestDTO;
import br.com.teachgram.api.domain.user.dto.UpdateRequestDTO;
import br.com.teachgram.api.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

class UserControllerTest extends TestsBase {

    private final JacksonTester<UpdateRequestDTO> updateRequestDTO;

    @Autowired
    public UserControllerTest(
            MockMvc mockMvc,
            JacksonTester<LoginRequestDTO> jsonLoginRequestDTO,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UserSeeder userSeeder,
            JacksonTester<UpdateRequestDTO> updateRequestDTO
    ) {
        super(mockMvc, jsonLoginRequestDTO, userRepository, passwordEncoder, userSeeder);

        this.updateRequestDTO = updateRequestDTO;
    }

    @BeforeEach
    void setUp() {
        super.userSeeder.seed();
    }

    @AfterEach
    void tearDown() {
        super.userRepository.deleteAll();
    }

    private String getJsonContent(String mail, String password, String name, String phone, String bio, String photo) throws IOException {
        return updateRequestDTO.write(
                new UpdateRequestDTO(
                        "",
                        name,
                        mail,
                        password,
                        bio,
                        phone,
                        photo
                )
        ).getJson();
    }

    @Test
    @DisplayName("Wake up test")
    void wakeUp() throws Exception {
        // Just for cleaning the time from the first test
        System.out.println("-----UserControllerTest: wakeUp-----");
    }

    @Test
    @DisplayName("Must return 200 when updating a user with valid data and authenticated")
    void update1() throws Exception {
        var jsonContent = getJsonContent(
                "mail@mail",
                "password",
                "name",
                "phone",
                "bio",
                "photo"
        );

        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                put("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token())
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    @DisplayName("Must return 403 when updating a user with valid data and not authenticated")
    void update2() throws Exception {
        var jsonContent = getJsonContent(
                "mail@mail",
                "password",
                "name",
                "phone",
                "bio",
                "photo"
        );

        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                put("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("Must return 401 when updating a user with valid data and invalid token")
    void update3() throws Exception {
        var jsonContent = getJsonContent(
                "mail@mail",
                "password",
                "name",
                "phone",
                "bio",
                "photo"
        );

        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                put("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token() + "invalid")
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("Must return 400 when updating a user with invalid data")
    void update4() throws Exception {
        var jsonContent = getJsonContent(
                "mail@mail",
                "password",
                "name",
                "phone",
                "bio",
                "photo"
        );

        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                put("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token())
                        .content(jsonContent.replace("mail@mail", "invalid mail"))
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Must return 409 when updating a user with an email already in use")
    void update5() throws Exception {
        var jsonContent = getJsonContent(
                "seed@seed",
                "password",
                "name",
                "phone",
                "bio",
                "photo"
        );

        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                put("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token())
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
    }

    @Test
    @DisplayName("Must return 409 when updating a user with an phone already in use")
    void update6() throws Exception {
        var jsonContent = getJsonContent(
                "mail@mail",
                "password",
                "name",
                "seed",
                "bio",
                "photo"
        );

        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                put("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token())
                        .content(jsonContent)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
    }

    @Test
    @DisplayName("Must return 200 when deleting a user authenticated")
    void delete1() throws Exception {
        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                delete("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token())
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    @DisplayName("Must return 403 when deleting a user not authenticated")
    void delete2() throws Exception {
        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                delete("/user")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("Must return 401 when deleting a user with invalid token")
    void delete3() throws Exception {
        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                delete("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token() + "invalid")
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("Must return 200 when getting user details authenticated")
    void details1() throws Exception {
        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                get("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token())
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    @DisplayName("Must return 403 when getting user details not authenticated")
    void details2() throws Exception {
        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                get("/user")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("Must return 401 when getting user details with invalid token")
    void details3() throws Exception {
        super.createTestUser();

        MockHttpServletResponse response = mockMvc.perform(
                get("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + super.login("test@test", "test").access_token() + "invalid")
        ).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

}