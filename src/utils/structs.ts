import { parseObjectString } from ".";
import { paramSui, sui } from "../types";

export const handleStructs = (properties: any) => {
  const writeValues: any = {};
  const structs = properties
    .map((x: any) => {
      const obj = parseObjectString(x.defaultValue!);
      const keys = Object.keys(obj);

      const functionArgs =
        keys
          .map((key) => {
            const type = obj[key].split(".")[1];
            return `${key}: ${(paramSui as any)[type]}`;
          })
          .join(", ") + `, ctx: &mut TxContext`;

      const objArgs = keys
        .map((key) => {
          return key;
        })
        .join(",");

      writeValues[x.name] = {
        functionArgs,
        objArgs: `id: object::new(ctx),${objArgs}`,
      };

      // Format struct with proper indentation
      return `public struct ${x.name} has key, store {
      id: UID,${keys
        .map((key) => {
          const type = obj[key].split(".")[1];
          return `\n  ${key}: ${(sui as any)[type]}`;
        })
        .join(",")}
    }`;
    })
    .join("\n\n");

    return {
        writeValues,
        STRUCTS: structs
    }
};
