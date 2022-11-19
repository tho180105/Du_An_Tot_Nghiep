package store.com.Service;


public interface SessionService {
	public <T> T get(String name) ;
	public <T> T get(String name, T defaultVaue) ;
	public void set(String name, Object value) ;
	public void remove(String name) ;
}
