package br.com.teachgram.api;

import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.LoginRequestDTO;
import br.com.teachgram.api.domain.user.dto.LoginResponseDTO;
import br.com.teachgram.api.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
@ActiveProfiles("test")
public abstract class TestsBase {

    protected final MockMvc mockMvc;
    protected final JacksonTester<LoginRequestDTO> jsonLoginRequestDTO;
    protected final UserRepository userRepository;
    protected final PasswordEncoder passwordEncoder;

    public TestsBase(
            MockMvc mockMvc,
            JacksonTester<LoginRequestDTO> jsonLoginRequestDTO,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.mockMvc = mockMvc;
        this.jsonLoginRequestDTO = jsonLoginRequestDTO;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    protected User createTestUser() {
        var user = new User();

        user.setName("test");
        user.setEmail("test@test");
        user.setPhone("test");
        user.setPhoto("test");
        user.setBio("test");
        user.setPassword(passwordEncoder.encode("test"));

        return userRepository.save(user);
    }

    protected LoginResponseDTO login(String email, String password) throws Exception {
        var loginRequestDTO = new LoginRequestDTO(email, password);
        var request = mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonLoginRequestDTO.write(loginRequestDTO).getJson())
        );
        var response = request.andReturn().getResponse();

        ObjectMapper mapper = new ObjectMapper();

        try {
            return new LoginResponseDTO(
                    mapper.readTree(response.getContentAsString()).get("token_type").asText(),
                    mapper.readTree(response.getContentAsString()).get("access_token").asText(),
                    Long.parseLong(mapper.readTree(response.getContentAsString()).get("access_token_expires_at").asText()),
                    mapper.readTree(response.getContentAsString()).get("refresh_token").asText(),
                    Long.parseLong(mapper.readTree(response.getContentAsString()).get("refresh_token_expires_at").asText())
            );
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;

    }

}
