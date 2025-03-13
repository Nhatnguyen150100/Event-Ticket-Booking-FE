export enum ETicketType {
  VIP = "VIP",
  GENERAL = "GENERAL",
  VIP_PLUS = "VIP_PLUS",
  VIP_PLATINUM = "VIP_PLATINUM",
}

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
    soldQuantity: number;
    type: ITicketType;
    createdAt: string;
    updatedAt: string;
  }
  