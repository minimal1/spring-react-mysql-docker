package com.ntsim.textrank.graph;

import org.jgrapht.graph.DefaultWeightedEdge;
import org.jgrapht.graph.SimpleWeightedGraph;
import com.ntsim.textrank.sentence.similarity.Similarity;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public class GraphBuilder {
    private Map<String, List<String>> extractedSentences;

    public GraphBuilder(Map<String, List<String>> extractedSentences) {
        this.extractedSentences = extractedSentences;
    }

    public SimpleWeightedGraph<String, DefaultWeightedEdge> build(){
        final SimpleWeightedGraph<String, DefaultWeightedEdge> graph = new SimpleWeightedGraph<>(DefaultWeightedEdge.class);

        extractedSentences.forEach((s, strings) -> graph.addVertex(s));

        for (Map.Entry<String, List<String>> entrySource : extractedSentences.entrySet()) {
            for (Map.Entry<String, List<String>> entryTarget : extractedSentences.entrySet()) {
                if (!Objects.equals(entrySource.getKey(), entryTarget.getKey())) {

                    final float similarity = new Similarity(entrySource, entryTarget).getSimilarity();

                    if (similarity > 0 && graph.getEdge(entrySource.getKey(), entryTarget.getKey()) == null) {
                        DefaultWeightedEdge e = graph.addEdge(entrySource.getKey(), entryTarget.getKey());
                        graph.setEdgeWeight(e, similarity);
                    }
                }
            }
        }
        return graph;
    }

}
