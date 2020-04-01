package com.ntsim.textrank;

import com.ntsim.textrank.graph.GraphBuilder;
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

        final GraphBuilder graphBuilder = new GraphBuilder(extractedSentences);
        final List<String> sentenceRanker = new SentenceRanker(sentences, graphBuilder.build()).getRankedSentences()
                .stream().map(Map.Entry::getKey).collect(Collectors.toList());
        // add Title of the paper
        sentenceRanker.add(sentences.get(0));
        // add professor
        sentenceRanker.add(sentences.get(2));
        return sentenceRanker;
    }
}


