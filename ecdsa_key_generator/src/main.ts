import * as readline from 'readline';
import { ECDSAKeygen } from './ecdsa-keygen';

function main() {
  const keygen = new ECDSAKeygen('P-256');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  process.stdout.write("키를 생성하시려면 Enter 키를 눌러주세요.");
  
  rl.on('line', () => {
    rl.close();
  });

  rl.on('close', () => {
    keygen.generateECDSAkey().then((pair) => {
      console.log(pair);
      process.exit();
    });
  })
}

main();
