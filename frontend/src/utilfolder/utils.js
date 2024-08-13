import axios from "axios";

// Base URL for your API
const API_URL = 'http://localhost:80'; // Adjust to your server URL

// Get all questions
export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    console.log(error);
    throw error;
  }
};

// Add a new question
export const addQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${API_URL}/questions`, questionData);
    console.log("question added" + questionData);
    return response.data;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

// Update an existing question
export const updateQuestion = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/questions/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

// Delete a question
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};
