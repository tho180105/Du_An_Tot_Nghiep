package store.com.RestController;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.hibernate.criterion.Order;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.AccountDAO;
import store.com.DAO.OrdersDAO;
import store.com.DAO.VoucherDAO;
import store.com.Entity.Orders;
import store.com.Entity.Voucher;

@RestController
@RequestMapping("/rest/order")
public class OrderRestController {
	OrdersDAO dao;
	AccountDAO adao;
	Orders o;
	HttpSession se;
	VoucherDAO vd;
	String a;
	

	public OrderRestController(AccountDAO adao, Orders o, HttpSession se, OrdersDAO dao, VoucherDAO vd) {
		this.adao = adao;
		this.o = o;
		this.se = se;
		this.dao = dao;
		this.vd = vd;
	}
	@GetMapping
	public List<Orders> getOders() {
		return dao.findAll();
	}


	@GetMapping("/createNew")
	public Orders initOrder() {
		return o;
	}

	@PostMapping
	public Orders create(@RequestBody Orders orders, Authentication auth) {
		try {

			Voucher v = vd.findById(orders.getVoucher().getVoucherid()).get();
			v.setQuantity(v.getQuantity() - 1);
			vd.save(v);
		} catch (Exception e) {
		}
		if (auth != null) {
			orders.setAccount(adao.findById(auth.getName()).get());
			return dao.save(orders);
		}
		return dao.save(orders);
	}
	
	@PutMapping
	public Orders update(@RequestBody Orders orders) {
		System.out.println(orders.getOrderid());
		System.out.println(orders.getOrderstatus().getOrderstatusid());
		return dao.save(orders);
	}

	@GetMapping("/NoProcess")
	public List<Orders> listNoProcess(){
		return dao.findOrdersNoProcess();
	}
	
}
