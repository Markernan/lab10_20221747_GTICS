class GestorEmpleados {
    constructor() {
        this.apiKey = 'EMP2024SECRETKEY';
        this.apiBaseUrl = 'http://localhost:8080/api/empleados';
        this.inicializarEventos();
        this.cargarEmpleados();
    }

    inicializarEventos() {
        $('#guardarEmpleado').click(() => this.guardarEmpleado());
        $('#empleadoModal').on('hidden.bs.modal', () => this.limpiarFormulario());
    }

    cargarEmpleados() {
        $.ajax({
            url: this.apiBaseUrl,
            
            method: 'GET',

            headers: { 'X-API-KEY': this.apiKey },
            success: (empleados) => this.mostrarEmpleados(empleados),
            error: (xhr) => console.error('Error cargando empleados:', xhr)
        });
    }

    mostrarEmpleados(empleados) {
        const tbody = $('#empleados-body');
        tbody.empty();

        empleados.forEach(empleado => {
            const fila = `
                <tr>
                    <td>${empleado.nombreCompleto}</td>
                    <td>${empleado.puesto}</td>
                    <td>${empleado.departamento}</td>
                    <td>${empleado.email}</td>
                    
                    <td><span class="badge ${empleado.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}">${empleado.estado}</span></td>
                    <td>
                        <button class="btn btn-sm btn-warning me-1" onclick="gestorEmpleados.editarEmpleado('${empleado.id}')">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="gestorEmpleados.eliminarEmpleado('${empleado.id}')">Eliminar</button>
                    </td>
                </tr>
            `;
            tbody.append(fila);
        });
    }

    guardarEmpleado() {
        const empleadoData = {
            nombreCompleto: $('#nombreCompleto').val(),

            puesto: $('#puesto').val(),

            departamento: $('#departamento').val(),

            email: $('#email').val(),
            pais: $('#pais').val(),
            estado: $('#estado').val()
        };

        const empleadoId = $('#empleadoId').val();
        const metodo = empleadoId ? 'PUT' : 'POST';

        const url = empleadoId ? `${this.apiBaseUrl}/${empleadoId}` : this.apiBaseUrl;

        $.ajax({
            url: url,
            method: metodo,
            headers: { 'X-API-KEY': this.apiKey },
            contentType: 'application/json',
            data: JSON.stringify(empleadoData),
            success: () => {
                $('#empleadoModal').modal('hide');
                this.cargarEmpleados();
                this.mostrarMensaje('Empleado guardado exitosamente', 'success');
            },
            error: (xhr) => {
                this.mostrarMensaje('Error guardando empleado', 'error');
                console.error('Error:', xhr);
            }
        });
    }

    editarEmpleado(id) {
        $.ajax({
            url: `${this.apiBaseUrl}/${id}`,
            method: 'GET',
            headers: { 'X-API-KEY': this.apiKey },
            success: (empleado) => {

                $('#empleadoId').val(empleado.id);

                $('#nombreCompleto').val(empleado.nombreCompleto);
                $('#puesto').val(empleado.puesto);

                $('#departamento').val(empleado.departamento);

                $('#email').val(empleado.email);

                $('#pais').val(empleado.pais);
                $('#estado').val(empleado.estado);
                $('#modalTitulo').text('Editar Empleado');
                $('#empleadoModal').modal('show');
            }
        });
    }

    eliminarEmpleado(id) {
        if (confirm('¿Está seguro de eliminar este empleado?')) {
            $.ajax({

                url: `${this.apiBaseUrl}/${id}`,

                method: 'DELETE',

                headers: { 'X-API-KEY': this.apiKey },

                success: () => {

                    this.cargarEmpleados();
                    this.mostrarMensaje('Empleado eliminado exitosamente', 'success');
                },
                error: (xhr) => {
                    this.mostrarMensaje('Error eliminando empleado', 'error');
                    console.error('Error:', xhr);
                }
            });
        }
    }

    limpiarFormulario() {
        $('#formEmpleado')[0].reset();

        $('#empleadoId').val('');

        $('#modalTitulo').text('Nuevo Empleado');
    }

    mostrarMensaje(mensaje, tipo) {
        const alertClass = tipo === 'success' ? 'alert-success' : 'alert-danger';
        const alert = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${mensaje}
            
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>`;
        $('.container').prepend(alert);

    }
}


$(document).ready(() => {

    window.gestorEmpleados = new GestorEmpleados();
});