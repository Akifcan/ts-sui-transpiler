import { Has, Mint, Module, Write } from "./decorators";
import { Mut, sui } from "./types";
import { exec } from "./utils";

@Module('hello_world')
class Greeting {

    @Has(['key', 'store'])
    User = {
        name: sui.STRING,
        status: sui.bool,
        age: sui.SMALL
    }

    @Has(['key', 'store'])
    Admin = {
        status: sui.bool
    }

    @Has(['key', 'store'])
    Counter = {
        value: sui.large
    }

    @Has(['store', 'drop', 'copy'])
    Task = {
        topic: sui.STRING,
        description: sui.large
    }

    @Has(['key', 'store'])
    Hero = {
        name: sui.STRING,
        description: sui.STRING,
        image_url: sui.STRING
    }

    @Write('User')
    create_user(){}

    @Write('Admin')
    create_admin(){}

    @Mint('Admin')
    mint_hero(){}

    incrementCounter(counterItem: Mut<'Counter'>){
        exec`counterItem.value = counterItem.value + 1;`
    }

    multiplyCounter(counterItem: Mut<'Counter'>){
        exec`counterItem.value = counterItem.value * 2;`
    }
}

export default Greeting