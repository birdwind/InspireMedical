// import { BaseModel2 } from "@/base/data/BaseModel2";
//
// export abstract class AbstractModel2<T> implements BaseModel2 {
//   abstract getID(): number;
//
//   isCreate(): boolean {
//     return this.getID() === 0;
//   }
//
//   // deserialize(json: any, clazz: typeof Object): T;
//
//   deserialize(json: any, clazz: BaseModel2) {
//     const instance = new clazz();
//
//     for (const key in json) {
//       if (!json.hasOwnProperty(key)) {
//         continue;
//       }
//       if (typeof json[key] === "object") {
//         // @ts-ignore
//         instance[key] = this.deserialize(json[key], typeof json[key]);
//       } else {
//         // @ts-ignore
//         instance[key] = json[key];
//       }
//     }
//
//     return instance;
//   }
// }
