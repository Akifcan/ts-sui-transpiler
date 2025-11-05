import * as yup from "yup";
import chalk from "chalk";
import { filePathSchema } from "../schemas/file-path.schema";
import { formatMoveCode, getSourceFile, parseObjectString } from "../utils";
import { paramSui, sui } from "../types";

export async function compile(filePath: string): Promise<void> {
  try {
    await filePathSchema.validate(filePath);
    const classesJSON = getSourceFile(filePath);

    const moduleName = classesJSON[0].decorators[0].arguments[0].replace(
      /'/g,
      ""
    );
    const packageName = classesJSON[0].name?.toLowerCase();
    const writeValues: any = {};

    const STRUCTS = classesJSON[0].properties
      .map((x) => {
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

    const writeMethods = classesJSON[0].methods.filter((x) =>
      x.decorators.find((y) => y.name === "Write")
    );
    const WRITE_METHODS = writeMethods
      .map((method) => {
        const struct = method.decorators[0].arguments[0].replace(/'/g, "");
        const variable = struct.toLowerCase();
        return `public fun ${method.name}(${writeValues[struct].functionArgs}) {
  let ${variable} = ${struct} {${writeValues[struct].objArgs}};
  transfer::share_object(${variable});
}`;
      })
      .join("\n\n");

    // Build the complete Move module
    const moveModule = `module ${moduleName}::${packageName} {
  use std::string::{Self, String};

  ${STRUCTS}

  ${WRITE_METHODS}
}`;
    const formattedCode = formatMoveCode(moveModule);

    console.log(chalk.cyan("\n" + "=".repeat(60)));
    console.log(chalk.cyan.bold("Generated Move Code:"));
    console.log(chalk.cyan("=".repeat(60) + "\n"));

    const highlightedCode = formattedCode
      .split("\n")
      .map((line) => {
        // Highlight keywords
        return line
          .replace(
            /\b(module|use|public|struct|fun|let|has|key|store)\b/g,
            chalk.blue("$1")
          )
          .replace(/\b(Self|String|UID)\b/g, chalk.yellow("$1"))
          .replace(/(::|->)/g, chalk.gray("$1"))
          .replace(/(\/\/.*$)/gm, chalk.green("$1")); // Comments
      })
      .join("\n");

    console.log(highlightedCode);
    console.log(chalk.cyan("\n" + "=".repeat(60) + "\n"));
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.log(chalk.red.bold(`Error: ${error.message}`));
      console.log("Usage: demo-app --compile <file-path>");
      console.log("Example: demo-app --compile ./path/to/file.sui.ts");
    } else {
      console.log(chalk.red.bold("An unexpected error occurred:"), error);
    }
    process.exit(1);
  }
}
