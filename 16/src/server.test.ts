import test from "node:test";
import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "../src/app";

const request = supertest(app);

test("GET /planets", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2023-03-20T13:36:21.435Z",
            updatedAt: "2023-03-20T13:35:55.214Z",
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 2,
            createdAt: "2023-03-20T13:36:56.408Z",
            updatedAt: "2023-03-20T13:36:43.137Z",
        },
    ];

    // @ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);

    const res = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(res.body).toEqual(planets);
});

test("POST /planets", async () => {
    const planet = {
            name: "Mercury",
            diameter: 1234,
            moons: 12,
        }

    const res = await request
        .post("/planets")
        .send(planet)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    expect(res.body).toEqual(planet);
});

