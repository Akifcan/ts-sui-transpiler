import { Assert, Balance, Has, Module, Write } from "../decorators";
import { Assertion } from "../lib/assertion";
import { BalanceFor, sui } from "../types";

@Module('guestbook')
class Guestbook {

    @Balance()
    @Assert([
        {must: Assertion.minDeposit(1), code: Assertion.ERR_MIN_AMOUNT},
    ])
    TipJar: BalanceFor = ['deposit', 'withdraw', 'get_balance']

    @Has(['key', 'store'])
    Message = {
        author: sui.string,
        content: sui.string,
        tip_amount: sui.u32
    }

    @Write('Message')
    @Assert([
        {must: Assertion.min('author', 2), code: Assertion.ERR_MESSAGE_TOO_SHORT},
        {must: Assertion.min('content', 5), code: Assertion.ERR_MESSAGE_TOO_SHORT},
    ])
    leave_message(){}

}

export default Guestbook
