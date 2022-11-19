package store.com.Service;

import javax.servlet.http.Cookie;


public interface CookieService {
	public Cookie get(String name);

	public String getValue(String name, String defaultValue);

	public Cookie add(String name, String value, int hours);

	public void remove(String name);
}
