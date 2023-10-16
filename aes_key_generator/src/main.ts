import * as readline from 'readline';
import { AesKeygen } from './aes-keygen';

function main() {
  const keygen = new AesKeygen();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  process.stdout.write("키를 생성하시려면 Enter 키를 눌러주세요.");
  
  rl.on('line', () => {
    rl.close();
  });

  rl.on('close', async () => {
    const key = await keygen.generateKey();
    const iv = await keygen.generateIv();

    console.log({ key, iv });
    process.exit();
  })
}

main();
