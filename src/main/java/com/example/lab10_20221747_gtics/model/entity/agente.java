package com.example.lab10_20221747_gtics.model.entity;

import org.hibernate.annotations.processing.Pattern;

@Document(collection = "agente")
public class agente {

    @Id
    private String id;

    @NotBlank(message = "El nombre completo es requerido")
    private String nombreCompleto;

    @NotBlank(message = "la carrera es requerido")
    private String carrera;

    @NotBlank(message = "la universidad es requerida")
    private String universidad;

    @Email(message = "El email debe ser válido")
    @NotBlank(message = "El email es requerido")
    private String email;

    @NotBlank(message = "El país es requerido")
    private String pais;

    @Pattern(regexp = "Activo|Inactivo", message = "Estado debe ser 'Activo' o 'Inactivo'")
    private String estado;

    public agente() {}

    public void Agente(String nombreCompleto, String puesto, String departamento,
                       String email, String pais, String estado) {
        this.nombreCompleto = nombreCompleto;
        this.carrera = puesto;
        this.universidad = departamento;
        this.email = email;
        this.pais = pais;
        this.estado = estado;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }

    public String getCarrera() { return carrera; }
    public void setCarrera(String puesto) { this.carrera = carrera; }

    public String getUniversidad() { return universidad; }
    public void setUniversidad(String universidad) { this.universidad = universidad; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPais() { return pais; }
    public void setPais(String pais) { this.pais = pais; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}