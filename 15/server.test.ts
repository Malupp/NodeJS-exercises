import test from "node:test"
import supertest from "supertest"
import app from "./app"

const request = supertest(app)

test("/movies", async () => {
    const res = await request
        .get("/movies")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(res.body).toEqual([
        { name: "The Great War" },
        { name: "Matrix" }
    ]);
});


