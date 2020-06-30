export enum StudentPrograms {
    SI = "SI",
    CC = "CC",
    ES = "ES",
}

export function fromString(programString: String): StudentPrograms | undefined {
    switch (programString) {
        case "SI": return StudentPrograms.SI
        case "CC": return StudentPrograms.CC
        case "ES": return StudentPrograms.ES
        default: return undefined
    }

}