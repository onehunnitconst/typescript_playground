import { isMainThread, parentPort, workerData } from 'node:worker_threads';

function run() {
  if (!isMainThread) {
    parentPort!.postMessage(workerData.data);
  }
}

run();