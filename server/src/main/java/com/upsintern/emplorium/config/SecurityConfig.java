package com.upsintern.emplorium.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private static final String[] adminEndPoints = {
            "/staff/del",
            "/staff/all",
            "/staff/update",
            "/task/create",
            "/task/all",
            "/task/assign"
    };

    private static final String[] authEndPoints = {
            "/event/**",
            "/meet/**",
            "/team/",
            "/task/module/progress"};

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .authorizeHttpRequests(
                        req -> {
                            req.requestMatchers(adminEndPoints).hasRole("ADMIN");
                            req.requestMatchers(authEndPoints).authenticated();
                            req.requestMatchers("/staff/add","/staff/login","/**").permitAll();
                        }
                )
                .build();
    }


    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
