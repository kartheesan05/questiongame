import axios from "axios";

const API_URL = import.meta.env.VITE_APIURL;

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/questions`);
    console.log(import.meta.env.TEST)
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    console.log(error);
    throw error;
  }
};

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

export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};
