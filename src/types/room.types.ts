import { IFacilities } from "./facilities.types";
export interface IRoom {
  id: string;
  name: string;
  description: string | null;
  bedType: string | null;
  acreage: number | null;
  normalDayPriceStart: number | null;
  normalDayPriceEnd: number | null;
  summerPriceStart: number | null;
  summerPriceEnd: number | null;
  hotDayPriceStart: number | null;
  hotDayPriceEnd: number | null;
  titleHoliday: string | null;
  holidayPriceStart: number | null;
  holidayPriceEnd: number | null;
  facilitiesRooms?: IFacilitiesRooms[];
  img_1: string | null;
  img_2: string | null;
  img_3: string | null;
  img_4: string | null;
  img_5: string | null;
  img_6: string | null;
}

export interface IFacilitiesRooms {
  id: number;
  roomId: string;
  facilityId: string;
  facility: IFacilities;
  createdAt: string;
  updatedAt: string;
}
