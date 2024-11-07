import { PaginationWrapperProps } from '@modules/shared/domain/wrappers/pagination-wrapper';

export interface BaseRepository<T, ID> {
  create(entity: T): Promise<T | null>;
  getById(id: ID): Promise<T | null>;
  getAll(paginationOptions: PaginationWrapperProps<T>): Promise<T[]>;
  update(entity: T): Promise<T | null>;
  count(): Promise<number>;
  delete(id: ID): Promise<boolean>;
  exists(id: ID): Promise<boolean>;
}
