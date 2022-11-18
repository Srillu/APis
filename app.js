const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//GET Players API
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
    SELECT
    *
    FROM
    cricket_team
    ORDER BY
    player_id;`;
  const dbObject = await db.all(getPlayersQuery);
  response.send(dbObject);
});

//POST Players API
app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { player_name, jersey_number, role } = playerDetails;

  const addPlayerQuery = ` 
        INSERT INTO
           cricket_team( player_name, jersey_number, role)
        VALUES  
              (  
                "Vishal",
                17,
                "Bowler"
              );`;

  const dbResponse = await db.run(addPlayerQuery);
  const playerId = dbResponse.lastID;
  response.send("Player Added to Team");
});

//GET PlayerId API
app.get("/players/:playerId", async (request, response) => {
  const getPlayersQuery = `
    SELECT
    *
    FROM
    cricket_team
    ORDER BY
    player_id;`;
  const dbObject = await db.all(getPlayersQuery);
  response.send(dbObject);
});

//GET PlayerId API
app.get("/players/:playerId", async (request, response) => {
  const getPlayersQuery = `
    SELECT
    *
    FROM
    cricket_team
    ORDER BY
    player_id;`;
  const dbObject = await db.all(getPlayersQuery);
  response.send(dbObject);
});

//Update player API
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const updatePlayer = `
    UPDATE
       cricket_team
    SET
        player_name = "Maneesh",
        jersey_number = 54,
         role= "All-rounder"
   WHERE
      player_id = ${playerId};`;

  await db.run(updatePlayer);
  response.send("Player Details Updated");
});

//DELETE extraPlayer
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deleteP = `
    DELETE
    FROM
    cricket_team
    WHERE
    player_id = ${playerId};`;
  await db.run(deleteP);
  response.send("Player Removed");
});
