package store.com.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import store.com.DAO.DetailCartDAO;
import store.com.DAO.ProductRepositoryDAO;
@Controller
@CrossOrigin
public class CartController {
    @Autowired
    HttpSession session;
    
    @Autowired 
    ProductRepositoryDAO prd;
    
    @Autowired
    DetailCartDAO dt;
    
	@RequestMapping("/cart")
	public String cart() {
		return "cart/view";
	}
	
	@RequestMapping("/cart/order")
	public String cart1() {
		return "cart/order";
	}
	@RequestMapping("/cart/order/{id}")
	public String cartDone(@PathVariable("id") String id,Model model,HttpSession se) {
		model.addAttribute("orderid",id); 
		se.removeAttribute("detailCartWaiting");
		return "cart/paydone";
	}
	
	@RequestMapping("/cart/{id}")
    public String cart(Model model, @PathVariable("id") Integer productid, Authentication auth) {
		
	    if(auth!=null) {
//	        dt.save(new);
	    }
	    session.setAttribute("productRepositoryId", productid);
        return "cart/view";
    }
}
