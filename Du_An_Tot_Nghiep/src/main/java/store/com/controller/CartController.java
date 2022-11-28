package store.com.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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



}
