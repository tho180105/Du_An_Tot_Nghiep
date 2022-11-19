package store.com.Interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import store.com.Service.CookieService;
import store.com.Service.SessionService;
@Component
public class SecurityInterceptor implements HandlerInterceptor{
	@Autowired
	CookieService cookie;
	@Autowired
	SessionService se;
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
//		boolean flag= false;
//		
//		
//		if(se.get("username")==null) {
//			flag= true;
//		}
//		se.set("username", "asdasd");
//		if(cookie.get("remember-me")==null) {
//			if(se.get("username")!=null) {
//				
//			}else if(flag){
//				cookie.remove("JSESSIONID");
//			}
//		}
		return true;
	}
}
