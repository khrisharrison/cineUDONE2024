export interface TicketRowProps {
  tipoEntrada: string;
  precio: string;
  contador: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export interface TicketCounts {
  general: number;
  children: number;
  seniors: number;
}

export interface UseTicketCountsReturn {
  counts: TicketCounts;
  handleIncrement: (type: keyof TicketCounts) => void;
  handleDecrement: (type: keyof TicketCounts) => void;
}
