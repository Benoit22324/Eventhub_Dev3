import { EventRepositoryInterface } from "../../domain/interfaces/EventRepositoryInterface";

class GetEventByIdUseCase {
    constructor(private eventRepository: EventRepositoryInterface) { }

    async execute(id: string) {
        try {
            const event = await this.eventRepository.get(id);

            return event
        } catch(err) {
            throw new Error("Événement introuvable");
        }
    }
}

export default GetEventByIdUseCase;