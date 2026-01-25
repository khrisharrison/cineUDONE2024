import useTicketCounts from '../hooks/useTicketCounts';
import FilaEntrada from './FilaEntrada';
import '../../../styles/seleccion-entrada.css';
import useFetch from '../services/useFetch';
import { Link } from 'react-router-dom';
import { useHorario } from '../../../context/HorarioContext'; // Importa el hook del contexto

export function SeleccionEntrada() {
  const { counts, handleIncrement, handleDecrement } = useTicketCounts();
  const queryParams = new URLSearchParams({ dia: 'martes' }).toString();
  const { data } = useFetch(queryParams);
  const general = data?.general || 0;
  const children = data?.niño || 0;
  const seniors = data?.adultoMayor || 0;

  const { selectedDate, selectedHour } = useHorario(); // Obtén la fecha y hora del contexto

  // Detectar si solo se seleccionaron boletos de niños (y en ese caso bloquear pago)
  const isOnlyChild = counts.children > 0 && counts.general === 0 && counts.seniors === 0;
  const total = (general * counts.general) + (children * counts.children) + (seniors * counts.seniors);
  const formattedTotal = parseFloat(total.toFixed(2));
  

  return (
    <div className="max-w-md cuadro-fondo p-2">
      <table className="entradas">
        <thead>
          <tr>
            <th>Tipo de Boleto</th>
            <th>Cantidad</th>
            <th>Precios</th>
          </tr>
        </thead>
        <tbody>
          <FilaEntrada
            tipoEntrada="Boleto General"
            precio={(general * counts.general).toFixed(2)}
            contador={counts.general}
            onIncrement={() => handleIncrement('general')}
            onDecrement={() => handleDecrement('general')}
          />
          <FilaEntrada
            tipoEntrada="Boleto Niños"
            precio={(children * counts.children).toFixed(2)}
            contador={counts.children}
            onIncrement={() => handleIncrement('children')}
            onDecrement={() => handleDecrement('children')}
          />
          <FilaEntrada
            tipoEntrada="Boleto 3era Edad"
            precio={(seniors * counts.seniors).toFixed(2)}
            contador={counts.seniors}
            onIncrement={() => handleIncrement('seniors')}
            onDecrement={() => handleDecrement('seniors')}
          />
          <tr>
            <td colSpan={2}>Total</td>
            <td className="price">${formattedTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      {/* Botón visible siempre; deshabilitado cuando corresponde y con tooltip informativo */}
      {(() => {
        const isDisabled = isOnlyChild || formattedTotal <= 0;
        const disabledTitle = isOnlyChild
          ? 'Por favor seleccione otro tipo de boleto junto al boleto de niño para continuar.'
          : 'Por favor seleccione al menos un boleto para continuar.';

        if (isDisabled) {
          return (
            <div>
              <button
                type="button"
                className={`boton-pagar opacity-50`}
                disabled
                title={disabledTitle}
                aria-disabled="true"
              >
                Pagar
              </button>
              <div className="mt-2 text-sm text-red-600">
                {isOnlyChild
                  ? 'Por favor seleccione otro tipo de boleto junto al boleto de niño para continuar.'
                  : 'Por favor seleccione al menos un boleto para continuar.'}
              </div>
            </div>
          );
        }

        return (
          <Link
            to={`/payment?total=${formattedTotal}&general=${counts.general}&children=${counts.children}&seniors=${counts.seniors}&date=${selectedDate}&time=${selectedHour}`}
          >
            <button className="boton-pagar">Pagar</button>
          </Link>
        );
      })()}
    
    </div>
  );
}