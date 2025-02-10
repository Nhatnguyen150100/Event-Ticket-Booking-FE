export type IEventType =
  | "MUSIC_CONCERT"
  | "CULTURAL_ARTS"
  | "TRAVEL"
  | "WORKSHOP"
  | "MOVIE"
  | "TOUR"
  | "SPORTS"
  | "NEWS"
  | "OTHER";

export interface IEvent {
  type: IEventType;
  _id: string;
  name: string;
  imageThumbnail: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  ticketsAvailable: number;
  priceTicket: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
