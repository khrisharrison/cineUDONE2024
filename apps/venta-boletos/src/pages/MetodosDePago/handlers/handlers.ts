import axios from 'axios';
import { PagoMovil, PagoTransferencia, DatosPago } from '../types/index';

export const handleTipoPagoChange = (
  setTipoPago: (tipoPago: string) => void,
  setBancoSeleccionado: (banco: string) => void,
  setNumeroTelefono: (telefono: string) => void,
  setNumeroTransferencia: (transferencia: string) => void,
  setCedula: (cedula: string) => void,
  setCorreoPaypal: (correo: string) => void,
  setPagoEstado: (estado: 'pendiente' | 'confirmado' | 'rechazado' | null) => void,
  setReferencia: (referencia: string) => void
) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTipoPago = e.target.value;
    setTipoPago(selectedTipoPago);
    setBancoSeleccionado('');
    setNumeroTelefono('');
    setNumeroTransferencia('');
    setCedula('');
    setPagoEstado(null);
    setReferencia('');
  };
};

export const handleBancoChange = (
  tipoPago: string,
  datosPagoMovil: PagoMovil[],
  datosPagoTransferencia: PagoTransferencia[],
  setBancoSeleccionado: (banco: string) => void,
  setNumeroTelefono: (telefono: string) => void,
  setNumeroTransferencia: (transferencia: string) => void,
  setCedula: (cedula: string) => void,
  setPagoEstado: (estado: 'pendiente' | 'confirmado' | 'rechazado' | null) => void,
  setReferencia: (referencia: string) => void
) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBanco = e.target.value;
    setBancoSeleccionado(selectedBanco);

    if (tipoPago === 'pagoMovil') {
      const dato = datosPagoMovil.find((d) => d.id === parseInt(selectedBanco));
      if (dato) {
        setNumeroTelefono(dato.nroTelefono || '');
        setCedula(dato.cedula || '');
      }
    } else if (tipoPago === 'transferencia') {
      const dato = datosPagoTransferencia.find(
        (d) => d.id === parseInt(selectedBanco)
      );
      if (dato) {
        setNumeroTransferencia(dato.nroCuenta || '');
        setCedula(dato.cedula || '');
      }
    }
    setPagoEstado(null);
    setReferencia('');
  };
};

export const handleReferenciaChange = (
  setReferencia: (referencia: string) => void,
  setErrorReferencia: (error: string) => void
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,4}$/.test(value)) {
      setReferencia(value);
      setErrorReferencia('');
    } else {
      setErrorReferencia('La referencia debe ser un número de 4 dígitos.');
    }
  };
};

export const handlePago = async (
  referencia: string,
  tipoPago: string,
  bancoSeleccionado: string,
  datosPagoMovil: PagoMovil[],
  datosPagoTransferencia: PagoTransferencia[],
  total: string | null,
  setPagoEstado: (estado: 'pendiente' | 'confirmado' | 'rechazado' | null) => void,
  correo: string,
  cantBoletos: string,
  setErrorReferencia: (error: string) => void,
  fechaFuncion: string, 
  horaFuncion: string 
) => {
  try {
    // Validaciones
    if (!/^\d{4}$/.test(referencia)) {
      setErrorReferencia('La referencia debe tener exactamente 4 dígitos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setErrorReferencia('El correo electrónico no es válido.');
      return;
    }

    if (!/^\d+$/.test(cantBoletos) || parseInt(cantBoletos) <= 0) {
      setErrorReferencia('La cantidad de boletos debe ser un número entero positivo.');
      return;
    }

    setPagoEstado('pendiente');

    const banco =
      tipoPago === 'pagoMovil'
        ? datosPagoMovil.find((d) => d.id === parseInt(bancoSeleccionado))
        : datosPagoTransferencia.find((d) => d.id === parseInt(bancoSeleccionado));

    if (!banco) {
      throw new Error('No se encontró el banco seleccionado.');
    }

    if (!total || parseFloat(total) <= 0) {
      throw new Error('El monto debe ser un número positivo.');
    }

    const bancoCodigo = banco.codigoBanco.codigo;

    // Fecha en formato SQL compatible: 'YYYY-MM-DD HH:MM:SS'
    const now = new Date();
    const formattedFecha = now.toISOString().slice(0, 19).replace('T', ' ');

    const datosPago: DatosPago = {
      referencia,
      metodo: tipoPago === 'pagoMovil' ? 'Pago Movil' : 'Transferencia',
      fechaFuncion, 
      horaFuncion, 
      monto: parseFloat(total),
      id: banco.id,
      fecha: formattedFecha,
      estado: 'confirmado',
      codigoBanco: bancoCodigo,
      correo,
      cantBoletos: parseInt(cantBoletos),
    };
    
    console.log('Datos enviados a la API:', datosPago); 

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(
      'http://localhost:3002/api/paymentinfo',
      datosPago,
      config
    );

    console.log('Respuesta del servidor:', response.data);

    // Si la respuesta del servidor indica que el pago fue exitoso, establece el estado en 'confirmado'
    if (response.data.estado === 'confirmado') {
      setPagoEstado('confirmado');
    } else {
      setPagoEstado('rechazado');
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    setPagoEstado('rechazado');
  }
};