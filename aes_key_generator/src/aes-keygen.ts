import { webcrypto } from 'node:crypto';

export class AesKeygen {
  async generateKey() {
    const aesKey = await webcrypto.subtle.generateKey({
      name: 'AES-CBC',
      length: 128,
    }, true, ['encrypt', 'decrypt']);
  
    const aesKeyExported = await webcrypto.subtle.exportKey('jwk', aesKey);
  
    return this.encodeJwkToBase64(aesKeyExported);
  }

  async generateIv() {
    const ivBuffer = webcrypto.getRandomValues(new Uint8Array(16));
    return this.bufferToBase64(ivBuffer);
  }

  private encodeJwkToBase64(obj: webcrypto.JsonWebKey): string {
    return Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');
  }

  private bufferToBase64(buffer: ArrayBuffer) {
    return Buffer.from(buffer).toString('base64');
  }
}