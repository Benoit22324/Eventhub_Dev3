import axios from "axios";
import * as DashboardModel from "../model/dashboardModel";
import { DashboardQueryInterface } from "./interfaces/DashboardQueryInterface";

export class FetchAnalyticsDataApi implements DashboardQueryInterface {
    async fetchViewsPerPage(): Promise<{
        pages: DashboardModel.PageViewData[],
        users: DashboardModel.PageViewData[]
    }> {
        // const result = await axios.get("http://localhost:8000/api/analytics", {
        //     withCredentials: true
        // });
        const result = await axios.get("/api/analytics", {
            withCredentials: true
        });

        return result.data.data;
    }
}