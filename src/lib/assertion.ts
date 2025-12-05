export class Assertion {
    static ERR_UNDERAGE = 1
    static ERR_MESSAGE_TOO_SHORT = 2
    static ERR_ONLY_OWNER = 3
    static ERR_MIN_AMOUNT = 4
    static ERR_MAX_AMOUNT_REACHED = 5

    static min(value: string, length: number){
        return `${value}${length}`
    }
    static max(value: string, length: number){
        return `${value}${length}`
    }
    static onlyFor(address: string){
        return ''
    }
    static minDeposit(amount: number){
        return ''
    }
    static maxDeposit(amount: number){
        return ''
    }
    static minWithdraw(amount: number){
        return ''
    }
    static maxWithdraw(amount: number){
        return ''
    }
}