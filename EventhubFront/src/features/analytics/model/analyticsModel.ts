export type AnalyticsEventType = "pageview" | "click";

export type AnalyticsEvent = {
    eventName: AnalyticsEventType,
    userId: string,
    page: string,
    timestamp: Date
}