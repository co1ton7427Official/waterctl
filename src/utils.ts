export function bufferToHexString(array: ArrayBuffer): string {
  // explanation: [0x12, 0x34, 0xAB, 0xCD] => "1234ABCD"
  return Array.from(new Uint8Array(array))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export function decAsHex(n: number): number {
  // explanation: 42 => 0x42
  let ret = 0;
  for (let p = 0; n > 0; n = (n - (n % 10)) / 10) ret |= n % 10 << (p++ << 2);
  return ret;
}

// だって思考と錯誤のモンスター
// それ僕のこと？ いや皆のこと！
// 一緒になって踊ろうよ、さ！
