const read = require("readline-sync");
import Character from "./Character";
import { player, player_hp_max } from "./hyrule_castle";

export function player_attack(opponent: Character) {
  const answer: string = read
    .question("Attack (1) or Heal (2)?\n")
    .toLowerCase();
  if (answer === "attack" || answer === "1") {
    opponent.hp -= player.str;
    return answer;
  } else if (answer === "heal" || answer === "2") {
    player.hp < player_hp_max / 2
      ? (player.hp += player_hp_max / 2)
      : (player.hp = player_hp_max);
    return answer;
  } else {
    console.log("Choose again (Attack or Heal)");
  }
}

export function enemy_attack(opponent: Character) {
  player.hp -= opponent.str;
}
