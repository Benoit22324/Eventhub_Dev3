import Event from "../../domain/entities/event";
import { EventRepositoryInterface } from "../../domain/interfaces/EventRepositoryInterface";

class GetEventsCursorUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) { }

    async execute(lastId: string, limit: number = 10): Promise<Event[]> {
        try {
            const events = await this.eventRepository.getCursor(lastId, limit);

            return events;
        } catch (error) {
            throw new Error("Événements introuvable");
        }
    }
}

export default GetEventsCursorUseCase;