package com.example.lab10_20221747_gtics.controller;
import java.net.URL;
import java.util.ResourceBundle;

import com.example.lab10_20221747_gtics.model.entity.agente;
import com.example.lab10_20221747_gtics.repository.AgenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import java.util.List;

@RestController
@RequestMapping("/api/agentes")
@CrossOrigin(origins = "*")
public class AgenteController {

    @Autowired
    private AgenteRepository empleadoRepositorio;

    private final String API_KEY = "EMP2024SECRETKEY";

    private boolean validarApiKey(@RequestHeader(value = "X-API-KEY", required = false) String apiKey) {
        return API_KEY.equals(apiKey);
    }

    @GetMapping
    public Mono<ResponseEntity<?>> listarEmpleados(@RequestHeader("X-API-KEY") String apiKey) {
        if (!validarApiKey(apiKey)) {

            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Api key inválida"));
        }


        return empleadoRepositorio.findAll()

                .subList()

                .map(empleados -> ResponseEntity.ok().body(empleados));

    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<?>> obtenerEmpleado(@PathVariable String id,
                                                   @RequestHeader("X-API-KEY") String apiKey) {
        if (!validarApiKey(apiKey)) {

            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Api key inválida"));
        }


        return empleadoRepositorio.findById(id)

                .map(empleado -> ResponseEntity.ok().body(empleado))

                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<ResponseEntity<?>> crearEmpleado(@Valid @RequestBody Empleado empleado,
                                                 @RequestHeader("X-API-KEY") String apiKey) {
        if (!validarApiKey(apiKey)) {

            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Api key inválida"));
        }

        return empleadoRepositorio.save(empleado)

                .map(nuevoEmpleado -> ResponseEntity.status(HttpStatus.CREATED).body(nuevoEmpleado));
    }

    @PutMapping("/{id}")

    public Mono<ResponseEntity<?>> actualizarEmpleado(@PathVariable String id,
                                                      @Valid @RequestBody Agente agente,
                                                      @RequestHeader("X-API-KEY") String apiKey) {
        if (!validarApiKey(apiKey)) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Api key inválida"));
        }

        return empleadoRepositorio.findById(id)
                .flatMap(empleadoExistente -> {

                    empleadoExistente.setNombreCompleto(empleado.getNombreCompleto());
                    empleadoExistente.setCarrera(empleado.getCarrera());

                    empleadoExistente.setUniversidad(empleado.getUniversidad());
                    empleadoExistente.setEmail(empleado.getEmail());

                    empleadoExistente.setPais(empleado.getPais());

                    empleadoExistente.setEstado(empleado.getEstado());
                    return empleadoRepositorio.save(empleadoExistente);
                })
                .map(empleadoActualizado -> ResponseEntity.ok().body(empleadoActualizado))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<?>> eliminarEmpleado(@PathVariable String id,
                                                    @RequestHeader("X-API-KEY") String apiKey) {
        if (!validarApiKey(apiKey)) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Api key inválida"));
        }

        return empleadoRepositorio.findById(id)
                .flatMap(empleado -> empleadoRepositorio.delete(empleado))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}