package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import store.com.DAO.DetailOrderDAO;
import store.com.DAO.ProductRepositoryDAO;
import store.com.Entity.DetailOrder;
import store.com.Entity.ProductRepository;

@RestController
@RequestMapping("/rest/detailorder")
public class DetailOrderRestController {
    @Autowired
    DetailOrderDAO dao;
    @Autowired
    ProductRepositoryDAO prdao;
    
    @GetMapping
    public List<DetailOrder> get(){
       return dao.findAll();
    }
    @PostMapping
    public DetailOrder create(@RequestBody DetailOrder detailOrder, Authentication auth) {
       ProductRepository product= prdao.getById(detailOrder.getProductrepository().getProductrepositoryid());
        product.setQuantity(product.getQuantity()-detailOrder.getQuantity());
        prdao.save(product);
        return dao.save(detailOrder);
    }
    @GetMapping("/byStatus")
    public List<DetailOrder> getByStatus(){
      return  dao.getAllByStatues();
    }

    @GetMapping("/order/{id}")
    public List<DetailOrder> getOne(@PathVariable("id") Integer orderid){
        return dao.findByOrderId(orderid);
    }
}
