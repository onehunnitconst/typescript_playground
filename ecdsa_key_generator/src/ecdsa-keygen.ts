import { webcrypto } from 'node:crypto';
import { ECDSAKeyPair } from './ecdsa-keypair';

type ECDSAKeyPairBuffer = {
  publicKeyBuffer: ArrayBuffer,
  privateKeyBuffer: ArrayBuffer,
};

export class ECDSAKeygen {
  constructor(
    private readonly namedCurve: string,
  ) {}

  async generateECDSAkey(): Promise<ECDSAKeyPair>{
    const ecdsaKeyPair = await this.generateEcdsaKeyPair();
  
    const ecdsaKeyPairBuffer = await this.ecdsaKeyToBuffer(ecdsaKeyPair);
  
    return this.ecdsaKeyBufferToString(ecdsaKeyPairBuffer);
  }

  private async generateEcdsaKeyPair() {
    return await webcrypto.subtle.generateKey({
      name: 'ECDSA',
      namedCurve: this.namedCurve,
    }, true, ['sign', 'verify']);
  }

  private async ecdsaKeyToBuffer(ecdsaKeyPair: webcrypto.CryptoKeyPair): Promise<ECDSAKeyPairBuffer> {
    const publicKeyBuffer = await webcrypto.subtle.exportKey('spki', ecdsaKeyPair.publicKey);
    const privateKeyBuffer = await webcrypto.subtle.exportKey('pkcs8', ecdsaKeyPair.privateKey);
    return { publicKeyBuffer, privateKeyBuffer };
  }

  private async ecdsaKeyBufferToString(ecdsaKeyPairBuffer: ECDSAKeyPairBuffer): Promise<ECDSAKeyPair> {
    const publicKey = this.bufferToBase64(ecdsaKeyPairBuffer.publicKeyBuffer);
    const privateKey = this.bufferToBase64(ecdsaKeyPairBuffer.privateKeyBuffer);
    return { publicKey, privateKey };
  }

  private bufferToBase64(buffer: ArrayBuffer) {
    return Buffer.from(buffer).toString('base64');
  }
}