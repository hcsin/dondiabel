package com.in28minutes.rest.webservices.WebServices.jwt.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Gebruiker
 */

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping ("/members")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/members/{id}")
    ResponseEntity<User> updateUser(@RequestBody User user) {
        User result = userRepository.save(user);
        return ResponseEntity.ok().body(result);
    }
    
    @RequestMapping ("/members/{username}")
    public User getUserByName(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @PostMapping ("/members")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

//    @PutMapping ("/members/{id}")
//    public void updateUser(@RequestBody User user, @PathVariable Long id) {
//        userService.updateUser(id, user);
//    }
    
    
    @DeleteMapping ("/members/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
