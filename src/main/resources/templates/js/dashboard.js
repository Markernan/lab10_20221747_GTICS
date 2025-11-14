class PanelControl {
    constructor() {
        this.actualizarEstadisticas();
        setInterval(() => this.actualizarEstadisticas(), 5000);
    }

    actualizarEstadisticas() {
        const stats = this.recopilarEstadisticas();
        this.mostrarEstadisticas(stats);
    }

    recopilarEstadisticas() {
        const statsDepartamentos = window.gestorDepartamentos?.obtenerEstadisticas() || { total: 0 };
        const statsReclutamiento = window.gestorReclutamiento?.obtenerEstadisticas() || { totalInicial: 0, totalReclutados: 0 };

        let totalAgentes = 0;
        if (window.gestorAgentes) {
            totalAgentes = 15;
        }

        return {
            totalDepartamentos: statsDepartamentos.total,
            totalReclutadoresInicial: statsReclutamiento.totalInicial,
            totalReclutadoresNuevos: statsReclutamiento.totalReclutados,
            totalEmpleados: totalEmpleados,
            consultasRealizadas: this.obtenerTotalConsultas()
        };
    }

    obtenerTotalConsultas() {

        return Math.floor(Math.random() * 50) + 20;
    }

    mostrarEstadisticas(stats) {
        const container = $('#estadisticas-container');

        container.empty();

        const cards = `
            <div class="col-md-3 mb-3">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <h5 class="card-title">Agentes por Universidad</h5>
                        <h2 class="card-text">${stats.totalUniversidades}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card text-white bg-success">
                    <div class="card-body">
                        <h5 class="card-title">Reclutadores Iniciales</h5>
                        <h2 class="card-text">${stats.totalReclutadoresInicial}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card text-white bg-warning">
                    <div class="card-body">
                        <h5 class="card-title">Nuevos Reclutados</h5>
                        <h2 class="card-text">${stats.totalReclutadoresNuevos}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card text-white bg-info">
                    <div class="card-body">
                        <h5 class="card-title">Total Empleados</h5>
                        <h2 class="card-text">${stats.totalAgentes}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card text-white bg-dark">
                    <div class="card-body">
                        <h5 class="card-title">Consultas API</h5>
                        <h2 class="card-text">${stats.consultasRealizadas}</h2>
                    </div>
                </div>
            </div>
        `;

        container.append(cards);
    }
}

$(document).ready(() => {
    window.panelControl = new PanelControl();
});