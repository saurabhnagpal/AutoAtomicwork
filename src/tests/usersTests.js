"use strict";
const ApiClient = require("../utils/apiClient");
const logger = require("../utils/logging");
const fs = require("fs");
const path = require("path");

// Load test data
const testData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/userData.json"), "utf8")
);

fixture`User API Tests`.page(process.env.BASE_URL);

const apiClient = new ApiClient();

// Get all users
test("Get all users", async (t) => {
  const response = await apiClient.getUsers();
  await t.expect(response.status).eql(200);
  const users = response.body;
  await t
    .expect(users.length)
    .gt(0, "Expected at least one user in the response");

  await t.expect(Array.isArray(response.data)).ok();
  logger.info("Retrieved all users");
});

// Create new user
test("Create a new user", async (t) => {
  const newUser = {
    name: "some user",
    username: "random-Atomicwork",
    email: "someuser@Atomicwork.com",
  };
  const response = await apiClient.createUser(newUser);
  await t.expect(response.status).eql(201);
  await t
    .expect(response.data.name)
    .eql(newUser.name, "Name should be the same");
  await t
    .expect(response.data.name)
    .eql(newUser.username, "UserName should be the same");
  await t.expect(response.data.email).eql(newUser.email),
    "Email should be the same";
  logger.info("New User created");
});

// Update user
test("Update an existing user", async (t) => {
  const userId = 1;
  const updatedUser = {
    name: "Update some user name",
    username: "updated random",
    email: "updatedemail@Atomicwork.com",
  };
  const updateResponse = await apiClient.updateUser(userId, updatedUser);
  await t.expect(updateResponse.status).eql(200);
  await t
    .expect(updateResponse.data.name)
    .eql(updatedUser.name, "Name should be updated");
  await t
    .expect(updateResponse.data.name)
    .eql(updatedUser.username, "Username should be updated");
  await t
    .expect(updateResponse.data.email)
    .eql(updatedUser.email, "Email should be updated");
  logger.info("Updated an existing user");
});

// Delete user
test("Delete an existing user", async (t) => {
  const userId = 3;
  const deleteResponse = await apiClient.deleteUser(userId);
  await t.expect(deleteResponse.status).eql(204);
  logger.info("Deleted an existing user");
});
