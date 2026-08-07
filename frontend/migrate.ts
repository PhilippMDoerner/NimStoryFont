import { Project } from 'ts-morph';

async function main() {
  const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
  });

  for (const sourceFile of project.getSourceFiles()) {
    for (const cls of sourceFile.getClasses()) {
      for (const prop of cls.getProperties()) {
        if (!prop.isReadonly()) {
          prop.toggleModifier('readonly', true);
        }
      }
    }
  }

  await project.save();
}

main().catch(console.error);
