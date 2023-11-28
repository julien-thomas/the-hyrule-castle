const fs = require("fs");
import Character from "./Character";

export function getRarity() {
  const random: number = Math.floor(Math.random() * 100);
  let rarity: number = 0;
  if (random >= 0 && random < 50) {
    rarity = 1;
  } else if (random >= 50 && random < 80) {
    rarity = 2;
  } else if (random >= 80 && random < 95) {
    rarity = 3;
  } else if (random >= 95 && random < 99) {
    rarity = 4;
  } else {
    rarity = 5;
  }
  return rarity;
}

export function getPlayer() {
  const players_path: string = "./base_game/src/players.json";
  const players_string: string = fs.readFileSync(players_path, "utf-8");
  const players: Character[] = JSON.parse(players_string);
  let players_array: Character[] = [];
  const rarity: number = getRarity();
  for (const element of players) {
    if (element.rarity === rarity) {
      players_array.push(element);
    }
  }
  const player =
    players_array[Math.floor(Math.random() * players_array.length)];
  return player;
}

export function getEnemy() {
  const enemies_path: string = "./base_game/src/enemies.json";
  const enemies_string: string = fs.readFileSync(enemies_path, "utf-8");
  const enemies: Character[] = JSON.parse(enemies_string);
  let enemies_array: Character[] = [];
  const rarity: number = getRarity();
  for (const element of enemies) {
    if (element.rarity === rarity) {
      enemies_array.push(element);
    }
  }
  const enemy = enemies_array[Math.floor(Math.random() * enemies_array.length)];
  return enemy;
}

export function getBoss() {
  const bosses_path: string = "./base_game/src/bosses.json";
  const bosses_string: string = fs.readFileSync(bosses_path, "utf-8");
  const bosses: Character[] = JSON.parse(bosses_string);
  let bosses_array: Character[] = [];
  const rarity: number = getRarity();
  for (const element of bosses) {
    if (element.rarity === rarity) {
      bosses_array.push(element);
    }
  }
  const boss = bosses_array[Math.floor(Math.random() * bosses_array.length)];
  return boss;
}
