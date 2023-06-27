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
describe("GET API/articles/:article_id", () => {
  test("Returns an object with the specified ID.", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty("author")
      expect(body).toHaveProperty("title")
      expect(body).toHaveProperty("article_id")
      expect(body).toHaveProperty("body")
      expect(body).toHaveProperty("topic")
      expect(body).toHaveProperty("created_at")
      expect(body).toHaveProperty("votes")
      expect(body).toHaveProperty("article_img_url")
    })
  })
  test("Returns an error if nothing at the provided ID", () => {
    return request(app)
    .get("/api/articles/5976")
    .expect(404)
    .then(({body}) => {
      console.log(body)
      expect(body.msg).toBe("Not Found")
    })
  })
  test("Returns an error if nothing at the provided ID", () => {
    return request(app)
    .get("/api/articles/5976")
    .expect(404)
    .then(({body}) => {
      console.log(body)
      expect(body.msg).toBe("Not Found")
    })
  })
})