import { CreateEventInputs, EditEventInputs } from "../../api/dto/event.dto";
import Event from "../../domain/entities/event";
import type { EventRepositoryInterface } from "../../domain/interfaces/EventRepositoryInterface";

class InMemoryEventRepository implements EventRepositoryInterface {
    async getAll(): Promise<Event[]> {
        return [
            new Event(
                '1234',
                'Concert',
                'Venez assiter avec un célèbre chanteur',
                new Date("2026-04-14"),
                300,
                7.99,
                'John',
                'Concert',
                new Date("2026-02-23"),
                new Date("2026-03-10"),
            )
        ]
    }

    async getOffset(page: number, limit: number): Promise<{ events: Event[], total: number }> {
        return {
            events: [
                new Event(
                    '1234',
                    'Concert',
                    'Venez assiter avec un célèbre chanteur',
                    new Date("2026-04-14"),
                    300,
                    7.99,
                    'John',
                    'Concert',
                    new Date("2026-02-23"),
                    new Date("2026-03-10"),
                )
            ],
            total: 1
        }
    }

    async getCursor(lastId: string, limit: number): Promise<Event[]> {
        return [
            new Event(
                '1234',
                'Concert',
                'Venez assiter avec un célèbre chanteur',
                new Date("2026-04-14"),
                300,
                7.99,
                'John',
                'Concert',
                new Date("2026-02-23"),
                new Date("2026-03-10"),
            )
        ]
    }

    async get(id: string): Promise<Event> {
        if (id !== "1234") throw new Error("Event not found");

        return new Event(
            '1234',
            'Concert',
            'Venez assiter avec un célèbre chanteur',
            new Date("2026-04-14"),
            300,
            7.99,
            'John',
            'Concert',
            new Date("2026-02-23"),
            new Date("2026-03-10"),
        )
    }

    async save(userId: string, payload: CreateEventInputs): Promise<Event> {
        return new Event(
            '10',
            payload.title,
            payload.description,
            payload.startDate,
            payload.capacity,
            payload.price,
            'John',
            payload.category,
            new Date(),
            new Date(),
        )
    }

    async update(userId: string, id: string, payload: EditEventInputs): Promise<Event> {
        return new Event(
            id,
            payload.title,
            payload.description,
            payload.startDate,
            payload.capacity,
            payload.price,
            'John',
            'Concert',
            new Date(),
            new Date(),
        )
    }

    async delete(userId: string, id: string): Promise<boolean> {
        return true
    }
}

export default InMemoryEventRepository;