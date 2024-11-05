export interface BaseRepository<T, ID> {
  create(entity: T): Promise<T | null>;
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<boolean>;
}
