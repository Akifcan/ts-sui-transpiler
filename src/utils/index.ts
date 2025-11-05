import chalk from "chalk";
import fs from "node:fs";
import { Project } from "ts-morph";

export function parseObjectString(
  objectString: string
): Record<string, string> {
  const parsedObject: Record<string, string> = {};

  try {
    const cleanedString = objectString
      .replace(/\s+/g, " ") 
      .trim();

    const keyValuePattern = /(\w+):\s*([^,}]+)/g;
    let match;

    while ((match = keyValuePattern.exec(cleanedString)) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();
      parsedObject[key] = value;
    }
  } catch (e) {
    console.log(chalk.red.bold("Parse error:"), e);
  }

  return parsedObject;
}

export function getSourceFile(filePath: string) {
  const project = new Project();

  const sourceFile = project.createSourceFile(
    "Contract.ts",
    fs.readFileSync(filePath, "utf-8")
  );

  const classesJSON = sourceFile.getClasses().map((cls) => ({
    name: cls.getName(),
    decorators: cls.getDecorators().map((d) => ({
      name: d.getName(),
      arguments: d.getArguments().map((arg) => arg.getText()),
    })),
    properties: cls.getProperties().map((p) => {
      const type = p.getType();
      const typeText = type.getText();

      let typeDetails = null;
      if (type.isObject() && typeText.startsWith("{")) {
        const properties = type.getProperties();
        typeDetails = properties.map((prop) => ({
          name: prop.getName(),
          type: prop.getValueDeclaration()?.getType().getText() || "unknown",
        }));
      }

      return {
        name: p.getName(),
        type: typeText,
        typeDetails: typeDetails,
        defaultValue: p.getInitializer()?.getText() || null,
        decorators: p.getDecorators().map((d) => ({
          name: d.getName(),
          arguments: d.getArguments().map((arg) => arg.getText()),
        })),
      };
    }),
    constructors: cls.getConstructors().map((c) => ({
      parameters: c.getParameters().map((p) => ({
        name: p.getName(),
        type: p.getType().getText(),
      })),
    })),

    methods: cls.getMethods().map((m) => ({
      name: m.getName(),
      returnType: m.getReturnType().getText(),
      parameters: m.getParameters().map((p) => ({
        name: p.getName(),
        type: p.getType().getText(),
      })),
      decorators: m.getDecorators().map((d) => ({
        name: d.getName(),
        arguments: d.getArguments().map((arg) => arg.getText()),
      })),
      body: m.getBody()?.getText().replace(/\n\s*/g, " ").trim() || null,
    })),
  }));

  return classesJSON;
}
