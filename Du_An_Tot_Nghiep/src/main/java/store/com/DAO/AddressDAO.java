package store.com.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.Address;

public interface AddressDAO extends JpaRepository<Address, Integer>{

    @Query("SELECT u FROM Address u WHERE u.account.accountid like ?1")
    Address findByAccountId(String accountid);
}
