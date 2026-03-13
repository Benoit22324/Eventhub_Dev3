import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as EventModel from "../model/eventModel";

export type EventState = {
    status: "idle" | "loading" | "success" | "error",
    events: EventModel.Event[],
    total: number,
    event: EventModel.Event,
    error: string | null
}

const initialState: EventState = {
    status: "idle",
    events: [],
    total: 0,
    event: {
        id: "",
        title: "",
        description: "",
        startDate: new Date("2020-01-01").toISOString(),
        capacity: 0,
        price: 0,
        organizer: "",
        category: "",
        createdAt: new Date("2020-01-01").toISOString(),
        updatedAt: new Date("2020-01-01").toISOString()
    },
    error: null
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        EventByIdLoading: (state) => {
            state.status = "loading"
            state.error = null
        },
        EventByIdSuccess: (state, action: PayloadAction<EventModel.Event>) => {
            state.status = "success"
            state.event = {
                ...action.payload,
                startDate: new Date(action.payload.startDate).toISOString(),
                createdAt: new Date(action.payload.createdAt).toISOString(),
                updatedAt: new Date(action.payload.updatedAt).toISOString()
            }
            state.error = null
        },
        EventByIdError: (state, action: PayloadAction<string>) => {
            state.status = "error"
            state.error = action.payload
        },

        EventByOffsetLoading: (state) => {
            state.status = "loading"
            state.error = null
        },
        EventByOffsetSuccess: (state, action: PayloadAction<{ events: EventModel.Event[], total: number }>) => {
            state.status = "success"
            state.total = action.payload.total
            state.events = action.payload.events
            state.error = null
        },
        EventByOffsetError: (state, action: PayloadAction<string>) => {
            state.status = "error"
            state.error = action.payload
        },

        EventByCursorLoading: (state) => {
            state.status = "loading"
            state.error = null
        },
        EventByCursorSuccess: (state, action: PayloadAction<EventModel.Event[]>) => {
            state.status = "success"
            state.events = action.payload.map(event => ({
                ...event,
                startDate: new Date(event.startDate).toISOString(),
                createdAt: new Date(event.createdAt).toISOString(),
                updatedAt: new Date(event.updatedAt).toISOString()
            }))
            state.error = null
        },
        EventByCursorError: (state, action: PayloadAction<string>) => {
            state.status = "error"
            state.error = action.payload
        },
    }
})