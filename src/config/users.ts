interface UsersProps{
    id: number
    username: string
    email: string
    password: string
    role:  "USER" | "ADMIN"
}

export const validUsers: UsersProps[] = [
    {
        id: 1,
        username: 'teste',
        email: 'teste@teste.com',
        password: 'teste1234',
        role: 'USER'
    },
    {
        id: 2,
        username: 'admin',
        email: 'admin@bardatia.com',
        password: 'admin',
        role: 'ADMIN'
    }
]