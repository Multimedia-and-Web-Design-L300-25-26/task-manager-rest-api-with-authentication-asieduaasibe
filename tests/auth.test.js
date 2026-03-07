import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";

let token;

beforeAll(async () => {
  // Clear existing test user
  await User.deleteOne({ email: "auth@example.com" });

  // Register
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Auth User",
      email: "auth@example.com",
      password: "123456"
    });

  // Login
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "auth@example.com",
      password: "123456"
    });

  token = res.body.token;
}, 30000);

describe("Auth Routes", () => {

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "New User",
        email: "newuser@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  }, 10000);

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "auth@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  }, 10000);

});