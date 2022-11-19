package store.com.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.Account;

public interface AccountDAO extends JpaRepository<Account, String> {
    @Query("select u from Account u where u.role.roleid = ?1")
    List<Account> findbyRoleid(String roleid);
}
