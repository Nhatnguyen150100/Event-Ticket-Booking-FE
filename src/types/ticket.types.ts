export type ITicketType =
  | "VIP"
  | "GENERAL"
  | "VIP_PLUS"
  | "VIP_PLATINUM";

  export interface ITicket {
    _id: string;
    eventId: string;
    price: number;
    quantity: number;
    type: string;
    createdAt: string;
    updatedAt: string;
  }
  