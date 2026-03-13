import { Prisma, Event as PrismaEvent, User } from "@prisma/client";
import Event from "../../domain/entities/event";

type PrismaEventWithInclude = Prisma.EventGetPayload<{
    include: {
        organizer: true,
        category: true
    }
}>

export const sanitizeEvent = (event: PrismaEvent) => {
    const e = event as PrismaEventWithInclude;

    return new Event(
        e.id,
        e.title,
        e.description,
        new Date(e.startDate),
        e.capacity,
        e.price,
        e.organizer.username,
        e.category.name,
        new Date(e.createdAt),
        new Date(e.updatedAt)
    );
}

export const sanitizeUser = (user: User) => {
    const { salt, password, otpSecret, ...safeInfo } = user;

    return safeInfo
}