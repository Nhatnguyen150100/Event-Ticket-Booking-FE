import axiosRequest from "../plugins/request";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import { IRoom } from "../types/room.types";
import onRemoveParams from "../utils/on-remove-params";

class RoomService {
  private _prefixURL = "/v1/room";

  public async createRoom(
    data: Record<string, any>
  ): Promise<IBaseResponse<IRoom>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateRoom(
    id: string,
    data: Record<string, any>
  ): Promise<IBaseResponse<IRoom>> {
    try {
      const rs = await axiosRequest.put(`${this._prefixURL}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteRoom(id: string): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.delete(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getRoom(id: string): Promise<IBaseResponse<IRoom>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getAllRooms(
    query: Record<string, any>
  ): Promise<IBaseResponse<IBaseResponseList<IRoom[]>>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getAllRoomsFromUser(
    query: Record<string, any>
  ): Promise<IBaseResponse<IBaseResponseList<IRoom[]>>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/from-user`, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new RoomService();
