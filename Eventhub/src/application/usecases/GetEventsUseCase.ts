import type { EventRepositoryInterface } from "../../domain/interfaces/EventRepositoryInterface";

class GetEventsUseCase {
    constructor(private eventRepository: EventRepositoryInterface) { }

    async execute() {
        try {
            const events = await this.eventRepository.getAll();

            return events
        } catch(err) {
            throw new Error("Événement introuvable");
        }
    }
}

export default GetEventsUseCase;