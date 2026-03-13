import axios from "axios";
import * as AnalyticsModel from "../model/analyticsModel";
import { AnalyticsGatewayInterface } from "./interfaces/AnalyticsGatewayInterface";

export class SendAnalyticsApi implements AnalyticsGatewayInterface {
    async sendAnalytics(event: AnalyticsModel.AnalyticsEvent): Promise<void> {
        await axios.post("http://localhost:8000/api/analytics", event);
    }
}