package com.in28minutes.rest.webservices.WebServices.jwt;

import com.in28minutes.rest.webservices.WebServices.jwt.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//UserDetailsService, interface defined inside spring security core framework
//important method: loadUserByUsername, 

@Service
public class JwtUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) {
        UserDetails user = userRepository.findByUsername(username);
        if (user == null) throw new UsernameNotFoundException(username);
//        }       
        return user;
    }
}
