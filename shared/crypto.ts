export function sha256(input: string): string {
    // Helper function to add numbers modulo 2^32
    function addMod32(a: number, b: number): number {
        return (a + b) >>> 0;
    }

    // Rotate right
    function rotr(value: number, shift: number): number {
        return (value >>> shift) | (value << (32 - shift));
    }

    // SHA-256 constants
    const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];

    // Preprocessing
    const message = new TextEncoder().encode(input);
    const paddedMessage = new Uint8Array(((message.length + 9 + 63) >> 6) << 6);
    paddedMessage.set(message);
    paddedMessage[message.length] = 0x80; // Append '1' bit
    const bitLength = message.length * 8;
    paddedMessage[paddedMessage.length - 4] = (bitLength >>> 24) & 0xff;
    paddedMessage[paddedMessage.length - 3] = (bitLength >>> 16) & 0xff;
    paddedMessage[paddedMessage.length - 2] = (bitLength >>> 8) & 0xff;
    paddedMessage[paddedMessage.length - 1] = bitLength & 0xff;

    // Initial hash values
    let H = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
    ];

    // Process each 512-bit chunk
    for (let i = 0; i < paddedMessage.length; i += 64) {
        const W = new Uint32Array(64);
        for (let t = 0; t < 16; t++) {
            W[t] =
                (paddedMessage[i + t * 4] << 24) |
                (paddedMessage[i + t * 4 + 1] << 16) |
                (paddedMessage[i + t * 4 + 2] << 8) |
                paddedMessage[i + t * 4 + 3];
        }
        for (let t = 16; t < 64; t++) {
            const s0 = rotr(W[t - 15], 7) ^ rotr(W[t - 15], 18) ^ (W[t - 15] >>> 3);
            const s1 = rotr(W[t - 2], 17) ^ rotr(W[t - 2], 19) ^ (W[t - 2] >>> 10);
            W[t] = addMod32(addMod32(W[t - 16], s0), addMod32(W[t - 7], s1));
        }

        let [a, b, c, d, e, f, g, h] = H;
        for (let t = 0; t < 64; t++) {
            const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
            const ch = (e & f) ^ (~e & g);
            const temp1 = addMod32(addMod32(addMod32(h, S1), ch), addMod32(K[t], W[t]));
            const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = addMod32(S0, maj);

            h = g;
            g = f;
            f = e;
            e = addMod32(d, temp1);
            d = c;
            c = b;
            b = a;
            a = addMod32(temp1, temp2);
        }

        H = H.map((value, index) => addMod32(value, [a, b, c, d, e, f, g, h][index]));
    }

    // Convert hash to hex string
    return H.map(value => value.toString(16).padStart(8, '0')).join('');
}
