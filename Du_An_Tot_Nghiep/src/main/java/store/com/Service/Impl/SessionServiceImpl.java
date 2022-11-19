package store.com.Service.Impl;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.Service.SessionService;
@Service
public class SessionServiceImpl implements SessionService{
	@Autowired
	HttpSession session;
	/*
	 * Đọc giá trị của attribute trong session
	 * @param name tên attribute
	 * @return giá trị đọc được hoặc nu nếu không tồn tại
	 */
	
	public <T> T get(String name) {
		return (T)session.getAttribute(name); 
	}
	
	public <T> T get(String name, T defaultVaue) {
		T value = get(name);
		return value != null ? value : defaultVaue;
	}
	public void set(String name, Object value) {
		remove(name);
		session.setAttribute(name, value);
	}
	/**
	* Xóa attribute trong session
	* @param name tên attribute cần xóa
	*/
	public void remove(String name) {
		session.removeAttribute(name);
	}
}
