class GestorDepartamentos {
    constructor() {
        this.personas = [];
        this.filtros = {};
        this.inicializarEventos();
        this.cargarDatosExternos();
    }

    inicializarEventos() {
        $('#filtro-nombre').on('input', () => this.aplicarFiltros());
        $('#filtro-departamento').change(() => this.aplicarFiltros());
    }

    async cargarDatosExternos() {
        await this.cargarDepartamentoTI();
        await this.cargarDepartamentoRH();
        this.mostrarPersonas();
    }

    cargarDepartamentoTI() {
        const empleadosTI = [
            {
                id: 1,
                nombre: "Ana García",
                puesto: "Desarrolladora Senior",
                departamento: "TI",
                email: "ana.garcia@empresa.com",
                foto: "https://randomuser.me/api/portraits/women/1.jpg",
                habilidades: ["Java", "Spring Boot", "React"],
                proyectos: 12
            },
            {
                id: 2,
                nombre: "Carlos López",
                puesto: "Arquitecto de Software",
                departamento: "TI",
                email: "carlos.lopez@empresa.com",
                foto: "https://randomuser.me/api/portraits/men/1.jpg",
                habilidades: ["Microservicios", "AWS", "Docker"],
                proyectos: 8
            }
        ];
        this.personas = this.personas.concat(empleadosTI);
    }

    cargarDepartamentoRH() {
        const empleadosRH = [
            {
                id: 3,
                nombre: "María Rodríguez",
                puesto: "Especialista en Talento",
                departamento: "RH",
                email: "maria.rodriguez@empresa.com",
                foto: "https://randomuser.me/api/portraits/women/2.jpg",
                habilidades: ["Reclutamiento", "Capacitación", "Desarrollo Organizacional"],
                contrataciones: 45
            }
        ];
        this.personas = this.personas.concat(empleadosRH);
    }

    mostrarPersonas() {
        const container = $('#departamentos-container');
        container.empty();

        const personasFiltradas = this.filtrarPersonas();

        personasFiltradas.forEach(persona => {
            const card = `
                <div class="col-md-3 mb-4">
                
                    <div class="card h-100 persona-card" data-id="${persona.id}">
                        <img src="${persona.foto}" class="card-img-top" alt="${persona.nombre}">
                        <div class="card-body">
                        
                            <h5 class="card-title">${persona.nombre}</h5>
                            <p class="card-text">
                                <strong>Puesto:</strong> ${persona.puesto}<br>
                                <strong>Departamento:</strong> ${persona.departamento}
                            </p>
                        </div>
                    </div>
                </div>
            `;
            container.append(card);
        });

        $('#total-personas').text(this.personas.length);

        $('#total-filtradas').text(personasFiltradas.length);

        $('.persona-card').click((e) => {

            const id = $(e.currentTarget).data('id');
            this.mostrarDetallesPersona(id);
            
        });
    }

    filtrarPersonas() {
        let filtradas = this.personas;

        if (this.filtros.nombre) {
            filtradas = filtradas.filter(p =>
                p.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase())
            );
        }

        if (this.filtros.departamento) {
            filtradas = filtradas.filter(p => p.departamento === this.filtros.departamento);
        }

        return filtradas;
    }

    aplicarFiltros() {
        this.filtros = {
            nombre: $('#filtro-nombre').val(),
            departamento: $('#filtro-departamento').val()
        };
        this.mostrarPersonas();
    }

    mostrarDetallesPersona(id) {
        const persona = this.personas.find(p => p.id === id);
        if (persona) {
            const modalHtml = `
                <div class="modal fade" id="personaModal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Detalles de ${persona.nombre}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="${persona.foto}" class="img-fluid rounded" alt="${persona.nombre}">
                                    </div>
                                    <div class="col-md-8">
                                        <h4>${persona.nombre}</h4>
                                        <p><strong>Puesto:</strong> ${persona.puesto}</p>
                                        <p><strong>Departamento:</strong> ${persona.departamento}</p>
                                        <p><strong>Email:</strong> ${persona.email}</p>
                                        <h5>Información Adicional:</h5>
                                        <pre>${JSON.stringify(persona, null, 2)}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $('#personaModal').remove();
            $('body').append(modalHtml);

            const modal = new bootstrap.Modal(document.getElementById('personaModal'));
            modal.show();
        }
    }

    obtenerEstadisticas() {
        const porDepartamento = {};
        this.personas.forEach(persona => {
            porDepartamento[persona.departamento] = (porDepartamento[persona.departamento] || 0) + 1;
        });

        return {
            total: this.personas.length,
            porDepartamento: porDepartamento
        };
    }
}

$(document).ready(() => {
    window.gestorDepartamentos = new GestorDepartamentos();
});