package store.com.DAO;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.Orders;
import store.com.Entity.ReportModel;

public interface OrdersDAO extends JpaRepository<Orders, Integer>{
    
    @Query("Select u from Orders u where u.account.accountid like ?1 ")
    List<Orders> findByAccount(String username);
    //Get sales
    @Query("select sum(o.totalmoney) from Orders o where o.createdate between ?1 and ?2")
    Double getSales(Date date1, Date date2) ;

    //Get doanh thu hàng theo tháng
    @Query("select sum(o.productmoney) from Orders o where o.createdate between ?1 and ?2")
    Double getTotalMoneyProduct(Date date1, Date date2) ;
    // Get tổng tiền mua sản phẩm trong hóa đon theo tháng
    @Query("select sum(o.productrepository.product.purchaseprice*o.quantity) from DetailOrder o where o.orders.createdate between ?1 and ?2")
    Double getPayProduct(Date date1, Date date2) ;
    //Get chi phí ship
    @Query("select sum(o.shipfee) from Orders o where o.createdate between ?1 and ?2")
    Double getShipFee(Date date1, Date date2);


    //Đếm sô lượng order theo orderstatus và create date
    @Query("select new ReportModel (o.orderstatus.orderstatustitle,count (o.orderid))from Orders o where  o.createdate between ?1 and ?2 group by o.orderstatus.orderstatustitle")
    List<ReportModel> getReport(Date date1, Date date2);

}
