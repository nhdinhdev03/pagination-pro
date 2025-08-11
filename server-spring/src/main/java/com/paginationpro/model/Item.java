package com.paginationpro.model;

public class Item {
  public int id;
  public String name;
  public String createdAt; // ISO

  public Item(int id, String name, String createdAt) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }
}
