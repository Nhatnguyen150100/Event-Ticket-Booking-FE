export enum EEventType {
  MUSIC_CONCERT = "MUSIC_CONCERT",
  CULTURAL_ARTS = "CULTURAL_ARTS",
  TRAVEL = "TRAVEL",
  WORKSHOP = "WORKSHOP",
  MOVIE = "MOVIE",
  TOUR = "TOUR",
  SPORTS = "SPORTS",
  NEWS = "NEWS",
  OTHER = "OTHER",
}

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
  startTime?: string;
  endTime?: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  capacity: number;
  ticketsAvailable: number;
  priceTicket: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
  eventOrganization: string;
}
