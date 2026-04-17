import GetUserByIdUseCase from "../../application/usecases/GetUserByIdUseCase";
import InMemoryUserRepository from "../../infrastructure/repositories/InMemoryUserRepository"

describe("GetUserByIdUseCase", () => {
    let repository: InMemoryUserRepository;
    let usecase: GetUserByIdUseCase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        usecase = new GetUserByIdUseCase(repository);
    })

    describe("Scenario: Unauthorized access", () => {
        const id = "";

        it("should throw error 'Accès non autorisé'", async () => {
            await expect(usecase.execute(id)).rejects.toThrow('Accès non autorisé');
        })
    })

    describe("Scenario: Invalid id", () => {
        const ids = ["portal", "pomme", "onion"];

        it.each(ids)("should throw error 'Identifiants invalide' with %p as id", async (id) => {
            await expect(usecase.execute(id)).rejects.toThrow('Identifiants invalide');
        })
    })

    describe("Scenario: Valid id", () => {
        // Arrange -> Les variables qu'on va utiliser pour test
        const id = "abc";

        it("should return an object of User", async () => {
            // Act -> Les résultats
            const result = await usecase.execute(id);

            // Assert -> Les tests
            expect(result).toEqual({
                id: "abc",
                username: "test",
                email: "test@gmail.com",
                password: "johndoe",
                role: "user",
                otpSecret: "",
                otpEnable: false,
                salt: "salty"
            })
            expect(result).toMatchSnapshot({
                id: "abc",
                username: "test",
                email: "test@gmail.com",
                password: "johndoe",
                role: "user",
                otpSecret: "",
                otpEnable: false,
                salt: "salty"
            });
        })
    })
})