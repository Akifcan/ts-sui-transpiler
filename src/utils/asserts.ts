import { parseAssertions } from "."

const suiToMist = (sui: number): string => {
    const mist = sui * 1_000_000_000
    return mist.toLocaleString('en-US').replace(/,/g, '_')
}

export const getVarsandValues = (reg: RegExp, cond: any) => {
    const numStr = cond.must.match(reg)?.[1]
    const num = suiToMist(parseInt(numStr))
    const variable = cond.code.split('.')[1]

    return {
        num,
        variable
    }
}

export const getAssertValues = (asserts: any) => {
    if (!asserts || !asserts.arguments) {
      return []
    }

    const parsedAssertions = asserts.arguments.flatMap((arg: string) =>
      parseAssertions(arg)
    )

    return parsedAssertions
}

export const handleAsserts = (asserts: any, constants: Record<string, string>, useArray?: boolean) => {
    const parsedAsserts = getAssertValues(asserts)
    const result = parsedAsserts.map((x: {must: string, code: string}) => {
        const { must, code } = x
        const variable = code.split('.')[1]
        if(must.startsWith('Assertion.min(')){
            const numReg = /Assertion\.min\([^,]+,\s*(\d+)\)/
            const num = must.match(numReg)!;

            const varReg = /Assertion\.min\(\s*'([^']+)'\s*,\s*(\d+)\s*\)/;
            const varName = must.match(varReg)!;
            return `assert!(string::length(&${varName[1]}) >= ${num[1]}, ${variable});`
        }
        if(must.startsWith('Assertion.max(')){
            const numReg = /Assertion\.max\([^,]+,\s*(\d+)\)/
            const num = must.match(numReg)!;

            const varReg = /Assertion\.max\(\s*'([^']+)'\s*,\s*(\d+)\s*\)/;
            const varName = must.match(varReg)!;
            return `assert!(string::length(&${varName[1]}) <= ${num[1]}, ${variable});`
        }
        if(must.startsWith('Assertion.onlyFor(')){
            const addrReg = /Assertion\.onlyFor\(([^)]+)\)/
            const addrMatch = must.match(addrReg)
            let address = addrMatch?.[1] || ''

            if (constants[address]) {
                address = constants[address]
            }

            address = address.replace(/['"]/g, '')

            return `assert!(tx_context::sender(ctx) == @${address}, ${variable});`
        }
        return `assert!(${must.replace(/'/g, "")}, ${variable});`
    })
    return !useArray ? result.join('\n') : result
}