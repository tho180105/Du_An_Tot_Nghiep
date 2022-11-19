package store.com.RestController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.DetailOrderDAO;
import store.com.DAO.OrdersDAO;
import store.com.Entity.DetailOrder;
import store.com.Entity.Orders;

@RestController
@RequestMapping("/rest/ListOrder")
public class ListOrderRestController {
    @Autowired
    OrdersDAO dao;
    @Autowired
    DetailOrderDAO ddao;
    
    
    @GetMapping("/order")
    public List<Orders> listOrderAccount(Authentication auth){
        List<Orders> list =  dao.findByAccount(auth.getName());
        return list;
    }
    
    
    @GetMapping("/detail")
    public List<DetailOrder> listOrderDetail(Authentication auth){
        List<Orders> list= dao.findByAccount(auth.getName());
        
        List<DetailOrder> listDetail = new ArrayList<DetailOrder>();
        for(Orders order : list) {
            List<DetailOrder> listTemp = (ddao.findByOrders(order));
            for(DetailOrder detail: listTemp) {
                listDetail.add(detail);
            }
        }
        return listDetail;
    }

    @GetMapping("/detailOrder/{id}")
    public List<DetailOrder> OrderDetail(@PathVariable("id") int id){
        Orders order= dao.findById(id).get();
        List<DetailOrder> listDetail = (ddao.findByOrders(order));
        return listDetail;
    }


}
