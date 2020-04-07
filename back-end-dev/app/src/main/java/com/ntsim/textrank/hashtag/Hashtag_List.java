package com.ntsim.textrank.hashtag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import static java.util.Comparator.comparing;
import static java.util.Comparator.reverseOrder;

import java.util.ArrayList;

public class Hashtag_List {
	/* 추출된 단어들을 이용해 빈도 수를 체크한다.
	 * top5를 추출해 제목에 포함 되어있는 단어들이 해쉬 태그가 된다.
	 * */
	private Map<String, List<String>> extractedSentences;
	
	public Hashtag_List(Map<String, List<String>> extractedSentences) {
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
		List<Map.Entry<String, Integer>> top5 = hashtagMap.entrySet().stream().sorted(comparing(Map.Entry::getValue, reverseOrder())).limit(5).collect(Collectors.toList());
		List<String> top5_list = new ArrayList<String>();
		for(int i=0; i<top5.size(); i++) {
			top5_list.add(top5.get(i).getKey());
		}
		
		return top5_list;
	}
}
