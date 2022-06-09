import { Card } from '../core/cards/domain/card';
import { CardRepository } from '../core/cards/infrastructure/persistence/CardRepository';
import { MongoClient } from 'mongodb';

class MongoAdapter implements CardRepository {

  public async save(card: Card): Promise<void> {
    const collection = await this.getCollection('cards');
    await collection.insertOne(card);
  }

  public async search({name, image, rarity}: {name: string, image: string, rarity: string}): Promise<Card[]> {
    const collection = await this.getCollection('cards');
    const cards: Card[] = await collection.find({ name, image, rarity }).toArray();
    return cards;
  }

  /// Collection per request, It's just a mock
  private async getCollection(name: string) {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db('streamloots');
    return db.collection(name);
  }
}

export default MongoAdapter;