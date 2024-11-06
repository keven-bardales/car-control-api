export interface PaginationWrapperProps<T> {
  pageIndex?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  includeAll?: boolean;
  parameter?: string;
  items?: T[];
  totalItems?: number;
}

export class PaginationWrapper<T> {
  public pageIndex: number;
  public pageSize: number;
  public orderBy: string;
  public orderDirection: 'asc' | 'desc';
  public includeAll: boolean;
  public parameter: string;
  public items: T[] = [];
  public totalItems: number = 0;

  constructor(props: PaginationWrapperProps<T>) {
    const {
      pageIndex = 1,
      pageSize = 10,
      orderBy = 'createdAt',
      orderDirection = 'asc',
      includeAll = false,
      parameter = '',
      items = [],
      totalItems = 0,
    } = props;

    this.pageIndex = Math.max(pageIndex, 1);
    this.pageSize = Math.max(pageSize, 1);
    this.orderBy = orderBy;
    this.orderDirection = orderDirection === 'desc' ? 'desc' : 'asc';
    this.includeAll = includeAll;
    this.parameter = parameter;
    this.items = items;
    this.totalItems = totalItems;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromQuery<T>(reqQuery: any): PaginationWrapper<T> {
    const params: PaginationWrapperProps<T> = {
      pageIndex: Math.max(parseInt(reqQuery.pageIndex as string) || 1, 1),
      pageSize: Math.max(parseInt(reqQuery.pageSize as string) || 10, 1),
      orderBy: (reqQuery.orderBy as string) || 'createdAt',
      orderDirection: (reqQuery.orderDirection as 'asc' | 'desc') || 'asc',
      includeAll: reqQuery.includeAll === 'true',
      parameter: (reqQuery.parameter as string) || '',
    };

    return new PaginationWrapper(params);
  }

  updateResults(items: T[], totalItems: number) {
    this.items = items;
    this.totalItems = totalItems;
  }

  getProps(): PaginationWrapperProps<T> {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      includeAll: this.includeAll,
      parameter: this.parameter,
      items: this.items,
      totalItems: this.totalItems,
    };
  }
}
