import { CreateEventInputs, EditEventInputs } from "../../api/dto/event.dto"
import Event from "../entities/event"

export interface EventRepositoryInterface {
    getAll(): Promise<Event[]>
    getOffset(page: number, limit: number): Promise<{ events: Event[], total: number }>
    getCursor(lastId: string, limit: number): Promise<Event[]>
    get(id: string): Promise<Event>
    save(userId: string, payload: CreateEventInputs): Promise<Event>
    update(userId: string, id: string, payload: EditEventInputs): Promise<Event>
    delete(userId: string, id: string): Promise<boolean>
}