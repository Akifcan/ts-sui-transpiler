import { Assert, Has, Module, OnlyFor, Write } from "./decorators";
import { sui } from "./types";

const ERROR_CODES = {
    ERR_UNDERAGE: 1
}

const MY_ADDRESS = '0xbed1a0d1bb2b8e281d81b838f6c35d7864936f0de3233eb161181ab765e0ea40'

@Module('hello_world')
class Asserti {

    @Has(['key', 'store'])
    User = {
        name: sui.string,
        status: sui.bool,
        age: sui.u8
    }

    @Has(['key', 'store'])
    Announcement = {
        message: sui.string,
    }

    @Write('User')
    @Assert('age > 10', ERROR_CODES.ERR_UNDERAGE)
    create_user(){}


    @Write('Announcement')
    @OnlyFor(MY_ADDRESS)
    create_announcement(){}

}

export default Asserti