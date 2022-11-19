package store.com.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.DetailCart;

public interface DetailCartDAO extends JpaRepository<DetailCart, Integer>{
	@Query("SELECT p FROM DetailCart p WHERE p.account.accountid LIKE ?1")
	List<DetailCart> DetailCartByAccountId(String	accountId);
}
