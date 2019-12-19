package com.in28minutes.rest.webservices.WebServices.demo;

import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Gebruiker
 */

@RestController
@RequestMapping ("/demos")
@CrossOrigin(origins="http://localhost:4200")
public class DemoController {   
    
    private final DemoJpaRespository demoRepository;
    
    public DemoController(DemoJpaRespository fileEntityRepository){this.demoRepository = fileEntityRepository; }
    
    @GetMapping
    public List<Demo> getAllDemos() {
        List<Demo> demos = new ArrayList<>();
        demoRepository.findAll().forEach(demos::add);
        return demos;
    }

    @GetMapping("/{username}")
    public List<Demo> getAllDemos(@PathVariable String username){
        return demoRepository.findByUsername(username);
        //return demoService.findAll();
    }    
    @GetMapping("/users/{username}/demos/{id}")
    public Demo getDemo(@PathVariable String username, @PathVariable long id){
        return demoRepository.findById(id).get();
        //return demoService.findById(id);
    } 
    
    //DELETE /users/{username}/demos/{id}
    @DeleteMapping("/users/{username}/demos/{id}")
    public ResponseEntity<Void> deleteDemo(@PathVariable String username, @PathVariable long id){
        demoRepository.deleteById(id);
        
        return ResponseEntity.noContent().build();           
    }
    
//    //Edit/Update a Demo
    @PutMapping("/users/{username}/demos/{id}")
    public ResponseEntity<Demo> updateDemo(
            @PathVariable String username, 
            @PathVariable long id, @RequestBody Demo demo){
        demo.setUsername(username);
        Demo demoUpdated = demoRepository.save(demo);
        return new ResponseEntity<Demo>(demo, HttpStatus.OK); //gives more options in the future if you want to return other statusses
    }

    //Create a new Demo
    @PostMapping("/{username}")
    public ResponseEntity<String> uploadDemo (@PathVariable String username, Demo demo, @NotNull @RequestParam("trackname") String trackname,@RequestParam("file") MultipartFile multipartFile){
        String status="";
        if (!multipartFile.isEmpty()) {
            try {
                Demo file = new Demo(multipartFile.getOriginalFilename(), multipartFile.getContentType(), 
                        demo.getUsername(), demo.getDescription(), multipartFile.getBytes());
                file.setTrackName(trackname);

                demoRepository.save(file);

                status = status +  " Successfully uploaded file=" + multipartFile.getOriginalFilename();
            } catch (Exception e) {
                status = status +  "Failed to upload " + multipartFile.getOriginalFilename()+ " " + e.getMessage();
            }
        }
        return ResponseEntity.ok(status);
    }
    
}