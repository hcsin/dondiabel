package com.in28minutes.rest.webservices.WebServices.jwt.resource;

import com.in28minutes.rest.webservices.WebServices.jwt.JwtTokenUtil;
import com.in28minutes.rest.webservices.WebServices.jwt.user.User;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Gebruiker
 */

//contains the important methods to be able to handle the resources
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class JwtAuthenticationRestController {

  @Value("${jwt.http.request.header}")
  private String tokenHeader;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  private UserDetailsService userDetailsService;
  
//create Authentication Token, value is picked up from property file (application.properties) /authenticate
  @RequestMapping(value = "${jwt.get.token.uri}", method = RequestMethod.POST)
  public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest)
      throws AuthenticationException {
      
//uses spring security to check if username and password are right
    authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

//then log the user details
    final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

//create token
    final String token = jwtTokenUtil.generateToken(userDetails);

//return token
    return ResponseEntity.ok(new JwtTokenResponse(token));
  }

//refresh Authentication Token, value is picked up from property file (application.properties) /refresh
  @RequestMapping(value = "${jwt.refresh.token.uri}", method = RequestMethod.GET)
  public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
//check if token is valid    
      String authToken = request.getHeader(tokenHeader);
    final String token = authToken.substring(7);
    String username = jwtTokenUtil.getUsernameFromToken(token);
    
//gets user details
    User user = (User) userDetailsService.loadUserByUsername(username);

//checks expiration date
    if (jwtTokenUtil.canTokenBeRefreshed(token)) {
      String refreshedToken = jwtTokenUtil.refreshToken(token);
//create token and return back
      return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
    } else {
      return ResponseEntity.badRequest().body(null);
    }
  }

//exception is handled by AuthenticationException
  @ExceptionHandler({ AuthenticationException.class })
  public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
  }

  private void authenticate(String username, String password) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new AuthenticationException("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new AuthenticationException("INVALID_CREDENTIALS", e);
    }
  }
}
