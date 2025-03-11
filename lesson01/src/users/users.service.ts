/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

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
            const rolesArray = this.users.filter(user => user.role === role);
            if (rolesArray.length === 0) {
                throw new NotFoundException(`User with role ${role} not found`);
            }
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    create(user: CreateUserDto) {
        const newUser = { id: this.users.length + 1, ...user };

        this.users.push(newUser);

        return newUser;
    }

    update(id: number, updateUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUser };
            }
            return user;
        });

        return this.findOne(id);
    }

    remove(id: number) {
        const user = this.findOne(id);

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        this.users = this.users.filter(user => user.id !== id);

        return user;
    }
}
