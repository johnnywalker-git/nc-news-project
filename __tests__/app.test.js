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
describe("GET API/articles/:article_id", () => {
  test("Returns an object with the specified keys.", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({body}) => {
      expect(body.finishedArticle).toHaveProperty("author")
      expect(body.finishedArticle).toHaveProperty("title")
      expect(body.finishedArticle).toHaveProperty("article_id")
      expect(body.finishedArticle).toHaveProperty("body")
      expect(body.finishedArticle).toHaveProperty("topic")
      expect(body.finishedArticle).toHaveProperty("created_at")
      expect(body.finishedArticle).toHaveProperty("votes")
      expect(body.finishedArticle).toHaveProperty("article_img_url")
    })
  })
  test("Returns an object with the specified item ID.", () => {
    return request(app)
    .get("/api/articles/1")
    .expect(200)
    .then(({body}) => {
      expect(body.finishedArticle.article_id).toBe(1)
    })
  })
  test("Returns an error if nothing at the provided ID", () => {
    return request(app)
    .get("/api/articles/5976")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Not Found")
    })
  })
  test("Returns an error if given a bad ID.", () => {
    return request(app)
    .get("/api/articles/ABCD")
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Bad request")
    })
  })
})

