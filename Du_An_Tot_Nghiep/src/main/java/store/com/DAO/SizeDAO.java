package store.com.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import store.com.Entity.Size;

public interface SizeDAO extends JpaRepository<Size, Integer>{

}
