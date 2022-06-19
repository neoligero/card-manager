
export interface MongooseEntity {
  _id?: string;
  updatedAt?: Date;
}

export interface BaseRepository<T extends MongooseEntity, R = T> {
  findById(id: string): Promise<T | null>;
  create(domainObject: R): Promise<T>;
  insertMany(domainObjects: T[]): Promise<T[]>;
  modify(domainObject: T): Promise<T>;
  delete(id: string): Promise<number>;
}