import { BaseRepository, MongooseEntity } from './BaseRepository';
import { Document } from 'mongoose';
import { injectable, unmanaged } from 'inversify';

@injectable()
export class MongooseBaseRepository<T extends MongooseEntity, R = T> implements BaseRepository<T, R> {
  domainObjectKlass;
  model;

  constructor(@unmanaged() domainObjectKlass: any, @unmanaged() model: any) {
    this.domainObjectKlass = domainObjectKlass;
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    const data = await this.model.findOne({ _id: id }).lean();
    if (!data) {
      return null;
    }
    return this.toObjectDomain(data);
  }

  async create(domainObject: R): Promise<T> {
    const document = await this.model.create(domainObject);
    return this.toObjectDomain(document.toObject());
  }

  async insertMany(domainObjects: T[]): Promise<T[]> {
    const documents = await this.model.insertMany(domainObjects);
    return documents.map((document: any) => {
      return this.toObjectDomain(document.toObject());
    });
  }

  async modify(domainObject: T): Promise<T> {
    this.normalizeUpdatedAtTimestamp(domainObject);
    const data = await this.model.findOneAndUpdate({
      _id: domainObject._id,
    },
      domainObject,
      {
        new: true,
        upsert: true,
      }).lean();
    return this.toObjectDomain(data);
  }

  async delete(id: string): Promise<number> {
    const deleteAction = await this.model.deleteOne({ _id: id }).exec();
    return deleteAction.deletedCount;
  }

  protected toObjectDomain(data: Document) {
    return new this.domainObjectKlass(this.parseObjectIds(data));
  }

  private normalizeUpdatedAtTimestamp(domainObject: T) {
    if (domainObject.updatedAt) {
      delete domainObject.updatedAt;
    }
  }

  private processArrayItems(plainArray: any[]) {
    return plainArray.map(item => {
      if (!item) { return null; }
      if (typeof item === 'object') {
        const innerKeys = Object.keys(item);

        if (innerKeys.includes('id') && innerKeys.includes('_bsontype')) { return item.toString(); }

        return this.parseObjectIds(item);
      }
      return item;
    });
  }

  protected parseObjectIds(document: any) {
    const mainKeys = Object.keys(document);
    for (const key of mainKeys) {
      const value = document[ key ];
      if (!value) { continue; }
      if (typeof value === 'object') {
        const innerKeys = Object.keys(value);
        if (innerKeys.includes('id') && innerKeys.includes('_bsontype')) { document[ key ] = value.toString(); continue; }
        if (Array.isArray(value)) { document[ key ] = this.processArrayItems(value); continue; }
        document[ key ] = this.parseObjectIds(value);
      }
    }
    return document;
  }

  protected latinizedString(query: string) {
    let latinizedQuery = query.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    latinizedQuery = latinizedQuery.replace(/a/g, '[aáàäâ]');
    latinizedQuery = latinizedQuery.replace(/e/g, '[eèéêëæ]');
    latinizedQuery = latinizedQuery.replace(/i/g, '[iìíîï]');
    latinizedQuery = latinizedQuery.replace(/o/g, '[oòóôõöø]');
    latinizedQuery = latinizedQuery.replace(/u/g, '[uùúûü]');
    latinizedQuery = latinizedQuery.replace(/y/g, '[yÿ]');
    return latinizedQuery;
  }
}
