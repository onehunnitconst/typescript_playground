import { AesKeygen } from './aes-keygen';


describe('ECDSA Keygen Test', () => {
  let keygen: AesKeygen;

  beforeEach(() => {
    keygen = new AesKeygen();
  });

  it('Key Generate Test', async () => {
    const key = await keygen.generateKey();
    expect(key).not.toBeNull();
  });


  it('Iv Generate Test', async () => {
    const iv = await keygen.generateIv();
    expect(iv).not.toBeNull();
  });
});