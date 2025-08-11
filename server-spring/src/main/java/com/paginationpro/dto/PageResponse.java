package com.paginationpro.dto;
import java.util.List;

public class PageResponse<T> {
  public List<T> data;
  public int page;
  public int limit;
  public long total;
  public long totalPages;

  public PageResponse(List<T> data, int page, int limit, long total) {
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = (long)Math.ceil((double)total / limit);
  }

  public static <T> PageResponse<T> of(List<T> data, int page, int limit, long total) {
    return new PageResponse<>(data, page, limit, total);
  }
}
