package com.ntsim.textrank;

import com.ntsim.textrank.graph.GraphBuilder;
import com.ntsim.textrank.hashtag.Hashtag_List;
import com.ntsim.textrank.sentence.SentenceSource;
import com.ntsim.textrank.sentence.ranker.SentenceRanker;

import java.util.*;
import java.util.stream.Collectors;

public class Summarizer {

    private String content;

    public Summarizer(String content) {
        this.content = content;
    }

    public List<String> summarize() {
    	/*
    	 * 가져온 텍스트를 활용해 TextRank를 진행한다.
    	 * */
        final SentenceSource sentenceSource = new SentenceSource(content);
        
        
        /*
         * sentences -> SentenceSplitter를 활용하여 분리한 모든 문장들.
         * extractedSentences -> 문장과 문장에 포함된 단어들로 이루어진 Map 형태의 변수.
         * graphBuilder -> extractedSentences를 기반으로 문장 별 가중치를 가지는 graph.
         * sentenceRanker -> graphBuilder에서 Score가 가장 높은 3개의 문장을 리스트에 담아 리턴한다.
         * */
        final List<String> sentences = sentenceSource.getSentences();
        final Map<String, List<String>> extractedSentences = sentenceSource.getExtractedSentences();
        final Hashtag_List hashtag = new Hashtag_List(extractedSentences);
        List<String> hashtag_list = hashtag.getHashtag();

        final GraphBuilder graphBuilder = new GraphBuilder(extractedSentences);
        final List<String> sentenceRanker = new SentenceRanker(sentences, graphBuilder.build()).getRankedSentences()
                .stream().map(Map.Entry::getKey).collect(Collectors.toList());
        
        // 주어진 형태가 없으면 가져올 수 없음.
        String title = sentences.get(0);
        String professor = sentences.get(2).trim();
        professor = professor.replaceAll("\\s","");
        
        // 제목과 해쉬태그를 비교해 더욱 정확한 해쉬태그를 가져옴.
        List<String> extracted_hashtag = new ArrayList<String>();
        for(String tag : hashtag_list) {
        	if(title.contains(tag)) {
        		extracted_hashtag.add(tag);
        	}
        	if(extracted_hashtag.size() == 3) {
        		break;
        	}
        }
        
        sentenceRanker.add(title);
        sentenceRanker.add(professor);
        sentenceRanker.add(String.join("/", extracted_hashtag));
        return sentenceRanker;
    }
}


