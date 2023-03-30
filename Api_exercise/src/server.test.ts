import test from "node:test";
import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

jest.useFakeTimers();

const request = supertest(app);

describe("GET /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2023-03-21T10:29:40.528Z",
            updatedAt: "2023-03-21T10:29:44.162Z",
        };

        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValueOnce(planet);

        const res = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(res.body).toEqual(planet);
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const res = await request
            .get("/planets/4")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot GET /planets/4");
    });

    test("Invalid planet ID", async () => {
        const res = await request
            .get("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot GET /planets/asdf");
    });
});

describe("DELETE /planet/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2023-03-20T13:36:21.435Z",
            updatedAt: "2023-03-20T13:35:55.214Z",
        };

        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const res = await request
            .delete("/planets/1")
            .expect(204)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(res.text).toEqual("");
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

        const res = await request
            .delete("/planets/4")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot DELETE /planets/4");
    });

    test("Invalid planet ID", async () => {
        const res = await request
            .delete("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot DELETE /planets/asdf");
    });
});

describe("POST /planets/:id/photo", () => {
    test("Valid request with PNG file upload", async () => {
        await request
            .post("/planets/23/photo")
            .attach("photo", "test-fixture/photos/file.jpg")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    })
    test("invalid planet ID", async () => {
        const res = await request
            .post("/planets/asdf/photo")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot POST /planets/asdf/photo")
    });

    test("Invalid request with not file upload", async() => {
        const res = await request
            .post("/planets/23/photo")
            .expect(400)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("No photo file uploaded")
    })
})

describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            id: 5,
            name: "Mars",
            description: null,
            diameter: 4321,
            moons: 2,
        };

        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const res = await request
            .post("/planets")
            .send({
                id: 5,
                name: "Mars",
                description: null,
                diameter: 4321,
                moons: 2,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(res.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            name: "Mercury",
            moons: 12,
        };

        const res = await request
            .post("/planets")
            .send(JSON.stringify(planet))
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
