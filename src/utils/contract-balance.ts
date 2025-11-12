import { parseStringArray } from ".";
import { BalanceFor } from "../types";

export const handleContractBalance = (properties: any,) => {
    const balances = properties.filter((x: any) =>
      x.decorators.find((y: any) => y.name === "Balance")
    );

    const BALANCE_METHODS = balances.map((method: any) => {
        const functions = parseStringArray(method.defaultValue)
        const variableName = method.name
        const balanceVariable = `${variableName}Balance` 

        let depositFn = ''
        let getBalanceFn  = ''
        let widthDrawFn = ''

        if(functions.find((x) => x === 'deposit')){
            depositFn = `public fun deposit(balance_obj: &mut ${balanceVariable}, mut coins: Coin<SUI>) {
                let incoming = coin::into_balance(&mut coins);
                balance::join(&mut balance_obj.total, incoming);
            }`
        }

        // if(functions.find((x) => x === 'withdraw')){
        //     console.log("withdraw")
        // }

        // if(functions.find((x) => x === 'get_balance')){
        //     console.log("get_balance")
        // }

        return `
            \n
            public struct ${balanceVariable} has key, store {
               id: object::UID,
               total: balance::Balance<SUI>,
               owner: address,
            }
            \n
            public fun init(ctx: &mut TxContext) {
                let sender = tx_context::sender(ctx);
                let obj = ${balanceVariable} {
                    id: object::new(ctx),
                    total: balance::zero<SUI>(),
                    owner: sender,
                };
                transfer::transfer(obj, sender);
            }

            ${depositFn}
        `
    }).join('')

    return BALANCE_METHODS
};
  