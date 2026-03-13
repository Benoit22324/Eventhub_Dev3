import { AnalyticsOutput, AnalyticsRepositoryInterface } from "../../domain/interfaces/AnalyticsRepositoryInterface";

export class GetAnalyticsQuery {
    constructor(private readonly analyticsRepository: AnalyticsRepositoryInterface) { }

    async execute(): Promise<{ pages: AnalyticsOutput[], users: AnalyticsOutput[] }> {
        const result = await this.analyticsRepository.getAnalytics();

        return result
    }
}