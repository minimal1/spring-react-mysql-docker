package com.ntsim;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

    @GetMapping("/")
    public String getHome() {
        System.out.println("test2");
        return "home";
    }
    @GetMapping("/2")
    public String getHome2() {
        return "home2";
    }
}
