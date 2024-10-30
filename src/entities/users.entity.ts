import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 0,
  USER = 1,
}

export enum UserStatus {
  ACTIVE = 0,
  DELETED = 1,
  DISABLED = 2,
  PENDING = 3,
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

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
  codeId: string;

  @Column({ type: 'timestamp', nullable: true })
  codeExpired: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

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
        return 'Unknown';
    }
  }

  static getUserRole(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'Admin';
      case UserRole.USER:
        return 'User';
      default:
        return 'Unknown';
    }
  }

  static getUserStatusNumber(status: string): UserStatus {
    switch (status) {
      case 'Active':
        return UserStatus.ACTIVE;
      case 'Deleted':
        return UserStatus.DELETED;
      case 'Disabled':
        return UserStatus.DISABLED;
      case 'Pending':
        return UserStatus.PENDING;
      default:
        return UserStatus.PENDING;
    }
  }

  static getUserRoleNumber(role: string): UserRole {
    switch (role) {
      case 'Admin':
        return UserRole.ADMIN;
      case 'User':
        return UserRole.USER;
      default:
        return UserRole.USER;
    }
  }
}