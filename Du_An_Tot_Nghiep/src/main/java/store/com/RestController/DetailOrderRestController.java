package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
