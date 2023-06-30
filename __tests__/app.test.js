const app = require("../app")
const seed = require("../db/seeds/seed")
const request = require('supertest')
const db = require("../db/connection")
const testData = require("../db/data/test-data/index")
const endPoints = require("../endpoints.json")
const jestSorted = require('jest-sorted')

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

describe("/api/articles/:article_id/comments", () => {
    test("Receives an array of objects with the correct properties.", () => {
    return request(app)
    .get("/api/articles/9/comments")
    .expect(200)
    .then(({body}) => {
    expect(body.length > 0).toBe(true)
    body.forEach((comment) => {
      expect(comment).toHaveProperty("comment_id")
      expect(comment).toHaveProperty("votes")
      expect(comment).toHaveProperty("created_at")
      expect(comment).toHaveProperty("author")
      expect(comment).toHaveProperty("body")
      expect(comment).toHaveProperty("article_id")
      })
   })
  })
    test("Comment objects are ordered with the most recent comments first.", () => {
      return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({body}) => {
        expect([body[1].created_at, body[0].created_at]).toBeSorted({ descending: true })
      })
    })
    test("Should return 400 when given invalid article ref (not a num).", () => {
      return request(app)
      .get("/api/articles/Banana/comments")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("Bad request")
      })
    })
    test("Should return 404 when given invalid article number.", () => {
      return request(app)
      .get("/api/articles/40506070/comments")
      .expect(404)
      .then(({body}) => {
       expect(body.msg).toBe("Not Found")
      })
    })
  })

describe("Ticket 5.", () => {
  test("Returned array objects should have each of the specified properties only.", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
    expect(body.length > 0).toBe(true)
      body.forEach((article) => {
        expect(article).toHaveProperty("author")
        expect(article).toHaveProperty("title")
        expect(article).toHaveProperty("article_id")
        expect(article).toHaveProperty("topic")
        expect(article).toHaveProperty("created_at")
        expect(article).toHaveProperty("votes")
        expect(article).toHaveProperty("article_img_url")
        expect(article).toHaveProperty("comment_count")
        expect(article).not.toHaveProperty("body")
      })
    })
  })
  test("200: First item in returned array should be the the least recent article" ,() => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      expect([body[0].created_at, body[1].created_at]).toBeSorted({ descending: true })
    })
  })
})
  describe("Ticket 10; getAllUsers" , () => {
    test("Each item in the object array should have the specified properties.", () => {
      return request(app)
      .get("/api/users")
      .expect(200)
      .then(({body}) => {
        expect(body.users.length > 0).toBe(true)
        body.users.forEach((user) => {
          expect(user).toHaveProperty("username")
          expect(user).toHaveProperty("name")
          expect(user).toHaveProperty("avatar_url")
        })
      })
    })
  })
  describe("Update votes", () => {
    test("Article should be returned with votes property updated by the specified amount in the GET request.", () => {
    return request(app)
    .patch("/api/articles/1")
    .send({ "inc_votes" : 1 })
    .expect(200)
    .then(({body}) => {
      expect(body.article.newArticle[0].votes).toBe(101)
    })
  })
  test("Should return an error when passed an invalid object", () => {
    return request(app)
    .patch("/api/articles/43492")
    .send({ "inc_votes" : "abc"})
    .expect(400)
  })
  test("Article should respond with the correct error when passed an invalid article ID TYPE", () => {
    return request(app)
    .patch("/api/articles/abcde")
    .send({ "inc_votes" : 14 })
    .expect(400)
  })
})
 

