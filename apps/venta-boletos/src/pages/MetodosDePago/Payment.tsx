import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../styles/payment.css';
import useFetchPagos from './services/useFetchPagos';
import {DetallesPelicula} from '../Boletos/components/DetallesPelicula';

import {
  handleTipoPagoChange,
  handleBancoChange,
  handleReferenciaChange,
  handlePago,
} from './handlers/handlers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner, // Ícono de carga
  faCheckCircle, // Ícono de éxito
  faTimesCircle, // Ícono de error
} from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
  const [tipoPago, setTipoPago] = useState('');
  const [bancoSeleccionado, setBancoSeleccionado] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [numeroTransferencia, setNumeroTransferencia] = useState('');
  const [cedula, setCedula] = useState('');
  const [correoPaypal, setCorreoPaypal] = useState('');
  const [searchParams] = useSearchParams();
  const total = searchParams.get('total') || '0';
  const monto = parseFloat(total);
  const general = searchParams.get('general') || '0';
  const children = searchParams.get('children') || '0';
  const seniors = searchParams.get('seniors') || '0';
  const fechaFuncion = searchParams.get('date'); 
  const horaFuncion = searchParams.get('time'); 
  const [referencia, setReferencia] = useState('');
  const [pagoEstado, setPagoEstado] = useState<
    'pendiente' | 'confirmado' | 'rechazado' | null
  >(null);
  const [errorReferencia, setErrorReferencia] = useState('');
  const [correo, setCorreo] = useState('');

  const cantBoletos =
    parseInt(general) + parseInt(children) + parseInt(seniors);

  const { datosPagoMovil, datosPagoTransferencia } = useFetchPagos();

  const handleTipoPago = handleTipoPagoChange(
    setTipoPago,
    setBancoSeleccionado,
    setNumeroTelefono,
    setNumeroTransferencia,
    setCedula,
    setCorreoPaypal,
    setPagoEstado,
    setReferencia
  );

  const handleBanco = handleBancoChange(
    tipoPago,
    datosPagoMovil,
    datosPagoTransferencia,
    setBancoSeleccionado,
    setNumeroTelefono,
    setNumeroTransferencia,
    setCedula,
    setPagoEstado,
    setReferencia
  );

  const handleReferencia = handleReferenciaChange(
    setReferencia,
    setErrorReferencia
  );

  return (
    <div className="flex items-start justify-center w-full min-h-screen gap-6 px-4">
      <div className="self-start w-[420px] min-h-[520px] m-2">
        <DetallesPelicula cantBoletos={cantBoletos} total={monto} />
      </div>
      <div className="self-start w-[960px] min-h-[520px] bg-black-700 p-4 m-2 border rounded-lg overflow-auto">
        <div className="h-full flex flex-col">
          <label> Tipo de pago: </label> 
          <select value={tipoPago} onChange={handleTipoPago}>
            <option value="">Seleccione un tipo de pago</option>
            <option value="pagoMovil">Pago Movil</option>
            <option value="transferencia">Transferencia</option>
          </select>
          
          <div>
            {tipoPago === 'pagoMovil' && (
            <div>
              <label>Banco: </label>
              <select value={bancoSeleccionado} onChange={handleBanco}>
                <option value="">Seleccione un banco</option>
                {datosPagoMovil.map((banco) => (
                  <option key={banco.id} value={banco.id.toString()}>
                    {banco.codigoBanco?.nombre}
                  </option>
                ))}
              </select>
              {bancoSeleccionado && (
                <div className="cuadro-fondo p-8 bg-black-700">
                  <label>Número de Teléfono: </label>
                  <input type="text" value={numeroTelefono} readOnly />
                  <br />
                  <label>Cédula: </label>
                  <input type="text" value={cedula} readOnly />
                </div>
              )}
            </div>
            )}

            {tipoPago === 'transferencia' && (
            <div>
              <label>Banco: </label>
              <select value={bancoSeleccionado} onChange={handleBanco}>
                <option value="">Seleccione un banco</option>
                {datosPagoTransferencia.map((banco) => (
                  <option key={banco.id} value={banco.id.toString()}>
                    Banco {banco.codigoBanco?.nombre}
                  </option>
                ))}
              </select>
              {bancoSeleccionado && (
                <div className="cuadro-fondo p-8 bg-black-700">
                  <label>Número de Cuenta: </label>
                  <input type="text" value={numeroTransferencia} readOnly />
                  <br />
                  <label>Cédula: </label>
                  <input type="text" value={cedula} readOnly />
                </div>
              )}
            </div>
            )}
          </div>

          {bancoSeleccionado && (
            <div className="bg-black-700 p-4 m-2 mt-5 border rounded-lg">
              <label>Referencia del pago: </label>
              <input
                type="text"
                value={referencia}
                onChange={handleReferencia}
                maxLength={4}
                placeholder="Ingrese los 4 dígitos de la referencia"
              />
              {errorReferencia && <p className="error-message">{errorReferencia}</p>}

              <label>Correo electrónico: </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingrese su correo electrónico"
              />

              {tipoPago && bancoSeleccionado && tipoPago ? (
                <button
                  className="pagar-button"
                  onClick={() =>
                    handlePago(
                      referencia,
                      tipoPago,
                      bancoSeleccionado,
                      datosPagoMovil,
                      datosPagoTransferencia,
                      total,
                      setPagoEstado,
                      correo,
                      cantBoletos.toString(),
                      setErrorReferencia,
                      fechaFuncion || '',
                      horaFuncion || ''
                    )
                  }
                  disabled={!referencia || !correo || cantBoletos <= 0}
                >
                  Pagar
                </button>
              ) : null}

              {/* Mostrar mensajes según el estado del pago */}
              {pagoEstado === 'pendiente' && (
                <p className="mensaje-pago en_revision">
                  Pago se encuentra en revisión...{' '}
                  <FontAwesomeIcon icon={faSpinner} spin />
                </p>
              )}
              {pagoEstado === 'confirmado' && (
                <p className="mensaje-pago exitoso">
                  Pago realizado satisfactoriamente.{' '}
                  <FontAwesomeIcon icon={faCheckCircle} />
                </p>
              )}
              {pagoEstado === 'rechazado' && (
                <p className="mensaje-pago rechazado">
                  Pago rechazado. <FontAwesomeIcon icon={faTimesCircle} />
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;