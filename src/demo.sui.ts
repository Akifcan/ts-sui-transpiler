import { Module, Write } from "./decorators";
import { Mut, sui } from "./types";
import { exec } from "./utils";

@Module('hello_world')
class Greeting {

    User = {
        name: sui.STRING,
        status: sui.bool,
        age: sui.SMALL
    }

    Admin = {
        status: sui.bool
    }

    Counter = {
        value: sui.large
    }

    @Write('User')
    create_user(){}

    @Write('Admin')
    create_admin(){}

    incrementCounter(counterItem: Mut<'Counter'>){
        exec`counterItem.value = counterItem.value + 1;`
    }

    multiplyCounter(counterItem: Mut<'Counter'>){
        exec`counterItem.value = counterItem.value * 2;`
    }
}

export default Greeting