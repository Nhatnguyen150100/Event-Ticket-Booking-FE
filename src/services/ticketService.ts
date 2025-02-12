import axiosRequest from "../plugins/request";
import { ITicket } from "../types/ticket.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";

class TicketService {
  private _prefixURL = "/v1/tickets";

  public async createTicket(data: Record<string, any>): Promise<IBaseResponse<ITicket>> {
    const rs = await axiosRequest.post(this._prefixURL, data);
    return rs.data;
  }

  public async updateTicket(id: string, data: Record<string, any>): Promise<IBaseResponse<ITicket>> {
    const rs = await axiosRequest.put(`${this._prefixURL}/${id}`, data);
    return rs.data;
  }

  public async deleteTicket(id: string): Promise<IBaseResponse<any>> {
    const rs = await axiosRequest.delete(`${this._prefixURL}/${id}`);
    return rs.data;
  }

  public async getTicket(id: string): Promise<IBaseResponse<ITicket>> {
    const rs = await axiosRequest.get(`${this._prefixURL}/${id}`);
    return rs.data;
  }

  public async getAllTickets(eventId: string): Promise<IBaseResponse<IBaseResponseList<ITicket[]>>> {
    const rs = await axiosRequest.get(`${this._prefixURL}?eventId=${eventId}`);
    return rs.data;
  }
}

export default new TicketService();
