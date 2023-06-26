const app = require("../app")
const seed = require("../db/seeds/seed")
const request = require('supertest')
const db = require("../db/connection")
const testData = require("../db/data/test-data/index")


beforeEach(() => {
    return seed(testData)
    });

  afterAll(() => {
    db.end()
  });

describe("GET API/topics", () => {
    test("Should return an array", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
            expect(body).toBeInstanceOf(Array)
        })
    })
    test("Array should have objects inside of it.", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
            expect(body[0]).toBeInstanceOf(Object)
        })
    })
    test("Objects in the array should have the predefined keys", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
           body.map((treasure) => {
            expect(treasure).toHaveProperty("slug")
            expect(treasure).toHaveProperty("description")
           })
        })
    })
    test("Objects in the array should have two properties", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
           body.map((treasure) => {
            expect(Object.keys(treasure).length).toBe(2)
           })
        })
    })
})