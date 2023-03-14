package com.example.jakartaee.validate;

import com.example.jakartaee.entity.Food;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FoodValidator {

    public boolean validate(Food food){
        return food.getName() != null && !food.getName().isEmpty();
    }
}
