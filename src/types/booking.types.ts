import { IRoom } from "./room.types";

export interface IBooking {
  id: string;
  roomId: string;
  name: string;
  email: null;
  phoneNumber: string;
  startDate: string;
  endDate: string;
  adults: null;
  children: null;
  note: null;
  createdAt: string;
  updatedAt: string;
  room: IRoom;
}
