export const handleExecMethods = (methods: any) => {
    return methods.map((x: any) => {
        const functionBody = x.body.match(/\{\s*exec`([^`]+)`\s*\}/)
        const params = x.parameters.map((y: any) => {
            let type = ''
            if(y.type.startsWith('Mut')){
                type = `&mut ${y.type.match(/<(?:")?([^">]+)(?:")?>/)[1]}`
            }else {
                type = y.type.match(/<(?:")?([^">]+)(?:")?>/)[1]
            }
            return `${y.name}: ${type}`
        }).join(',')

        // Split statements by semicolon and join with newlines
        const bodyContent = functionBody[1]
            .split(';')
            .map((stmt: string) => stmt.trim())
            .filter((stmt: string) => stmt.length > 0)
            .map((stmt: string) => `    ${stmt};`)
            .join('\n')

        return `public fun ${x.name}(${params}) {\n${bodyContent}\n  }`
    }).join('\n')
}