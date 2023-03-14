package com.example.jakartaee.dto;

import com.example.jakartaee.entity.Food;

import java.math.BigDecimal;

public class FoodDto {
    private Long id;
    String name;

    String category;

    BigDecimal price;

    public FoodDto() {
    }

    public FoodDto(Food food) {
        this.id = food.getId();
        this.name = food.getName();
        this.category = food.getCategory();
        this.price = food.getPrice();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
