"use strict";

const axios = require("axios");
const config = require("../config/config");
const logger = require("../utils/logging");

// APIClient class for handling HTTP requests to the API.
class ApiClient {
  constructor() {
    this.client = axios.create({
      // Initializes the ApiClient with base URL and headers.
      baseURL: config.baseUrl,
      headers: {
        Authorization: `${config.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Retrieves all users from the API.
  async getUsers() {
    try {
      const response = await this.client.get("/users"); // Get request
      logger.info("Get Users Response:", response.data);
      return response;
    } catch (error) {
      logger.error("Error getting users:", error);
      throw error;
    }
  }

  // Creates a new user by sending a POST request to the API.
  async createUser(userData) {
    try {
      const response = await this.client.post("/users", userData);
      logger.info("Create User Response:", response.data);
      return response;
    } catch (error) {
      logger.error("Error creating user:", error);
      throw error;
    }
  }

  // Updates an existing user by sending a PUT request to the API.
  async updateUser(userId, userData) {
    try {
      const response = await this.client.put(`/users/${userId}`, userData);
      logger.info("Update User Response:", response.data);
      return response;
    } catch (error) {
      logger.error("Error updating user:", error);
      throw error;
    }
  }

  // Deletes an existing user by sending a DELETE request to the API.
  async deleteUser(userId) {
    try {
      const response = await this.client.delete(`/users/${userId}`);
      logger.info("Delete User Response:", response.status);
      return response;
    } catch (error) {
      logger.error("Error deleting user:", error);
      throw error;
    }
  }
}

module.exports = ApiClient;
