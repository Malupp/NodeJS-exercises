import express from "express";
import "express-async-errors";

import prisma from './lib/prisma/client';

const app = express();

app.use(express.json());

app.get("/planets", async (req, res) => {
    const planets = await prisma.planet.findMany()

    res.json(planets)
})

app.post("/planets", async (req, res) => {
    const planet = req.body;

    res.status(201).json(planet)
})

export default app;
