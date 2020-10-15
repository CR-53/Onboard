import axios from "axios";

export default {
  // Gets all boards
  getBoards: function() {
    return axios.get("/api/boards");
  },
  // Gets the board with the given id
  getBoard: function(id) {
    return axios.get("/api/boards/" + id);
  },
  // Deletes the board with the given id
  deleteBoard: function(id) {
    return axios.delete("/api/boards/" + id);
  },
  // Saves a board to the database
  saveBoard: function(boardData) {
    console.log(`api route: ` + boardData)
    return axios.post("/api/boards", boardData);
  }
};
