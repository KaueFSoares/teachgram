package br.com.teachgram.api;

import br.com.teachgram.api.domain.user.dto.LoginRequestDTO;
import br.com.teachgram.api.domain.user.dto.LoginResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
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

    public TestsBase(
            MockMvc mockMvc,
            JacksonTester<LoginRequestDTO> jsonLoginRequestDTO
    ) {
        this.mockMvc = mockMvc;
        this.jsonLoginRequestDTO = jsonLoginRequestDTO;
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
