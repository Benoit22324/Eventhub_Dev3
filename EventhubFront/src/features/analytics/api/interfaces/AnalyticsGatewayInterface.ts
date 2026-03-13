import * as AnalyticsModel from "../../model/analyticsModel";

export interface AnalyticsGatewayInterface {
    sendAnalytics(event: AnalyticsModel.AnalyticsEvent): Promise<void>
}