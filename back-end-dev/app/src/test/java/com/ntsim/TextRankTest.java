package com.ntsim;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import java.io.IOException;

import com.ntsim.textrank.Summarizer;
import com.ntsim.textrank.TextRank;

public class TextRankTest
        extends TestCase {
    /*
     * pdf에서 입력받은 text를 객체로 가져와 테스트 실행.
     * */
    public TextRankTest(String testName) throws IOException {
        super(testName);
        TextRank tr = new TextRank();
        String text = tr.getText();
        Summarizer summarizer = new Summarizer(text);
        for(String sentence : summarizer.summarize())
        	System.out.println(sentence);
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite() {
        return new TestSuite(TextRankTest.class);
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp() {
        assertTrue(true);
    }
}