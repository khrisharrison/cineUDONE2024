import React from 'react';
import { TicketRowProps } from '../types/index';

const FilaEntrada: React.FC<TicketRowProps> = ({
  entradTipo,
  precio,
  contador,
  onIncrement,
  onDecrement,
}) => {
  return (
    <tr>
      <td>{entradTipo}</td>
      <td>
        <div className="boton">
          <button
            onClick={onDecrement}
            aria-label={`Decrementar ${entradTipo}`}
          >
            -
          </button>
          <span>{contador}</span>
          <button
            onClick={onIncrement}
            aria-label={`Incrementar ${entradTipo}`}
          >
            +
          </button>
        </div>
      </td>
      <td className="price">${precio}</td>
    </tr>
  );
};

export default FilaEntrada;
