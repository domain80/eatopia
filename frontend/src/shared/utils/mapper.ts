export class Mapper {
  public static map<T extends object>(data: any, targetClass: new () => T): T {
    const instance = new targetClass()
    Object.assign(instance, data)
    return instance
  }
}
