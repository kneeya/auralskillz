export function  getRandomInt(min, max) {
    let byteArray = new Uint8Array(1);
    crypto.getRandomValues(byteArray);

    let range = max - min + 1;
    const MAX_RANGE = 256;
    if (byteArray[0] >= Math.floor(MAX_RANGE / range) * range)
      return this.getRandomInt(min,max);
    return min + (byteArray[0] % range);
  }

