const axios = require("axios");
const config = require("../config/config");
const logger = require("../utils/logging");

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: `${config.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  async getUsers() {
    try {
      const response = await this.client.get("/users");
      logger.info("Get Users Response:", response.data);
      return response;
    } catch (error) {
      logger.error("Error getting users:", error);
      throw error;
    }
  }

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
