package store.com.RestController;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.AccountDAO;
import store.com.DAO.DetailCartDAO;
import store.com.DAO.ProductRepositoryDAO;
import store.com.Entity.DetailCart;
import store.com.Entity.ProductRepository;

@RestController
@RequestMapping("/rest/cart")
public class CartRestController {
    @Autowired
    DetailCartDAO dao;
    @Autowired
    AccountDAO adao;
    @Autowired
    ProductRepositoryDAO pdao;


    @SuppressWarnings("unchecked")
    @GetMapping
    public List<DetailCart> getDetailCart(Authentication auth, HttpSession se) {
        if (auth != null) {
            return dao.DetailCartByAccountId(auth.getName());
        }
        List<DetailCart> a = (List<DetailCart>) se.getAttribute("detailCartWaiting");
        if (a == null) {
            return null;
        }
        return (List<DetailCart>) se.getAttribute("detailCartWaiting");
    }

    @PutMapping
    public DetailCart updateDetailCart(@RequestBody DetailCart detailCart, Authentication auth, HttpSession se) {
        if (auth != null) {
            return dao.save(detailCart);
        }

        List<DetailCart> detailCartSession = (List<DetailCart>) se.getAttribute("detailCartWaiting");
        // boolean isExist=false;
        // for (DetailCart d : detailCartSession) {
        // if(d.getProductRepository().getProductrepositoryid()==)
        // }
        for (DetailCart d : detailCartSession) {
            if (d.getDetailcartid() == detailCart.getDetailcartid()) {
                detailCartSession.remove(d);
                detailCartSession.add(detailCart);
            }

        }
        se.removeAttribute("detailCartWaiting");
        se.setAttribute("detailCartWaiting", detailCartSession);

        return detailCart;
    }

    @PostMapping("/{id}")
    public DetailCart createDetailCart(@PathVariable("id") int productRepositoryId, Authentication auth,
            HttpSession se) {

        if (auth != null) {
            DetailCart detailCart = new DetailCart(1, pdao.findById(productRepositoryId).get(),
                    adao.findById(auth.getName()).get());
            return dao.save(detailCart);
        }

        List<DetailCart> detailCartSession = (List<DetailCart>) se.getAttribute("detailCartWaiting");
        if (detailCartSession == null) {
            detailCartSession = new ArrayList<DetailCart>();
        }
        ProductRepository newProductRepository = pdao.findById(productRepositoryId).get();
        DetailCart cartDetail = new DetailCart(1, newProductRepository);
        cartDetail.setDetailcartid(detailCartSession.size());
        detailCartSession.add(cartDetail);
        se.removeAttribute("detailCartWaiting");
        se.setAttribute("detailCartWaiting", detailCartSession);
        return cartDetail;
    }

    @PostMapping("/productSelected")
    public List<DetailCart> postProductSelected(@RequestBody List<DetailCart> detailCarts, HttpSession se) {
        se.setAttribute("detailCarts", detailCarts);
        return detailCarts;
    }

    @GetMapping("/productSelected")
    public List<DetailCart> getProductSelected(HttpSession se) {
        List<DetailCart> detailCarts = (List<DetailCart>) se.getAttribute("detailCarts");
        return detailCarts;
    }

    @DeleteMapping("/{id}")
    public void deleteDetailCart(@PathVariable("id") int detailCartId, Authentication auth,
            HttpSession se) {
        if (auth != null) {
            dao.delete(dao.findById(detailCartId).get());
            return;
        }
        List<DetailCart> detailCartSession = (List<DetailCart>) se.getAttribute("detailCartWaiting");
        for (DetailCart d : detailCartSession) {
            if (d.getDetailcartid() == detailCartId) {
                detailCartSession.remove(d);
                break;
            }

        }
        se.removeAttribute("detailCartWaiting");
        se.setAttribute("detailCartWaiting", detailCartSession);
    }

    // Add to cart
    @GetMapping("/{id}")
    public DetailCart addToCart(@PathVariable("id") String productRepositoryIdString, Authentication auth,
            HttpSession se) {
        Integer productRepositoryId = Integer.parseInt(productRepositoryIdString);
        if (auth != null) {
            List<DetailCart> detailCarts = dao.findAll();
            for (DetailCart d : detailCarts) {
                if (d.getProductrepository().getProductrepositoryid() == productRepositoryId) {
                    d.setQuantity(d.getQuantity() + 1);
                    dao.save(d);
                    return d;
                }
            }
            return dao.save(
                    new DetailCart(1, pdao.findById(productRepositoryId).get(), adao.findById(auth.getName()).get()));
        }
        List<DetailCart> detailCartSession = (List<DetailCart>) se.getAttribute("detailCartWaiting");
        ProductRepository newProductRepository = pdao.findById(productRepositoryId).get();
        if (detailCartSession == null) {
            detailCartSession = new ArrayList<DetailCart>();
        }
        for (DetailCart d : detailCartSession) {
            // Đã có rồi thì quantity +1
            if (d.getProductrepository().getProductrepositoryid() == productRepositoryId) {
                d.setQuantity(d.getQuantity() + 1);
                se.removeAttribute("detailCartWaiting");
                se.setAttribute("detailCartWaiting", detailCartSession);
                return d;
            }
        }
        DetailCart cartDetail = new DetailCart(1, newProductRepository);
        cartDetail.setDetailcartid(detailCartSession.size());
        detailCartSession.add(cartDetail);
        se.removeAttribute("detailCartWaiting");
        se.setAttribute("detailCartWaiting", detailCartSession);
        return cartDetail;
    }
}
