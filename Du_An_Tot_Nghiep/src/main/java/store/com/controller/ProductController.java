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
	
	String minPrice;
	String maxPrice;

	@RequestMapping("/product/list")
	public String list(Model model, @RequestParam("cid") Optional<Integer> cid , @RequestParam("p") Optional<Integer> p, @RequestParam(value="search",required = false) String item) {
		model.addAttribute("cates", categoryDAO.findAll());
		String uri;
		Pageable pageable;
		
		Page<Product> list;
		if(cid.isPresent()) {
		    uri = request.getRequestURI()+"?cid="+cid.get();
		    System.out.println(uri);
		    if(item != null) {
                if(item.equalsIgnoreCase("GiaThap")) {
                    pageable = PageRequest.of(p.orElse(0), 9, Sort.by("sellingprice").ascending());
                }else if(item.equalsIgnoreCase("GiaCao")){
                    pageable = PageRequest.of(p.orElse(0), 9, Sort.by("sellingprice").descending());
                } else {
                    pageable = PageRequest.of(p.orElse(0), 9);
                }
                uri = uri+"&&search="+item;
                System.out.println(uri);
            }else {
                pageable = PageRequest.of(p.orElse(0), 9);
            }
		        list = productDAO.findCategoryId(cid.get(), pageable);
	            model.addAttribute("page", list);
	            model.addAttribute("cid", cid.get());
		
			long totalItems = list.getTotalElements();
			int totalPages = list.getTotalPages();
			
			model.addAttribute("cids", cid);
			model.addAttribute("totalItems", totalItems);
			model.addAttribute("totalPages", totalPages);
		}else {
		    if(item != null) {
		        if(item.equalsIgnoreCase("GiaThap")) {
		            pageable = PageRequest.of(p.orElse(0), 9, Sort.by("sellingprice").ascending());
		        }else {
		            pageable = PageRequest.of(p.orElse(0), 9, Sort.by("sellingprice").descending());
		        }
		        
		    }else {
		        pageable = PageRequest.of(p.orElse(0), 9);
		    }
		    
			list = productDAO.findAll(pageable);
			service.set("xtypeList", list);
			model.addAttribute("page", list);

			Page<Product> pageProduct = list;
			long totalItems = pageProduct.getTotalElements();
			int totalPages = pageProduct.getTotalPages();

			model.addAttribute("totalItems", totalItems);
			model.addAttribute("totalPages", totalPages);
		}
		
		service.set("xtypeList", list);
		return "product/list";
	}

	@RequestMapping("/product/list2")
    public String list1(Model model, @RequestParam("cid") Optional<Integer> cid) {

        return "product/list2";
    }


	@RequestMapping("/product/list/xtype")
    public String test(Model model,@RequestParam(value = "min", required = false) String min, @RequestParam(value= "max", required = false) String max
            , @RequestParam("cid") Optional<Integer> cid , @RequestParam("p") Optional<Integer> p, 
            @RequestParam(value="search",required = false) String item) {
	    
	    model.addAttribute("cates", categoryDAO.findAll());
	    minPrice = min.substring(1);
	    maxPrice = max.substring(1);

	    Pageable pageable = PageRequest.of(p.orElse(0), 9);
        Page<Product> list;
	  
        list = productDAO.findAllByPrice(Float.parseFloat(minPrice), Float.parseFloat(maxPrice), pageable);
        model.addAttribute("page", list);
        
        long totalItems = list.getTotalElements();
        int totalPages = list.getTotalPages();
        
        model.addAttribute("totalItems", totalItems);
        model.addAttribute("totalPages", totalPages);

        return "product/list";
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
