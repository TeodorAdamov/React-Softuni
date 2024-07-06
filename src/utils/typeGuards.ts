import { User } from "firebase/auth"

function isUserDefined(user: User | null): user is NonNullable<typeof user> {
    return user !== null && user !== undefined;
}

export {
    isUserDefined
}