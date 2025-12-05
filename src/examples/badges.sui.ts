import { Assert, Has, Mint, Module, Transfer } from "../decorators";
import { Assertion } from "../lib/assertion";
import { sui } from "../types";

const ADMIN_ADDRESS = '0xbed1a0d1bb2b8e281d81b838f6c35d7864936f0de3233eb161181ab765e0ea40'

@Module('badges')
class BadgeCollection {

    @Has(['key', 'store'])
    Badge = {
        name: sui.string,
        description: sui.string,
        image_url: sui.string,
    }

    @Mint('Badge', {display: true})
    @Transfer(['receiver'])
    @Assert([
        {must: Assertion.onlyFor(ADMIN_ADDRESS), code: Assertion.ERR_ONLY_OWNER},
    ])
    mint_badge(){}

}

export default BadgeCollection
