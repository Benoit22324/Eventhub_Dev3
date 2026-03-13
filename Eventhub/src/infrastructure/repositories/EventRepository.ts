import { prisma } from "../../api/config/client";
import { CreateEventInputs, EditEventInputs } from "../../api/dto/event.dto";
import { sanitizeEvent } from "../../api/utility";
import Event from "../../domain/entities/event";
import type { EventRepositoryInterface } from "../../domain/interfaces/EventRepositoryInterface";

class EventRepository implements EventRepositoryInterface {
    async getAll(): Promise<Event[]> {
        const events = await prisma.event.findMany({
            include: {
                organizer: {
                    select: {
                        username: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!events) throw new Error("Événements introuvable");

        const sanitizedEvents = events.map(e => sanitizeEvent(e));

        return sanitizedEvents;
    }

    async getOffset(page: number, limit: number): Promise<{events: Event[], total: number}> {
        const events = await prisma.event.findMany({
            include: {
                organizer: {
                    select: {
                        username: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { startDate: "desc" }
        });

        const total = await prisma.event.count();

        if (!events) throw new Error("Événements introuvable");

        const sanitizedEvents = events.map(e => sanitizeEvent(e));

        return {
            events: sanitizedEvents,
            total: Math.ceil(total / limit)
        }
    }

    async getCursor(lastId: string, limit: number): Promise<Event[]> {
        const events = await prisma.event.findMany({
            include: {
                organizer: {
                    select: {
                        username: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            },
            take: limit,
            skip: 1,
            cursor: { id: lastId },
            orderBy: { startDate: "desc" }
        });

        if (!events) throw new Error("Événements introuvable");

        const sanitizedEvents = events.map(e => sanitizeEvent(e));

        return sanitizedEvents;
    }

    async get(id: string): Promise<Event> {
        const event = await prisma.event.findUnique({
            where: {id},
            include: {
                organizer: {
                    select: {
                        username: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!event) throw new Error("Événement introuvable");

        return sanitizeEvent(event)
    }

    async save(userId: string, payload: CreateEventInputs): Promise<Event> {
        try {
            const {category, ...e} = payload;

            const prismaCategory = await prisma.category.findUnique({
                where: {name: category}
            });

            if (!prismaCategory) {
                const createdCategory = await prisma.category.create({
                    data: {name: payload.category}
                });

                const createdEvent = await prisma.event.create({
                    data: {...e, organizerId: userId, categoryId: createdCategory.id},
                    include: {
                        organizer: {
                            select: {
                                username: true
                            }
                        },
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                })

                return sanitizeEvent(createdEvent);
            }

            const createdEvent = await prisma.event.create({
                data: {...e, organizerId: userId, categoryId: prismaCategory.id},
                include: {
                    organizer: {
                        select: {
                            username: true
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            return sanitizeEvent(createdEvent);
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }

    async update(userId: string, id: string, payload: EditEventInputs): Promise<Event> {
        const event = await prisma.event.findUnique({
            where: {id, organizerId: userId}
        });

        if (!event) throw new Error("Événement introuvable");

        const updatedEvent = await prisma.event.update({
            where: {id, organizerId: userId},
            data: {...payload},
            include: {
                organizer: {
                    select: {
                        username: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return sanitizeEvent(updatedEvent);
    }

    async delete(userId: string, id: string): Promise<boolean> {
        const event = await prisma.event.findUnique({
            where: {id, organizerId: userId}
        });

        if (!event) throw new Error("Événement introuvable");

        await prisma.event.delete({
            where: {id, organizerId: userId}
        });

        return true
    }
}

export default EventRepository;