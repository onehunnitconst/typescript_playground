import path from 'node:path';
import { Worker } from 'node:worker_threads';

const data = {};

function bootstrap(): Promise<{}> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, 'service.js'), {
      workerData: {
        data, 
        path: path.resolve(__dirname, 'service.ts'),
      }
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function run() {
  const data2 = data;
  console.log(data === data2);

  const data3 = await bootstrap()
  console.log(data === data3);
}

run().catch((err) => console.error(err));