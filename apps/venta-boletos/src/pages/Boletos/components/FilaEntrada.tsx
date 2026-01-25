import React from 'react';
import { TicketRowProps } from '../types/index';

const FilaEntrada: React.FC<TicketRowProps> = ({
  tipoEntrada,
  precio,
  contador,
  onIncrement,
  onDecrement,
}) => {
  return (
    <tr>
      <td>{tipoEntrada}</td>
      <td>
        <div className="boton">
          <button
            onClick={onDecrement}
            aria-label={`Decrementar ${tipoEntrada}`}
          >
            -
          </button>
          <span>{contador}</span>
          <button
            onClick={onIncrement}
            aria-label={`Incrementar ${tipoEntrada}`}
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
