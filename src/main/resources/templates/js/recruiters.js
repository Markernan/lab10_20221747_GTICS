class GestorReclutamiento {
    constructor() {
        this.candidatos = [];
        this.inicializarEventos();
        this.cargarCandidatosIniciales();
    }

    inicializarEventos() {
        $('#reclutar-btn').click(() => this.reclutarCandidato());
    }

    cargarCandidatosIniciales() {
        for (let i = 0; i < 10; i++) {
            this.obtenerCandidatoAleatorio();
        }
    }

    reclutarCandidato() {
        this.obtenerCandidatoAleatorio();
    }

    obtenerCandidatoAleatorio() {
        $.ajax({
            url: 'https://randomuser.me/api/',
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                const usuario = data.results[0];
                const candidato = this.crearCandidato(usuario);
                this.candidatos.push(candidato);
                this.mostrarCandidatos();
            },
            error: (xhr) => console.error('Error obteniendo candidato:', xhr)
        });
    }

    crearCandidato(usuario) {
        const rangos = ['Recluta Junior', 'Especialista', 'Senior', 'Líder de Equipo'];
        const descripciones = [
            'Nuevo talento con potencial de crecimiento',
            'Experiencia comprobada en proyectos similares',
            'Líder natural con habilidades de gestión',
            'Especialista técnico con certificaciones'
        ];

        return {
            id: usuario.login.uuid,
            foto: usuario.picture.large,
            nombre: `${usuario.name.first} ${usuario.name.last}`,
            pais: usuario.location.country,
            email: usuario.email,
            rango: rangos[Math.floor(Math.random() * rangos.length)],
            descripcion: descripciones[Math.floor(Math.random() * descripciones.length)],
            datosCompletos: usuario
        };
    }

    mostrarCandidatos() {
        const container = $('#candidatos-container');
        container.empty();

        this.candidatos.forEach(candidato => {
            const card = `
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        <img src="${candidato.foto}" class="card-img-top" alt="${candidato.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${candidato.nombre}</h5>
                            <p class="card-text">
                                <strong>País:</strong> ${candidato.pais}<br>
                                <strong>Email:</strong> ${candidato.email}<br>
                                <strong>Rango:</strong> ${candidato.rango}<br>
                                <small class="text-muted">${candidato.descripcion}</small>
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-danger btn-sm" onclick="gestorReclutamiento.eliminarCandidato('${candidato.id}')">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.append(card);
        });
    }

    eliminarCandidato(id) {
        this.candidatos = this.candidatos.filter(c => c.id !== id);
        this.mostrarCandidatos();
    }

    obtenerEstadisticas() {
        return {
            totalInicial: 10,
            totalReclutados: Math.max(0, this.candidatos.length - 10)
        };
    }
}

// Inicializar
$(document).ready(() => {
    window.gestorReclutamiento = new GestorReclutamiento();
});