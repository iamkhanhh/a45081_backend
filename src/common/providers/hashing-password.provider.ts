import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingPasswordProvider {

    async hashPasswordHelper(plainPassword: string) {
        const saltOrRounds = 10;
        try {
            return await bcrypt.hash(plainPassword, saltOrRounds);
        } catch (error) {
            console.log(error);
        }
    }

    async comparePasswordHelper(plainPassword: string, hashPassword: string) {
        try {
            return await bcrypt.compare(plainPassword, hashPassword);
        } catch (error) {
            console.log(error);
        }
    }

}
