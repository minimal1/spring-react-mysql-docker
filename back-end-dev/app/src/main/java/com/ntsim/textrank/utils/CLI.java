package com.ntsim.textrank.utils;

import org.json.JSONArray;
import com.ntsim.textrank.Summarizer;


public class CLI {
    public static void main(String[] args) {
        System.out.println(new JSONArray(new Summarizer(args[0]).summarize()));
    }
}
