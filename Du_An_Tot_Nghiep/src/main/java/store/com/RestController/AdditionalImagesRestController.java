package store.com.RestController;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.AdditionalImagesDAO;
import store.com.Entity.AdditionalImages;
import store.com.Service.ImagesService;
@RestController
public class AdditionalImagesRestController {
    @Autowired
    AdditionalImagesDAO dao;
    
    
    @RequestMapping("images")
    @ResponseBody
    public List<AdditionalImages> imgs(Model model) {
        AdditionalImages img = new AdditionalImages();
        model.addAttribute("formimg", img);
        List<AdditionalImages> map = dao.findAll();
        model.addAttribute("itemimgs", map);
        return map;
    }
    

    @Autowired
    ImagesService imagesService;
    
    @GetMapping("/rest/images/{id}")
    public AdditionalImages getOne(@PathVariable("id") Integer id) {
        return imagesService.findById(id);
    }
    
    @GetMapping("/rest/images")
    public List<AdditionalImages> getAll() {
        return imagesService.findAll();
    }
    @GetMapping("/rest/imagesbyproduct/{id}")
    public List<AdditionalImages> getByProduct(@PathVariable("id") Integer id) {
        return imagesService.findByImagePath(id);
    }
    
    @PostMapping("/rest/images")
    public AdditionalImages save(@RequestBody AdditionalImages img) {
        return imagesService.create(img);
    }
    
    @PutMapping("/rest/images/{id}")
    public AdditionalImages update(@PathVariable("id") Integer id ,@RequestBody AdditionalImages img) {
        return imagesService.update(img);
    }
    
    @DeleteMapping("/rest/images/{id}")
    public void delete(@PathVariable("id") Integer id) {
        imagesService.delete(id);
    }
}
