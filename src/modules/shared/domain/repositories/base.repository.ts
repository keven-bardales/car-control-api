export interface BaseRepository<T, ID> {
  create(entity: T): Promise<T | null>;
  getById(id: ID): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(entity: T): Promise<T>;
  delete(id: ID): Promise<boolean>;
}
