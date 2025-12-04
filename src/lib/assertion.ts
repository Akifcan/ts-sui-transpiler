export class Assertion {
    static ERR_UNDERAGE = 1
    static ERR_MESSAGE_TOO_SHORT = 2
    static ERR_ONLY_OWNER = 3

    static min(value: string, length: number){
        return `${value}${length}`
    }
    static max(value: string, length: number){
        return `${value}${length}`
    }
    static onlyFor(address: string){
        return ''
    }
}