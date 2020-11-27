

export const ignoreCapsAndAccentsRegex = (input:string) => {
    const lowerInput = input.toLowerCase()
    const regex = lowerInput.split('').map(char => {
        if(char === 'a') return '[aá]'
        if(char === 'e') return '[eé]'
        if(char === 'i') return '[ií]'
        if(char === 'o') return '[oó]'
        if(char === 'u') return '[uú]'
        return char
    }).join('')
    
    return new RegExp(regex, 'i')
}