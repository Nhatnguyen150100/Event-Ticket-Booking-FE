import axiosRequest from "../plugins/request";
import { IFacilities } from "../types/facilities.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import onRemoveParams from "../utils/on-remove-params";

class FacilitiesService {
  private _prefixURL = "/v1/facilities";

  public async createFacility(data: Record<string, any>): Promise<IBaseResponse<IFacilities>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getAllFacilities(query: Record<string, any>): Promise<IBaseResponse<IBaseResponseList<IFacilities[]>>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(query)
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateFacility(id: string, data: Record<string, any>): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.put(`${this._prefixURL}/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteFacility(id: string): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.delete(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

export default new FacilitiesService();