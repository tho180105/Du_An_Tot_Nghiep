package store.com.Service.Impl;

import java.io.File;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import store.com.Service.UploadService;


@Service
public class UploadServiceImpl implements UploadService{
	@Autowired
	ServletContext app;

	public File save(MultipartFile file, String folder) {
		File dir = new File(app.getRealPath("/Admin/assets/img/"+folder));
		// String test = temp.getAbsolutePath().substring(0,temp.getAbsolutePath().lastIndexOf("webapp"))+"/resources/static/Admin/assets/img/";
		
		// File dir = new File(test + folder);
		if(!dir.exists()) {
			dir.mkdirs();
		}
		
		System.out.println(dir.getAbsolutePath());
		String s = System.currentTimeMillis() + file.getOriginalFilename();
		String name = Integer.toHexString(s.hashCode()) + s.substring(s.lastIndexOf("."));
		try {
			File savedFile = new File(dir, name);
			file.transferTo(savedFile);
			System.out.println(savedFile.getAbsolutePath());
			return savedFile;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	public File saveimg(MultipartFile file, String folder) {
        File dir = new File(app.getRealPath("/Admin/assets/img/"+folder));
        // String test = temp.getAbsolutePath().substring(0,temp.getAbsolutePath().lastIndexOf("webapp"))+"/resources/static/Admin/assets/img/";
        
        // File dir = new File(test + folder);
        if(!dir.exists()) {
            dir.mkdirs();
        }
        String name =  file.getOriginalFilename().substring(0,file.getOriginalFilename().lastIndexOf("."));
        try {
            File savedFile = new File(dir, name);
            file.transferTo(savedFile);
            System.out.println(savedFile.getAbsolutePath());
            return savedFile;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
