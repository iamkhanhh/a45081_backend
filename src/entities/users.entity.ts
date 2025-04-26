import { UserRole, UserStatus } from '@/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Users extends AbstractEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: number;

  @Column()
  status: number;

  @Column()
  user_created: number;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column()
  institution: string;

  @Column()
  codeId: string;

  @Column({ type: 'timestamp', nullable: true })
  codeExpired: Date;

  static getUserStatus(status: UserStatus): string {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'Active';
      case UserStatus.DELETED:
        return 'Deleted';
      case UserStatus.DISABLED:
        return 'Disabled';
      case UserStatus.PENDING:
        return 'Pending';
      default:
        return 'N/A';
    }
  }

  static getUserRole(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'Admin';
      case UserRole.USER:
        return 'User';
      default:
        return 'N/A';
    }
  }

  static getUserStatusNumber(status: string): UserStatus {
    switch (status) {
      case 'Active':
      case 'active':
        return UserStatus.ACTIVE;
      case 'Deleted':
      case 'deleted':
        return UserStatus.DELETED;
      case 'Disabled':
      case 'disabled':
        return UserStatus.DISABLED;
      case 'Pending':
      case 'pending':
        return UserStatus.PENDING;
      default:
        return UserStatus.PENDING;
    }
  }

  static getUserRoleNumber(role: string): UserRole {
    switch (role) {
      case 'Admin':
      case 'admin':
        return UserRole.ADMIN;
      case 'User':
      case 'user':
        return UserRole.USER;
      default:
        return UserRole.USER;
    }
  }
}