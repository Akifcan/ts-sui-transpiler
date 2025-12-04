import { parseAssertions, ParsedAssertion } from "."

export interface MethodAssertion {
    methodName: string
    assertions: ParsedAssertion[]
}

export const handleAssert = (methods: any): MethodAssertion[] => {
    const asserts = methods.filter((x: any) => x.decorators.find((y: any) => y.name === 'Assert'))

    return asserts.map((assert: any) => {
        const decorator = assert.decorators.find((x: any) => x.name === 'Assert')
        const argumentString = decorator.arguments[0]
        const parsed = parseAssertions(argumentString)
        console.log(parsed)
    })
}