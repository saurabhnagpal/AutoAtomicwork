import { Selector } from "testcafe";
const ApiClient = require("../utils/apiClient");
const logger = require("../utils/logging");
const fs = require("fs");
const path = require("path");

// Load test data
const testData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/userData.json"), "utf8")
);

fixture`User API Tests`.page`about:blank`;

const apiClient = new ApiClient();

// Get all users
test("Get all users", async (t) => {
  const response = await apiClient.getUsers();
  await t.expect(response.status).eql(200);
  await t.expect(Array.isArray(response.data)).ok();
  logger.info("Retrieve all users test passed");
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
  await t.expect(response.data.name).eql(newUser.name);
  await t.expect(response.data.name).eql(newUser.username);
  await t.expect(response.data.email).eql(newUser.email);
  logger.info("Create a new user test passed");
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
  await t.expect(updateResponse.data.name).eql(updatedUser.name);
  await t.expect(updateResponse.data.name).eql(updatedUser.username);
  await t.expect(updateResponse.data.email).eql(updatedUser.email);
  logger.info("Update an existing user test passed");
});

// Delete user
test("Delete an existing user", async (t) => {
  const userId = 1;
  const deleteResponse = await apiClient.deleteUser(userId);
  await t.expect(deleteResponse.status).eql(200);
  logger.info("Delete an existing user test passed");
});
