import { ECDSAKeygen } from './ecdsa-keygen';
import { ECDSAKeyPair } from './ecdsa-keypair';

describe('ECDSA Keygen Test', () => {
  const runKeygenTest = (namedCurve: 'P-256' | 'P-384' | 'P-521') => async () => {
    const keygen = new ECDSAKeygen(namedCurve);

    const keyPair: ECDSAKeyPair = await keygen.generateECDSAkey();
    expect(keyPair).not.toBeNull();
  }

  it('Key Generate Test, Elliptic Curve P-256', runKeygenTest('P-256'));

  it('Key Generate Test, Elliptic Curve P-384', runKeygenTest('P-384'));

  it('Key Generate Test, Elliptic Curve P-512', runKeygenTest('P-521'));
});