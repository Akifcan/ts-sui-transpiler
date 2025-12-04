import { parseAssertions } from "."

export const handleAssert = (methods: any) => {
    const asserts = methods.filter((x: any) => x.decorators.find((y: any) => y.name === 'Assert'))
    asserts.map((assert: any) => {
        const decorator = assert.decorators.find((x: any) => x.name === 'Assert')
        const argumentString = decorator.arguments[0]
        const parsed = parseAssertions(argumentString)
        console.log(parsed)
    })
}