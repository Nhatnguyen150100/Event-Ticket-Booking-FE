import axiosRequest from "../plugins/request";
import { IBanner } from "../types/banner.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import onRemoveParams from "../utils/on-remove-params";

class BannerService {
  private _prefixURL = "/v1/banner";

  public async createImageBanner(
    data: Record<string, any>
  ): Promise<IBaseResponse<IBanner>> {
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

  public async deleteImageBanner(id: string): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.delete(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getAllImagesBanner(
    query?: Record<string, any>
  ): Promise<IBaseResponse<IBaseResponseList<IBanner[]>>> {
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

export default new BannerService();
