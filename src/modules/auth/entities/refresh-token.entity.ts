import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TokenType {
  WEB = 'web',
  MOBILE = 'mobile',
}

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'enum', enum: TokenType, default: TokenType.MOBILE })
  type: TokenType;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @Column()
  token: string;

  @Column()
  revoked: boolean;

  @Column()
  device_id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
