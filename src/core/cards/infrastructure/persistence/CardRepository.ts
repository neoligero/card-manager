import { Card } from '../../domain/card';

export interface CardRepository {

  save(card: Card): Promise<void>;

  // We can create a DTO interface for search
  search({name, image, rarity} : {name: string, image: string, rarity: string}): Promise<Card[]>;

}