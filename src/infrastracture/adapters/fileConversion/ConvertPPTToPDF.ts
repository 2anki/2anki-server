import { S3 } from 'aws-sdk';
import Workspace from '../../../lib/parser/WorkSpace';
import path from 'path';
import fs from 'fs/promises';
import { spawn } from 'child_process';

export function convertPPTToPDF(
  name: string,
  contents: S3.Body,
  workspace: Workspace
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const unoconvBin =
      process.platform === 'darwin'
        ? '/usr/local/bin/unoconv'
        : '/usr/bin/unoconv';

    const normalizedName = path.basename(name);
    const tempFile = path.join(workspace.location, normalizedName);

    fs.writeFile(tempFile, Buffer.from(contents as Buffer))
      .then(() => {
        const pdfFile = path.join(
          workspace.location,
          path.basename(normalizedName, path.extname(normalizedName)) + '.pdf'
        );

        const unoconvProcess = spawn(unoconvBin, ['-f', 'pdf', tempFile], {
          cwd: workspace.location,
        });

        let stdout = '';
        let stderr = '';

        unoconvProcess.stdout.on('data', (data) => {
          stdout += data;
        });

        unoconvProcess.stderr.on('data', (data) => {
          stderr += data;
        });

        unoconvProcess.on('close', async (code) => {
          await fs.writeFile(
            path.join(workspace.location, 'stdout.log'),
            stdout
          );
          await fs.writeFile(
            path.join(workspace.location, 'stderr.log'),
            stderr
          );
          if (code !== 0) {
            await fs.writeFile(
              path.join(workspace.location, 'error.log'),
              `Conversion failed with code ${code}`
            );
            reject(new Error(`Conversion failed with code ${code}`));
          } else {
            resolve(await fs.readFile(pdfFile));
          }
        });
      })
      .catch((err) => reject(new Error(err.message || 'File write failed')));
  });
}
