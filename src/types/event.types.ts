export interface IEvent {
  _id: string;
  name: string;
  imageThumbnail?: string;
  time: string;
  location: string;
  description?: string;
  capacity: number;
  ticketsAvailable: number;
  priceTicket: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
