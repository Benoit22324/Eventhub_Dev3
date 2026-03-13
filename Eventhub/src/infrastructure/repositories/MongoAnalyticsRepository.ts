import { AnalyticsOutput, AnalyticsRepositoryInterface } from "../../domain/interfaces/AnalyticsRepositoryInterface";
import * as AnalyticsModel from "../../domain/models/analyticsModel";

export class MongoAnalyticsRepository implements AnalyticsRepositoryInterface {
    async recordAnalytics(event: AnalyticsModel.AnalyticsEvent): Promise<void> {
        await AnalyticsModel.AnalyticsEventModel.create(event);
    }

    async getAnalytics(): Promise<{ pages: AnalyticsOutput[], users: AnalyticsOutput[] }> {
        const pageVisits = await AnalyticsModel.AnalyticsEventModel.aggregate([
            { $match: { eventName: "pageview" } },
            { $group: { _id: "$page", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const userActivities = await AnalyticsModel.AnalyticsEventModel.aggregate([
            { $match: { eventName: "pageview" } },
            { $group: { _id: "$userId", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ])

        return {
            pages: pageVisits,
            users: userActivities
        };
    }
}