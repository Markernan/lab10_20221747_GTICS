package com.example.lab10_20221747_gtics.repository;

import com.example.lab10_20221747_gtics.model.entity.agente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgenteRepository<Flux> extends JpaRepository<agente, String> {
    <Flux> Flux<agente> findByEstado(String estado);
    <Flux> Flux<agente> findByUniversidad(String universidad);
}
