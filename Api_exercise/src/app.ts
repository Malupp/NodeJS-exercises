import express, { response } from "express";
import "express-async-errors";
import cors from "cors"

import prisma from "./lib/prisma/client";

// import { validate,
//      planetSchema,
//       validationErrorMiddleware,
//       PlanetData }
//  from "./lib/validation";

const corsOption = {
    origin: "http://localhost:8080"
};

const app = express();

app.use(express.json());

app.use(cors(corsOption));

app.get("/planets", async (req, res) => {
    const planets = await prisma.planet.findMany();

    res.json(planets);
});

app.get("/planets/:id(\\d+)", async (req, res, next) => {
    const planetId = Number(req.params.id);

    const planet = await prisma.planet.findUnique({
        where: { id: planetId },
    });

    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }

    res.json(planet);
});

app.post("/planets", async (req, res) => {
    const PlanetData = req.body;

    const planet = await prisma.planet.create({
        data: PlanetData,
    });

    res.status(201).json(planet);
});

app.delete("/planets/:id(\\d+)", async (req, res, next) => {
    const planetId = Number(req.params.id);
    try {
        await prisma.planet.delete({
            where: { id: planetId },
        });
        res.status(204).end();
    } catch (error) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});

// app.use(validationErrorMiddleware)

export default app;
