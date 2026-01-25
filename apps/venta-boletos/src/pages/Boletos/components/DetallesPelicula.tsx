import '../../../styles/seleccion-entrada.css';
import '../../../styles/venta-boletos.css';
import img1 from '../../../assets/Poster.png';

interface Boleto{
  cantBoletos?: number
  total?: number
}

export function DetallesPelicula({cantBoletos,total}: Boleto) {
  return (
    <div className="detalles">
      <div className="cuadro-fondo p-8">
        <img src={img1} alt="Poster de la pelicula" />
        <h1>Spiderman No Way Home</h1>
        {!cantBoletos ? (
          <p>
            Tras descubrirse la identidad secreta de Peter Parker como Spider-Man,
            la vida del joven se vuelve una locura. Peter le pide ayuda al Doctor
            Strange para recuperar su vida, pero algo sale mal y provoca una
            fractura en el multiverso.
          </p>
        ) : null } 
        <div className="border-t border-gray-300 w-full my-4"></div>
        <table>
          <tbody>
            <tr className="detalles-funcion">
              <td>Censura:</td>
              <td className="pl-32">A</td>
            </tr>
            <tr className="detalles-funcion">
              <td>Fecha:</td>
              <td className="pl-32">10-01-2026</td>
            </tr>
            <tr className="detalles-funcion">
              <td>Hora:</td>
              <td className="pl-32">18:00</td>
            </tr>
            <tr className="detalles-funcion">
              <td>Sala:</td>
              <td className="pl-32">2</td>
            </tr>
            <tr className="detalles-funcion">
              <td>Formato:</td>
              <td className="pl-32">2D-Español</td>
            </tr>            
          </tbody>
        </table>
        <div className="border-t border-gray-300 w-full my-4"></div>
        <table>
          <tbody>
            {cantBoletos ? (
              <tr className="detalles-funcion">
                <td>Cantidad de entradas: </td>
                <td>{cantBoletos}</td>
              </tr>
            ) : null }
            {cantBoletos ? (
              <tr className="detalles-funcion">
                <td>Total a pagar: </td>
                <td>${total?.toFixed(2)}</td>
              </tr>
            ) : null }
          </tbody>
        </table>
      </div>
    </div>
  );
}
