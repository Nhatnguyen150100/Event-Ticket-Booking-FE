import axiosRequest from "../plugins/request";
import { INew } from "../types/new.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import onRemoveParams from "../utils/on-remove-params";

class DestinationService {
  private _prefixURL = "/v1/destination";

  public async createNew(
    data: Record<string, any>
  ): Promise<IBaseResponse<INew>> {
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

  public async updateNew(
    id: string,
    data: Record<string, any>
  ): Promise<IBaseResponse<INew>> {
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

  public async getNew(id: string): Promise<IBaseResponse<INew>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteNew(id: string): Promise<IBaseResponse<INew>> {
    try {
      const rs = await axiosRequest.delete(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getAllNew(
    query?: Record<string, any>
  ): Promise<IBaseResponse<IBaseResponseList<INew[]>>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(query ?? {}),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new DestinationService();
