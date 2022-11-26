package store.com.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import store.com.DAO.AccountDAO;
import store.com.DAO.DetailCartDAO;
import store.com.DAO.ProductRepositoryDAO;
import store.com.Entity.DetailCart;
import store.com.Entity.ProductRepository;

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
	public String cartDone(@PathVariable("id") String id, Model model, HttpSession se) {
		model.addAttribute("orderid", id);
		se.removeAttribute("detailCartWaiting");
		return "cart/paydone";
	}

	@Autowired
	DetailCartDAO dao;
	@Autowired
	AccountDAO adao;
	@Autowired
	ProductRepositoryDAO pdao;

	@RequestMapping("/cart/{id}")
	public String cart(Model model, @PathVariable("id") String productRepositoryIdString, Authentication auth,
			HttpSession se) {

		/*
		 * if(auth!=null) { // dt.save(new); }
		 * session.setAttribute("productRepositoryId", productid);
		 */
		Integer productRepositoryId = Integer.parseInt(productRepositoryIdString);
		if (auth != null) {
			List<DetailCart> detailCarts = dao.findAll();
			for (DetailCart d : detailCarts) {
				if (d.getProductrepository().getProductrepositoryid() == productRepositoryId) {
					d.setQuantity(d.getQuantity() + 1);
					dao.save(d);
				}
			}
			dao.save(new DetailCart(1, pdao.findById(productRepositoryId).get(), adao.findById(auth.getName()).get()));
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

			}
		}
		DetailCart cartDetail = new DetailCart(1, newProductRepository);
		cartDetail.setDetailcartid(detailCartSession.size());
		detailCartSession.add(cartDetail);
		se.removeAttribute("detailCartWaiting");
		se.setAttribute("detailCartWaiting", detailCartSession);
		return "cart/view";
	}
}
