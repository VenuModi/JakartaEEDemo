package com.example.jakartaee.controller;

import com.example.jakartaee.dto.FoodDto;
import com.example.jakartaee.entity.Food;
import com.example.jakartaee.mapper.Mapper;
import com.example.jakartaee.repository.FoodRepository;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.URI;
import java.util.List;

@Path("/foods")
public class FoodController {

    @Inject
    FoodRepository repository;

    @Inject
    Mapper mapper;

//    @Inject
//    Client client;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<FoodDto> getAll(@QueryParam("name") String name) {
        if (name == null)
            return mapper.map(repository.findAll());

        return mapper.map(repository.findAllByName(name));
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns food object",
                    content = @Content(schema = @Schema(implementation = FoodDto.class))),
            @ApiResponse(responseCode = "404", description = "Id not found")})
    public Response getOne(@PathParam("id") Long id) {
        var food = repository.findOne(id);
        if (food.isPresent())
            return Response.ok().entity(food.get()).build();
        throw new NotFoundException("Id: " + id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addOne(@Valid Food food) {
        repository.insertFood(food);
        return Response.created(URI.create("foods/" + food.getId())).build();
    }

    @DELETE
    @Path("/{id}")
    public void deleteOne(@PathParam("id") Long id) {
        repository.deleteFood(id);
    }


    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updDate(@PathParam("id") Long id, FoodDto food) {
        return Response.ok().entity(mapper.map(repository.update(id, mapper.map(food)))).build();
    }

//    @GET
//    @Path("/extra")
//    @Produces(MediaType.APPLICATION_JSON)
//    public FoodDto extraEndpoint(){
//        return client.target("http://localhost:8080/api/foods/17")
//                .request(MediaType.APPLICATION_JSON)
//                .get(FoodDto.class);
//    }
}
