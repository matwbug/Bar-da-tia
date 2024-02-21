interface UsersProps{
    username: string
    password: string
    role:  "USER" | "ADMIN"
}

export const validUsers: UsersProps[] = [
    {
        username: 'teste',
        password: 'teste1234',
        role: 'USER'
    },
    {
        username: 'admin',
        password: 'admin',
        role: 'ADMIN'
    }
]