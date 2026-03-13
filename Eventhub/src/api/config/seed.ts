import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { generateSalt, getEnvVariable, hashPassword } from "../utility";
import type { CreateUserInputs } from "../dto/user.dto";
import type { CreateCategoryInput } from "../dto/category.dto";
import type { CreateEventInputs } from "../dto/event.dto";

const pool = new Pool({
    connectionString: getEnvVariable("DATABASE_URL")
})

export const prisma = new PrismaClient({
    adapter: new PrismaPg(pool)
});

const users: CreateUserInputs[] = [
    {
        username: "John",
        email: "johndoe@gmail.com",
        password: "ohmyjohn"
    },
    {
        username: "Benoit",
        email: "BenLeTesteur@gmail.com",
        password: "ben123"
    },
    {
        username: "Alain",
        email: "ARotule@gmail.com",
        password: "SousLesRotules"
    }
];

const categories: CreateCategoryInput[] = [
    {
        name: "Concert"
    },
    {
        name: "Concert Idol"
    },
    {
        name: "Culturel"
    },
    {
        name: "Tourisme"
    },
    {
        name: "Historique"
    }
];

const events: CreateEventInputs[] = [
    {
        title: "Miku Concert",
        description: "Concert de Miku projeté sur grand écran et bâton lumineux fourni",
        startDate: new Date("2026-02-26"),
        capacity: 500,
        price: 14.99,
        category: "Concert Idol"
    },
    {
        title: "Le Louvre",
        description: "Visite touristique du Louvre et présentation des oeuvres",
        startDate: new Date("2026-01-20"),
        capacity: 30,
        price: 4.99,
        category: "Tourisme"
    },
    {
        title: "Concert DJ",
        description: "Venez festoyer avec un DJ très connu qui va mettre le feu à la piste !",
        startDate: new Date("2026-05-07"),
        capacity: 300,
        price: 7.99,
        category: "Concert"
    },
    {
        title: "Concert",
        description: "Venez assister avec tout sorte de musique de Noël !",
        startDate: new Date("2026-12-25"),
        capacity: 100,
        price: 2.49,
        category: "Concert"
    },
    {
        title: "Le Louvre",
        description: "Visite touristique du Louvre et présentation des oeuvres",
        startDate: new Date("2026-10-01"),
        capacity: 30,
        price: 4.99,
        category: "Tourisme"
    },
    {
        title: "Le Louvre",
        description: "Visite touristique du Louvre et présentation des oeuvres",
        startDate: new Date("2026-09-01"),
        capacity: 30,
        price: 4.99,
        category: "Tourisme"
    },
    {
        title: "Tour de Paris",
        description: "Visite touristique de tout Paris et présentation de l'histoire de la France",
        startDate: new Date("2026-07-20"),
        capacity: 40,
        price: 9.99,
        category: "Culturel"
    },
    {
        title: "Miku Concert",
        description: "Concert de Miku projeté sur grand écran et bâton lumineux fourni",
        startDate: new Date("2026-07-12"),
        capacity: 500,
        price: 14.99,
        category: "Concert Idol"
    },
    {
        title: "Le Louvre",
        description: "Visite touristique du Louvre et présentation des oeuvres",
        startDate: new Date("2027-01-01"),
        capacity: 30,
        price: 4.99,
        category: "Tourisme"
    },
    {
        title: "Le Louvre",
        description: "Visite touristique du Louvre et présentation des oeuvres",
        startDate: new Date("2027-02-01"),
        capacity: 30,
        price: 4.99,
        category: "Tourisme"
    },
    {
        title: "Concert DJ",
        description: "Venez festoyer avec un DJ très connu qui va mettre le feu à la piste !",
        startDate: new Date("2026-09-16"),
        capacity: 400,
        price: 8.49,
        category: "Concert"
    },
];

async function main() {
    console.log("Ajout des catégories...");
    for (const category of categories) {
        await prisma.category.create({
            data: {...category}
        });

        console.log(`Catégorie ${category.name} ajouté !`);
    }

    console.log("Ajout des utilisateurs...");
    for (const user of users) {
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(user.password, salt);

        await prisma.user.create({
            data: {...user, password: hashedPassword, salt}
        })

        console.log(`Utilisateur ${user.username} ajouté !`);
    }

    console.log("Ajout des événements...");
    for (const event of events) {
        const prismaUser = await prisma.user.findUnique({
            where: {email: "johndoe@gmail.com"}
        });
        const prismaCategory = await prisma.category.findUnique({
            where: {name: event.category}
        });

        await prisma.event.create({
            data: {
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                capacity: event.capacity,
                price: event.price,
                organizerId: prismaUser!.id,
                categoryId: prismaCategory!.id
            }
        })

        console.log(`Événement ${event.title} ajouté !`);
    }
}

main()
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })