package store.com.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import store.com.Entity.Role;

public interface RoleDAO extends JpaRepository<Role, Integer>{

}
