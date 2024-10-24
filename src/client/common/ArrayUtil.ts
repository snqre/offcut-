export function length<T>(array: T[]): bigint {
    return BigInt(array.length);
}

export function split<T>(array: T[], count: bigint): T[][] {
    let sets: T[][] = [];
    let length: bigint = BigInt(array.length);
    let i: bigint = 0n;
    while (i < length) {
        let set: T[] = array.slice(Number(i), Number(i + count));
        sets.push(set);
        i += 1n;
    }
    return sets;
}