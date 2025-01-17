import axiosRequest from "../plugins/request";
import { IBaseResponse } from "../types/response.types";

class ImagesService {
  private _prefixURL = "/v1/images";

  public async deleteImages(
    data: string[]
  ): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.post(`${this._prefixURL}/delete-images`, {
        urls: data
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new ImagesService();
