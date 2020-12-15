package github.devmicaelyg.clientes.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerSecurityConfiguration;
import org.springframework.web.cors.CorsConfiguration;

public class MyAuthorizationServerSecurityConfiguration extends AuthorizationServerSecurityConfiguration {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);

        http.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(request -> {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.addAllowedMethod("POST");
            configuration.addAllowedHeader("Content-Type");

            return configuration;
        }));
    }
}