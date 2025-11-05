import { Module, Write } from "./src/decorators";
import { Mut, sui } from "./src/types";
import { exec } from "./src/utils";

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

    multiply2Counter(counterItem: Mut<'Counter'>){
        exec`counterItem.value = counterItem.value * 4;`
    }
}

export default Greeting
