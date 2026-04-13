import axios from "axios";
import { Event } from "../model/eventModel";
import { EventByOffsetGatewayInterface } from "./interfaces/EventByOffsetGatewayInterface";

export class EventByOffsetApi implements EventByOffsetGatewayInterface {
    async byOffset(page: number, limit: number): Promise<{ events: Event[], total: number }> {
        try {
            // const response = await axios.get(`http://localhost:8000/api/event/offset?page=${page}&limit=${limit}`);
            const response = await axios.get(`/api/event/offset?page=${page}&limit=${limit}`);

            if (!response.data.success) throw new Error(response.data.error?.message || "Erreur inconnue");

            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) throw new Error(error.response.data.error.message);

            throw new Error("Une erreur inattendue est survenue");
        }
    }
}