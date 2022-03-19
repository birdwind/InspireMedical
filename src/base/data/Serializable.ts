export interface Serializable {
  deserialize(json: any, clazz: typeof Object): Object;
}
