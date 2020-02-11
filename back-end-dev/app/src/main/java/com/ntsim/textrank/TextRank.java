package com.ntsim.textrank;

import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;

public class TextRank {
//	private String text;
	public TextRank() throws IOException {
//		this.text = getText();
	}
	public String getText(File pdfFile) throws IOException {
		/*
		 * s3에서 가져온 파일들을 분석함.
		 * */
//		File myFile = new File("src/main/resources/paper.pdf");
        try (PDDocument doc = PDDocument.load(pdfFile)) {

            PDFTextStripper stripper = new PDFTextStripper();
            /*
             * pdf를 읽을 때 position 별로 받고, 전체를 한 개로 받지 않도록 lineSeparator를 이용함.
             */
            stripper.setSortByPosition(true);
//            stripper.setStartPage(6);
//            stripper.setEndPage(10);
            stripper.setLineSeparator(" ");
            String text = stripper.getText(doc);

            return text;
        }
	}
}