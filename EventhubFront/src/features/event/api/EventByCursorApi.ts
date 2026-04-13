import axios from "axios";
import { Event } from "../model/eventModel";
import { EventByCursorGatewayInterface } from "./interfaces/EventByCursorGatewayInterface";

export class EventByCursorApi implements EventByCursorGatewayInterface {
    async byCursor(lastId: string, limit: number): Promise<Event[]> {
        try {
            // const response = await axios.get(`http://localhost:8000/api/event/cursor?lastId=${lastId}&limit=${limit}`);
            const response = await axios.get(`/api/event/cursor?lastId=${lastId}&limit=${limit}`);

            if (!response.data.success) throw new Error(response.data.error?.message || "Erreur inconnue");

            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) throw new Error(error.response.data.error.message);

            throw new Error("Une erreur inattendue est survenue");
        }
    }
}