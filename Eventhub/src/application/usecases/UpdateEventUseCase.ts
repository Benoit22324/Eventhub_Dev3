import { EditEventInputs } from "../../api/dto/event.dto";
import Event from "../../domain/entities/event";
import { EventRepositoryInterface } from "../../domain/interfaces/EventRepositoryInterface";

class UpdateEventUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) { }

    async execute(userId: string, id: string, payload: EditEventInputs): Promise<Event> {
        if (!payload.title) throw new Error("Le titre est requis");
        if (!payload.description) throw new Error("La description est requis");

        const currentDate = new Date();
        const dateLimit = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1}`);
        if (!payload.startDate || payload.startDate.getTime() <= dateLimit.getTime()) throw new Error("La date de début doit être au moins 1 jour de plus");
        if (!payload.capacity || payload.capacity < 1) throw new Error("La capacité doit avoir au moins 1 personne");
        if (!payload.price || payload.price < 1) throw new Error("Le prix doit être au moins à 1$");

        try {
            const event = await this.eventRepository.update(userId, id, payload);

            return event;
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateEventUseCase;