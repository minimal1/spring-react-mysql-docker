package com.ntsim.textrank.hashtag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import static java.util.Comparator.comparing;
import static java.util.Comparator.reverseOrder;

import java.util.ArrayList;

public class Hashtag {
	private Map<String, List<String>> extractedSentences;
	
	public Hashtag(Map<String, List<String>> extractedSentences) {
		this.extractedSentences = extractedSentences;
	}
	
	public List<String> getHashtag(){
		Map<String, Integer> hashtagMap = new HashMap<String, Integer>();
		
		for (Map.Entry<String, List<String>> entrySource : extractedSentences.entrySet()) {
			for(String noun : entrySource.getValue()) {
				if(hashtagMap.containsKey(noun)) {
					hashtagMap.put(noun, hashtagMap.get(noun) + 1);
				}
				else {
					hashtagMap.put(noun, 1);
				}
			}
		}
		List<Map.Entry<String, Integer>> top3 = hashtagMap.entrySet().stream().sorted(comparing(Map.Entry::getValue, reverseOrder())).limit(5).collect(Collectors.toList());
		List<String> top3_list = new ArrayList<String>();
		for(int i=0; i<top3.size(); i++) {
			top3_list.add(top3.get(i).getKey());
		}
		String hashtag_str = String.join("/", top3_list);
		
		return top3_list;
	}
}
