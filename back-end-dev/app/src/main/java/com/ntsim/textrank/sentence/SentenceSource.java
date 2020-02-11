package com.ntsim.textrank.sentence;

import kr.bydelta.koala.data.Morpheme;
import kr.bydelta.koala.data.Sentence;
import kr.bydelta.koala.data.Word;
import kr.bydelta.koala.hnn.SentenceSplitter;
import kr.bydelta.koala.hnn.Tagger;
import java.util.Iterator;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


public class SentenceSource {
    private String article;

    public SentenceSource(String article) {
        this.article = article;
    }

    public List<String> getSentences() {
    	/*
    	 * SentenceSplitter를 사용하여 content 내에 있는 문장들을 나눔.
    	 * */
        SentenceSplitter sentenceSplitter = new SentenceSplitter();
        return sentenceSplitter.sentences(this.article);
    }

    public Map<String, List<String>> getExtractedSentences() {
    	/*
    	 * 문장과 문장에 포함된 단어 리스트를 맵으로 반환한다.
    	 * */
        final Tagger tagger = new Tagger();
        final Map<String, List<String>> parsedSentence = new LinkedHashMap<>();

        for (String sentence : getSentences()) {
        	// 문장을 나누어 사용.
            Sentence separatedSentence = tagger.tagSentence(sentence);
            // 단어들로 나누어 사용.
            Iterator<Word> iterator = separatedSentence.getNouns().iterator();
            List<String> plainNouns = new ArrayList<>();

            while (iterator.hasNext()) {
                Word word = iterator.next();
                Iterator<Morpheme> wordIterator = word.iterator();

                while (wordIterator.hasNext()) {
                    Morpheme morpheme = wordIterator.next();
                    // 형태소 분석기 Morpheme을 사용하여 형태소 중 체언(명사, 수사, 대명사) 형태소인지 확인합니다.
                    if (morpheme.isNoun()) {
                        String plainNoun = morpheme.toString().split("/")[0];
                        plainNouns.add(plainNoun);
                    }
                }
            }
            parsedSentence.put(sentence, plainNouns);
        }
        return parsedSentence;
    }

}
