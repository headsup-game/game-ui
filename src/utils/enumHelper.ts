export function getEnumName(enumObj: any, value: number): string | undefined {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
}
