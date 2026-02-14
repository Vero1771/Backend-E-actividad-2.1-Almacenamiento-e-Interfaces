const ventas = require('../db/ventas');

class VentasModel {
  _validarDatos(venta) {
    const errors = [];
    const camposObligatorios = ['metodo_pago', 'total', 'fecha'];
    for (const campo of camposObligatorios) {
      if (venta[campo] === undefined || venta[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (typeof(venta.metodo_pago) !== "string") {
      errors.push("El método de pago de la venta debe ser una cadena de texto");
    }
    
    if (isNaN(venta.total) || venta.total < 0) {
      errors.push("El total de la venta debe ser un número válido");
    }

    const fecha = new Date(venta.fecha);

    if (isNaN(fecha.getTime())) {
      errors.push("Verifique el formato de la fecha");
    }

    return errors;
  }
  mostrar_ventas_por_rango(rango) {

    //Verificar que hay fecha de inicio y fin
    const { inicio, fin } = rango;
    if (!inicio || !fin) {
      return {
        code: 400,
        message: "Falta el rango de fechas",
        result: []
      };
    }

    if (ventas.length > 0) {

      const fechaInicio = new Date(inicio);
      const fechaFin = new Date(fin);

      // Validar el formato de la fecha 
      if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
        return {
          code: 400,
          message: "El formato de la fecha es inválido",
          result: []
        };
      }

      // Validar que la Fecha de Inicio sea mayor
      if (fechaInicio > fechaFin) {
        return {
          code: 400,
          message: "La fecha de inicio no puede ser mayor a la fecha de fin",
          result: []
        };
      }

      const ventasRecientes = ventas.filter(venta => {
        const soloFechaVenta = venta.fecha.split(' ')[0];
        return soloFechaVenta >= inicio && soloFechaVenta <= fin;
      }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      return {
        code: 200,
        message: "consulta completada con éxito",
        result: ventasRecientes
      };

    } else {
      return {
        code: 404,
        message: "no hay ventas registradas",
        result: []
      };
    }
  }
  ingresar_venta(venta) {
    const error = this._validarDatos(venta);
    if (error.length > 0) {
      return {
        code: 400,
        message: "Ha ocurrido un problema al ingresar los datos",
        result: error
      };
    }

    let new_id;
    if (ventas.length > 0) {
      new_id = ventas[ventas.length - 1].id + 1;
    } else {
      new_id = 1;
    }
    ventas.push({
      id: new_id,
      fecha: venta.fecha,
      total: Number(venta.total),
      metodo_pago: venta.metodo_pago
    });
    return {
      code: 200,
      message: "venta agregada con éxito",
      result: ventas
    };
  }
}

module.exports = new VentasModel();