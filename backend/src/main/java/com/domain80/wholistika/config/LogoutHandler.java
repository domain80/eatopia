package com.domain80.wholistika.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import java.io.IOException;
import java.net.URI;

public class LogoutHandler extends SimpleUrlLogoutSuccessHandler {
    private final RegisteredClientRepository registeredClientRepository;

    public LogoutHandler(RegisteredClientRepository registeredClientRepository) {
        this.registeredClientRepository = registeredClientRepository;
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String targetUrl = null;
        if (authentication instanceof OAuth2AuthenticationToken && authentication.getPrincipal() instanceof OidcUser) {
            String registrationId = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();
            RegisteredClient clientRegistration = this.registeredClientRepository.findById(registrationId);

            assert clientRegistration != null;

            targetUrl = clientRegistration.getPostLogoutRedirectUris().stream().findFirst().orElse(null);

        }
        System.out.println(targetUrl);

        return targetUrl != null ? targetUrl : super.determineTargetUrl(request, response);
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        super.onLogoutSuccess(request, response, authentication);
    }
}
