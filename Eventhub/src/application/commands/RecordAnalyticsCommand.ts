import { AnalyticsRepositoryInterface } from "../../domain/interfaces/AnalyticsRepositoryInterface";
import * as AnalyticsModel from "../../domain/models/analyticsModel";

export class RecordAnalyticsCommand {
    constructor(private readonly analyticsRepository: AnalyticsRepositoryInterface) { }

    async execute(event: AnalyticsModel.AnalyticsEvent): Promise<void> {
        await this.analyticsRepository.recordAnalytics(event);
    }
}