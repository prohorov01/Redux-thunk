import axios from "axios";

const API_URL = "https://6478fea8362560649a2ec272.mockapi.io/api";

export const fetchTodo = async () => {
  try {
    const response = await axios.get(`${API_URL}/todo`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};

export const createTodo = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/todo`, { text });
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/todo/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
