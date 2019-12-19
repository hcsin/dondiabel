package com.in28minutes.rest.basic.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 *
 * @author Gebruiker
 */

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter{
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()       //disables csrf
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()      //except options request to all url's
                    .anyRequest().authenticated()                       //authenticate all the other requests
                    .and()
                //.formLogin().and()
                .httpBasic();                   //use basic authentication
    }
}
