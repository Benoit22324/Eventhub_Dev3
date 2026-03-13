import Event from "../../domain/entities/event";
import { EventRepositoryInterface } from "../../domain/interfaces/EventRepositoryInterface";

class GetEventsOffsetUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) { }

    async execute(page: number = 1, limit: number = 10): Promise<{ events: Event[], total: number }> {
        try {
            const result = await this.eventRepository.getOffset(page, limit);

            return result;
        } catch (error) {
            throw new Error("Événements introuvable");
        }
    }
}

export default GetEventsOffsetUseCase;