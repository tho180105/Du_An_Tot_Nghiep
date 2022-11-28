package store.com.Service;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface UploadService {
	public File save(MultipartFile file, String folder) ;
	public File saveimg(MultipartFile file, String folder) ;
}
