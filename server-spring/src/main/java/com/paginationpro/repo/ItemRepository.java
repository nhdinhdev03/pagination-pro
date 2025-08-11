package com.paginationpro.repo;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.paginationpro.model.Item;

public class ItemRepository {

    private static final List<Item> items = new ArrayList<>();

    static {
        long now = Instant.now().toEpochMilli();
        for (int i = 0; i < 250; i++) {
            items.add(new Item(i + 1, "Item #" + (i + 1), Instant.ofEpochMilli(now - i * 60_000).toString()));
        }
    }

    public static List<Item> findPage(int page, int limit, String sort) {
        String[] s = (sort != null ? sort : "createdAt:DESC").split(":");
        String key = s[0];
        String dir = (s.length > 1 ? s[1] : "DESC").toUpperCase();

        List<Item> sorted = new ArrayList<>(items);
        Comparator<Item> cmp;
        if ("id".equalsIgnoreCase(key)) {
            cmp = Comparator.comparingInt(it -> it.id);
        } else {
            cmp = Comparator.comparing(it -> it.createdAt);
        }
        if ("DESC".equals(dir)) {
            cmp = cmp.reversed();
        }
        sorted.sort(cmp);

        int start = (page - 1) * limit;
        int end = Math.min(start + limit, sorted.size());
        if (start >= sorted.size()) {
            return List.of();
        }
        return sorted.subList(start, end);
    }

    public static long count() {
        return items.size();
    }
}
