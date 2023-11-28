//import Character from './Character';

export function mode(opponent: any, factor: number) {
  const notAllowed = ['id', 'name', 'rarity'];
  for (let item in opponent) {
    if (!notAllowed.includes(item)) {
      let value = opponent[item];
      value *= factor;
      opponent[item] = Math.floor(value);
    }
  }
}
