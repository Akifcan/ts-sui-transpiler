import { Assert, Balance, Has, Module, Move, Write } from "../decorators";
import { Assertion } from "../lib/assertion";
import { BalanceFor, Mut, Primitive, sui } from "../types";
import { exec } from "../utils";

const ARBITER_ADDRESS = '0xbed1a0d1bb2b8e281d81b838f6c35d7864936f0de3233eb161181ab765e0ea40'

@Module('escrow')
class Escrow {

    @Balance()
    Vault: BalanceFor = ['deposit', 'withdraw', 'get_balance']

    @Has(['key', 'store'])
    Deal = {
        buyer: sui.address,
        seller: sui.address,
        amount: sui.u32,
        is_completed: sui.bool,
        is_disputed: sui.bool
    }

    @Write('Deal')
    @Assert([
        {must: 'amount > 0', code: Assertion.ERR_MIN_AMOUNT},
    ])
    create_deal(){}

    @Move()
    complete_deal(deal: Mut<'Deal'>){
        exec`
            deal.is_completed = true;
        `
    }

    @Move()
    open_dispute(deal: Mut<'Deal'>){
        exec`
            deal.is_disputed = true;
        `
    }

    @Move()
    @Assert([
        {must: Assertion.onlyFor(ARBITER_ADDRESS), code: Assertion.ERR_ONLY_OWNER},
    ])
    resolve_dispute(deal: Mut<'Deal'>, in_favor_of_buyer: Primitive<'bool'>){
        exec`
            deal.is_disputed = false;
            deal.is_completed = true;
        `
    }

}

export default Escrow
