package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.VoucherDAO;
import store.com.Entity.Voucher;

@RestController
@RequestMapping("/rest/voucher")
public class VoucherRestController {
	@Autowired
	VoucherDAO dao;
	
	@GetMapping
	public List<Voucher> getDetailCart() {
		return dao.findAll();
	}
	
	@GetMapping("/bydate")
    public List<Voucher> getAllByDate() {
        return dao.findByDate();
    }
	
	@PostMapping("/insert")
	public Voucher save(@RequestBody Voucher voucher) {
	    return dao.save(voucher);
	}
	
	@PutMapping("/{id}")
    public Voucher update(@PathVariable("id") String voucherid, @RequestBody Voucher voucher) {
        return dao.save(voucher);
    }
	
	@DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String voucherid) {
        dao.deleteById(voucherid);
    }
	
}
