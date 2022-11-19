package store.com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class StatisticController {
    @RequestMapping("admin/index")
	public String AdminIndex() {
		return "Admin/index";
	}
    
}
