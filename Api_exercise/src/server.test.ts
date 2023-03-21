import test from "node:test";
import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "../src/app";

const request = supertest(app);

describe("GET /planet/:id", () => {
    test("Valid request", async () => {
        const planet =
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 12,
                createdAt: "2023-03-20T13:36:21.435Z",
                updatedAt: "2023-03-20T13:35:55.214Z",
            }

        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const res = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual(planet);
    });

    test("Planet does not exist", () => {
         // @ts-ignore
         prismaMock.planet.findUnique.mockResolvedValue(null);

         const response = await request
                .get("/planets/4")
                .expect(404)
                .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/4")
    })

    test("Invalid planet ID", async () => {

        const response = await request
               .get("/planets/asdf")
               .expect(404)
               .expect("Content-Type", /text\/html/);

       expect(response.text).toContain("Cannot GET /planets/asdf")
   })
});


describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            id: 5,
            name: "Mars",
            description: null,
            diameter: 4321,
            moons: 2,
            createdAt: "2023-03-21T13:23:41.036Z",
            updatedAt: "2023-03-21T13:23:41.036Z",
        };

        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const res = await request
            .post("/planets")
            .send({
                name: "Mars",
                diameter: 4321,
                moons: 2,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            name: "Mercury",
            diameter: 1234,
            moons: 12,
        };

        const res = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
