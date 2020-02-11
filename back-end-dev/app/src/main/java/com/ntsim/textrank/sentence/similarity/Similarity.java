package com.ntsim.textrank.sentence.similarity;

import com.ntsim.textrank.set.SetOperator;

import java.util.List;
import java.util.Map;

public class Similarity {
    private Map.Entry<String, List<String>> entrySource;
    private Map.Entry<String, List<String>> entryTarget;

    public Similarity(Map.Entry<String, List<String>> entrySource, Map.Entry<String, List<String>> entryTarget) {
        this.entrySource = entrySource;
        this.entryTarget = entryTarget;
    }

    public float getSimilarity() {
        final List<String> intersection = SetOperator.intersection(entrySource.getValue(), entryTarget.getValue());
        return (float) intersection.size() / (float) (Math.sqrt(entrySource.getValue().size()) * Math.sqrt(entryTarget.getValue().size()));
    }

}
