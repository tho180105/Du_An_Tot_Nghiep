package store.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import store.com.DAO.BannerDAO;
import store.com.DAO.CategoryDAO;
import store.com.DAO.ProductDAO;
import store.com.DAO.ProductDiscountDAO;
import store.com.Entity.Banner;
import store.com.Entity.Category;
import store.com.Entity.Product;
import store.com.Entity.ProductDiscount;
import store.com.Service.SessionService;

@Controller
public class IndexController {
	@Autowired
	CategoryDAO categoryDAO;

	@Autowired
	ProductDAO productDAO;
	@Autowired
	BannerDAO bannerDAO;
	
	@Autowired
	ProductDiscountDAO pdDAO;
	
	@RequestMapping("/home")
	public String home1(Model model) {
		List<Category> list = categoryDAO.findAll(); 
		model.addAttribute("cates", list);
		
		List<Banner> banners = bannerDAO.findBannerByDate();
		model.addAttribute("banners", banners);
		
//		List<ProductDiscount> discount1 = pdDAO.findProductDiscountByStyleId(1);
//		model.addAttribute("styleList1", discount1);
//		List<Product> discount1 = productDAO.findByCategoryId(1);
//		model.addAttribute("styleList1", discount1);
//		List<ProductDiscount> discount2 = pdDAO.findProductDiscountByStyleId(2);
//        model.addAttribute("styleList2", discount2);
//        List<ProductDiscount> discount3 = pdDAO.findProductDiscountByStyleId(3);
//        model.addAttribute("styleList3", discount3);
//        List<ProductDiscount> discount4 = pdDAO.findProductDiscountByStyleId(4);
//        model.addAttribute("styleList4", discount4);

		return "home/home";
	}
	

	@RequestMapping("/faq")
	public String faq() {
		return "home/faq";
	}
	
	@RequestMapping("/contact")
	public String contact() {
		return "home/contact";
	}
	
	@RequestMapping("/blog")
	public String blog() {
		return "blog/blog";
	}
	
	@RequestMapping("/blogdetail")
	public String blogdetail() {
		return "blog/blog-detail";
	}


}
