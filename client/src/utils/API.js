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
  getBoardBySlug: function(slug) {
    return axios.get("/api/boards/boardslug/" + slug);
  },
  // Deletes the board with the given id
  deleteBoard: function(id) {
    return axios.delete("/api/boards/" + id);
  },
  // Saves a board to the database
  saveBoard: function(boardData) {
    return axios.post("/api/boards", boardData);
  },
  // Updates the boards info
  updateBoard: function(id, boardUpdate) {
    return axios.put("/api/boards/" + id, boardUpdate)
  },
  // Gets all suggestions
  getSuggestions: function() {
    return axios.get("/api/suggestions");
  },
  // Gets suggestion by id
  getSuggestion: function(id) {
    return axios.get("/api/suggestions/" + id);
  },
  // Gets all suggestions by board id
  getSuggestionsByBoardID: function(boardID) {
    return axios.get("/api/suggestions/boardid/" + boardID);
  },
  findSuggestionByBoardIdSortByVotes: function(boardID) {
    return axios.get("/api/suggestions/boardid/sortbyvotes/" + boardID)
  },
  // Saves suggestion
  saveSuggestion: function(suggestionData) {
    return axios.post("/api/suggestions", suggestionData);
  },
  // Updates the suggestion with the given id
  updateSuggestion: function(id, suggestionUpdate) {
    return axios.put("/api/suggestions/" + id, suggestionUpdate)
  },
  // Deletes the suggestion with the given id
  deleteSuggestion: function(id) {
    return axios.delete("/api/suggestions/" + id);
  },
};
