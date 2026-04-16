import GetEventByIdUseCase from "../../application/usecases/GetEventByIdUseCase";
import Event from "../../domain/entities/event";
import InMemoryEventRepository from "../../infrastructure/repositories/InMemoryEventRepository";

describe("GetEventByIdUseCase", () => {
    let repository: InMemoryEventRepository;
    let usecase: GetEventByIdUseCase;

    beforeEach(() => {
        repository = new InMemoryEventRepository();
        usecase = new GetEventByIdUseCase(repository);
    })

    it("should throw an error", async () => {
        await expect(usecase.execute("1")).rejects.toThrow("Événement introuvable");
    })
    it("should return a value", async () => {
        await expect(usecase.execute("1234")).resolves.toBeDefined();
    })
    it("should return a value type of Event", async () => {
        const res = await usecase.execute("1234");

        expect(res instanceof Event).toBeTruthy();
    })
})