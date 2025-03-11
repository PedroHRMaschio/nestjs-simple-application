/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Pedro",
            "email": "pedro@email.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Maria",
            "email": "maria@email.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "João",
            "email": "joao@email.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Ana",
            "email": "ana@email.com",
            "role": "INTERN"
        },
        {
            "id": 5,
            "name": "José",
            "email": "jose@email.com",
            "role": "ADMIN"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: string) {
        const user = this.users.find(user => user.id === parseInt(id));

        return user;
    }

    create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const newUser = { id: this.users.length + 1, ...user };

        this.users.push(newUser);

        return newUser;
    }

    update(id: number, updateUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUser };
            }
            return user;
        });

        return this.findOne(id.toString());
    }

    remove(id: number) {
        const user = this.findOne(id.toString());
        this.users = this.users.filter(user => user.id !== id);

        return user;
    }
}
