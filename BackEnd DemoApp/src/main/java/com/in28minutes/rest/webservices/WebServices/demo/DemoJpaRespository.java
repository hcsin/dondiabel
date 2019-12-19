package com.in28minutes.rest.webservices.WebServices.demo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemoJpaRespository extends JpaRepository<Demo, Long>{
    List<Demo> findByUsername(String username);
}