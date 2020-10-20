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
    console.log(`inside api: ` + slug)
    return axios.get("/api/boards/boardslug/" + slug);
  },
  // Deletes the board with the given id
  deleteBoard: function(id) {
    return axios.delete("/api/boards/" + id);
  },
  // Saves a board to the database
  saveBoard: function(boardData) {
    console.log(`api route: ` + boardData)
    return axios.post("/api/boards", boardData);
  },
  // Gets all suggestions
  getSuggestions: function() {
    return axios.get("/api/suggestions");
  },
  getSuggestionsByBoardID: function(boardID) {
    return axios.get("/api/suggestions/boardid/" + boardID);
  },
  saveSuggestion: function(suggestionData) {
    console.log(`suggestion api route, suggestion data = ` + JSON.stringify(suggestionData));
    return axios.post("/api/suggestions", suggestionData);
  }
};
