const app = require("../app")
const seed = require("../db/seeds/seed")
const request = require('supertest')
const db = require("../db/connection")
const testData = require("../db/data/test-data/index")
const endPoints = require("../endpoints.json")


beforeEach(() => {
    return seed(testData)
    });

  afterAll(() => {
    db.end()
  });

describe("GET API/topics", () => {
    test("Objects in the array should have the predefined keys", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
            expect(body.length === 3).toBe(true)
                body.forEach((treasure) => {
                expect(treasure).toHaveProperty("slug")
                expect(treasure).toHaveProperty("description")
           })
        })
    })
})
describe("GET /api", () => {
    test("Returns an object describing all the available endpoints on the API", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
          expect(body).toEqual(endPoints)
        })
})
})