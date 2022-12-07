package store.com.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import store.com.DAO.AdditionalImagesDAO;
import store.com.DAO.CategoryDAO;
import store.com.DAO.ProductDAO;
import store.com.DAO.RateDAO;
import store.com.Entity.AdditionalImages;
import store.com.Entity.Product;
import store.com.Entity.Rate;
import store.com.Service.SessionService;


@Controller
public class ProductController {
	@Autowired
	CategoryDAO categoryDAO;
	
	@Autowired
	ProductDAO productDAO;
	
	@Autowired
	AdditionalImagesDAO imageDAO;
	
	@Autowired
	HttpServletRequest request;
	
	@Autowired
	SessionService service;
	
	@Autowired
	RateDAO rateDAO;
	

	@RequestMapping("/product/list")
    public String list1(Model model) {
        return "product/list2";
    }



	@RequestMapping("/product/detail/{productid}")
	public String detail(Model model, @PathVariable("productid") Integer productid) {
		model.addAttribute("cates", categoryDAO.findAll());	
		
		Product product = productDAO.findById(productid).get();
		model.addAttribute("item", product);
		System.out.println(product.getMainproductimage());
		
		List<AdditionalImages> listimage = imageDAO.findByImagePath(product.getProductid());
		model.addAttribute("listimage", listimage);
		
		Integer quantityComment = productDAO.countCommentProduct(productid);
		model.addAttribute("qtyComment", quantityComment);
		
		List<Rate> listRate = rateDAO.findTop5ByProduct(productid);
		model.addAttribute("listRate", listRate);
		
		return "product/detail";
	}
}
