package com.ntsim.textrank;

import java.io.File;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;

public class TextRank {
	public static void main(String[] args) throws IOException {

        File myFile = new File("src/main/resources/paper.pdf");

        try (PDDocument doc = PDDocument.load(myFile)) {

            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);
            stripper.setStartPage(6);
//            stripper.setEndPage(10);
            stripper.setLineSeparator("");
            String text = stripper.getText(doc);
            String simple = "[\\.?!]\\s+";      
            String[] splitString = (text.split(simple));     
            for (String string : splitString)   
               System.out.println(string + "\n");
//            System.out.println("Text size: " + text.length() + " characters:");
//            System.out.println(text);
        }
    }
}