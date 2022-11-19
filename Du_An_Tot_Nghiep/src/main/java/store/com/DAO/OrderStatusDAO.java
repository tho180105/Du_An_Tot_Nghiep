package store.com.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import store.com.Entity.OrderStatus;

public interface OrderStatusDAO extends JpaRepository<OrderStatus, Integer>{

}
