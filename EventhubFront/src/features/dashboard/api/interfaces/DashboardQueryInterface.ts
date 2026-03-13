import * as DashboardModel from "../../model/dashboardModel";

export interface DashboardQueryInterface {
    fetchViewsPerPage(): Promise<{
        pages: DashboardModel.PageViewData[],
        users: DashboardModel.PageViewData[]
    }>
}