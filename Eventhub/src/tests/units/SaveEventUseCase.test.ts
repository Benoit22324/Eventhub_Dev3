import { CreateEventInputs } from "../../api/dto/event.dto";
import SaveEventUseCase from "../../application/usecases/SaveEventUseCase";
import Event from "../../domain/entities/event";
import InMemoryEventRepository from "../../infrastructure/repositories/InMemoryEventRepository";

describe("GetEventsUseCase", () => {
    let repository: InMemoryEventRepository;
    let usecase: SaveEventUseCase;

    beforeEach(() => {
        repository = new InMemoryEventRepository();
        usecase = new SaveEventUseCase(repository);
    })

    describe("Scenario: no title", () => {
        const payload: CreateEventInputs = {
            title: "",
            description: "Un concert",
            startDate: new Date("2026-07-02"),
            capacity: 100,
            price: 6.59,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("Le titre est requis");
        })
    })

    describe("Scenario: no description", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "",
            startDate: new Date("2027-02-02"),
            capacity: 100,
            price: 6.59,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("La description est requis");
        })
    })

    describe("Scenario: expired startDate", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2026-01-10"),
            capacity: 100,
            price: 6.59,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("La date de début doit être au moins 1 jour de plus");
        })
    })

    describe("Scenario: no capacity", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2027-02-02"),
            capacity: 0,
            price: 6.59,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("La capacité doit avoir au moins 1 personne");
        })
    })

    describe("Scenario: no free price", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2027-02-02"),
            capacity: 100,
            price: 0,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("Le prix doit être au moins à 1$");
        })
    })

    describe("Scenario: no category", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2027-02-02"),
            capacity: 100,
            price: 6.59,
            category: ""
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("La catégorie est requis");
        })
    })

    describe("Scenario: valid payload", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2027-02-02"),
            capacity: 100,
            price: 6.59,
            category: "Concert"
        };

        it("should return a value type Event", async () => {
            const res = await usecase.execute("abc123", payload);

            expect(res).toBeDefined();
            expect(res instanceof Event).toBeTruthy();
        })
    })
})