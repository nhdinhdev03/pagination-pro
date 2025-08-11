package com.paginationpro.controller;

import com.paginationpro.dto.PageResponse;
import com.paginationpro.model.Item;
import com.paginationpro.repo.ItemRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ItemController {

    @GetMapping("/api/items")
    public PageResponse<Item> list(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "limit", defaultValue = "20") int limit,
            @RequestParam(name = "sort", defaultValue = "createdAt:DESC") String sort
    ) {
        if (page < 1) {
            page = 1;
        }
        if (limit < 1) {
            limit = 20;
        }
        if (limit > 100) {
            limit = 100;
        }
        List<Item> data = ItemRepository.findPage(page, limit, sort);
        long total = ItemRepository.count();
        return PageResponse.of(data, page, limit, total);
    }
}
