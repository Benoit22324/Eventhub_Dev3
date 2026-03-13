import mongoose, { InferSchemaType } from "mongoose";

export type AnalyticsEventType = "pageview" | "click";

export const AnalyticsEventSchema = new mongoose.Schema({
    eventName: String,
    userId: String,
    page: String,
    timestamp: Date
}, {
    timestamps: true // Création automatique des champs createdAt | updatedAt | __v
})

export type AnalyticsEvent = InferSchemaType<typeof AnalyticsEventSchema>;

export const AnalyticsEventModel = mongoose.model<AnalyticsEvent>("Analytics", AnalyticsEventSchema);