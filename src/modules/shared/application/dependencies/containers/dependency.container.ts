// src/application/dependencies/dependency-container.ts
export class DependencyContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private services: Map<string, any> = new Map();

  register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }

  resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not found: ${key}`);
    }
    return service;
  }
}
