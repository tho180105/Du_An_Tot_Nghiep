package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.BannerDAO;
import store.com.Entity.Banner;


@CrossOrigin("*")
@RestController
public class BannerRestController {
    
    @Autowired
    BannerDAO bannerDAO;
    
    @GetMapping("/rest/banner")
    public List<Banner> getBanner() {
        return bannerDAO.findBannerByDate();
    }
    
    @GetMapping("/rest/bannerall")
    public List<Banner> getAllBanner() {
        return bannerDAO.findAll();
    }
    
    @GetMapping("/rest/banner/{id}")
    public List<Banner> getOne(@PathVariable("id") Integer bannerid) {
        return bannerDAO.findByBannerId(bannerid);
    }
    
    @PostMapping("/rest/banner")
    public Banner save(@RequestBody Banner banner) {
        System.out.println(banner);
        return bannerDAO.save(banner);
    }
    
    
    @PutMapping("/rest/banner/{id}")
    public Banner update(@PathVariable("id") Integer bannerid, @RequestBody Banner banner) {
        return bannerDAO.save(banner);
    }
    
    @DeleteMapping("/rest/banner/{id}")
    public void delete(@PathVariable("id") Integer bannerid) {
        bannerDAO.deleteById(bannerid);
    }
    
    
}
