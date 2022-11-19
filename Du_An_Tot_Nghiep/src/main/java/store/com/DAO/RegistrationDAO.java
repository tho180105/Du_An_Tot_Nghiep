package store.com.DAO;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import store.com.Entity.Registration;
@Service
public interface RegistrationDAO extends JpaRepository<Registration, Long>{
    
    Optional<Registration> findByToken(String token);
    
    

}
