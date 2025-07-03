package com.art.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MenuController {

    @GetMapping("/")
    public String redirectToMain() {
        return "home/main";
    }

    @GetMapping("/home")
    public String homePage() {
        return "home/main";
    }
    
    @GetMapping("/menu")
    public String menuPage() {
    	System.out.println("✅ MenuController 작동 확인!");
        return "home/menu"; 
    }

    @GetMapping("/about")
    public String aboutPage() {
        return "about/about";
    }

}

