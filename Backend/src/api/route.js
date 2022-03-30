import express from "express";
import characterCtrl from "./character.controller";
import playerCtrl from "./player.controller";
import attackCtrl from "./attack.controller";

const router = express.Router();

// characters
router.route("/characters").get(characterCtrl.apiGetCharacters);
router.route("/characters").post(characterCtrl.apiCreateCharacter);
router.route("/characters/:id").delete(characterCtrl.apiDeleteCharacter);

// moves
router.route("/attacks").get(attackCtrl.apiGetAttacks);
router.route("/attacks/:character").get(attackCtrl.apiGetAttacks);
router.route("/attacks/all/:input").get(attackCtrl.apiGetAttacks);
router.route("/attacks").post(attackCtrl.apiCreateAttack);
router.route("/attacks/:id").delete(attackCtrl.apiDeleteAttack);

// top_players
router.route("/players").get(playerCtrl.apiGetPlayers);
router.route("/players/:character").get(playerCtrl.apiGetPlayers);
router.route("/players").post(playerCtrl.apiCreatePlayer);
router.route("/players/:id").delete(playerCtrl.apiDeletePlayer);

export default router;
