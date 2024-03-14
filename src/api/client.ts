import { TimeRange } from "../pages/query";
import { CalendarInterval, IntrusionSignatures } from "./models";
import store from "../store";
import { setToken } from "../store/token";
import { resolve } from "path";
import axios from "axios";

export default class ApiClient {

  private baseUrl: string;
  private token: string | null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    const token = store.getState().token
    if (token) {
      this.token = token.token
    } else {
      this.token = null
    }
  }
  async deleteDashboard(dashboardId: string) {
    return await this.query(`/dashboards/${dashboardId}`, null, "DELETE");
  }
  async getDashboardVisualizations(dashboardId: string) {
    return await this.query(`/dashboards/${dashboardId}/visualizations`, null, "GET")
  }
  async updateDashboardVisualizations(dashboardId: string, visualizations: any[]) {
    return await this.query(`/dashboards/${dashboardId}/visualizations`, visualizations, "PUT");
  }
  async createDashboard(name: string) {
    return await this.query("/dashboards", { name }, "POST");
  }

  async listDashboard() {
    return await this.query("/dashboards", null, "GET");
  }

  async createSession(account: string, password: string) {
    return await this.query("/sessions", { account, password }, "POST");
  }

  async login(account: string, password: string) {
    try {
      const res = await this.createSession(account, password);
      this.token = res.data.token;
      store.dispatch(setToken(res.data.token))
    } catch (e) {
      throw new Error("login failed");
    }
  }

  async query(path: string, body: any, method: string) {
    let headers = {
      "Content-Type": "application/json",
    } as any;
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    let payload = {
      method: method,
      headers: headers,
    } as any;
    if (body) {
      payload.body = JSON.stringify(body);
    }
    return axios({
      method: method,
      url: `${this.baseUrl}${path}`,
      data: body,
      headers: headers
    });
  }

  async searchWithIndex(index: string, body: any) {
    return await this.query(`/search?index=${index}`, body, "POST");
  }

  async search(body: any) {
    return await this.query("/search", body, "POST");
  }

  async indexes() {
    return await this.query("/indexes", null, "GET");
  }

  async dataViews() {
    return await this.query("/data_views", null, "GET");
  }


  async aggregations(
    index: string,
    timeRange: TimeRange,
    calendarInterval: CalendarInterval
  ) {
    const query = {
      query: {
        range: {
          "@timestamp": {
            gte: timeRange.start.toISOString(),
            lte: timeRange.end.toISOString(),
          },
        },
      },
      size: 0,
      aggs: {
        histogram: {
          date_histogram: {
            field: "@timestamp",
            calendar_interval: calendarInterval,
          },
        },
      },
    };
    return await this.searchWithIndex(index, query);
  }
}

export const apiClient = new ApiClient("http://localhost:8080");
