package com.ntsim.textrank.set;

import java.util.ArrayList;
import java.util.List;

public class SetOperator {
    public static <T> List<T> intersection(List<T> list1, List<T> list2) {
        List<T> list = new ArrayList<>();

        for (T t : list1) {
            if (list2.contains(t)) {
                list.add(t);
            }
        }

        return list;
    }
}
