package com.group.fetcher;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

@Controller
public class FileUploadController {

    //Upload the image to the specified folder and return the image storage path to the front end.
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public String upload(@RequestParam("pic") MultipartFile multipartFile, HttpServletRequest req ) {
        String fileName = "";

        try {
            fileName=req.getServletContext().getRealPath("uploaded")+File.separator+ (int)((Math.random() * 9 + 1) * 1000000) + multipartFile.getOriginalFilename();
            File file = new File(fileName);
            file.getParentFile().mkdirs();
            if(multipartFile == null) {
                System.out.println("file is null");
            }else {
                multipartFile.transferTo(file);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return "false," + e.getMessage();
        } catch (IOException e) {
            e.printStackTrace();
            return "false," + e.getMessage();
        }
        return fileName;
    }
}

