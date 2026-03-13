import { EventRepositoryInterface } from "../../domain/interfaces/EventRepositoryInterface";

class DeleteEventUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) { }

    async execute(userId: string, id: string): Promise<boolean> {
        try {
            const response = await this.eventRepository.delete(userId, id);

            return response;
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteEventUseCase;