package store.com.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.Voucher;

public interface VoucherDAO extends JpaRepository<Voucher, String>{
    @Query(value = "SELECT *\r\n"
            + "FROM Voucher \r\n"
            + "WHERE CAST(REPLACE(CONVERT(date, GETDATE()),'-','') AS INT) BETWEEN CAST(REPLACE(CONVERT(date, StartDate),'-','') AS INT) AND CAST(REPLACE(CONVERT(date, EndDate),'-','') AS INT)", nativeQuery = true)
    List<Voucher> findByDate();
}
