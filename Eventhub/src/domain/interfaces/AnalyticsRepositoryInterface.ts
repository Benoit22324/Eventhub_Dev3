import * as AnalyticsModel from "../models/analyticsModel";

export type AnalyticsOutput = {
    _id: string,
    count: number
}

export interface AnalyticsRepositoryInterface {
    recordAnalytics(event: AnalyticsModel.AnalyticsEvent): Promise<void>
    getAnalytics(): Promise<{ pages: AnalyticsOutput[], users: AnalyticsOutput[] }>
}