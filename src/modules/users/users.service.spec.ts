import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
// import { use } from 'passport';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Partial<Repository<User>>>;

  const users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Marta', email: 'marta@example.com' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(users[0]),
            find: jest.fn().mockResolvedValue(users),
            save: jest.fn().mockImplementation((user: User) =>
              Promise.resolve({
                id: 3,
                ...user,
              }),
            ),
            create: jest.fn().mockImplementation((user: User) => user),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users.length).toBe(2);
    expect(users).toEqual(users);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should return one user by ID', async () => {
    const user = await service.findOne({ id: 1 });
    expect(user).toEqual(users[0]);
    expect(repo.findOne).toHaveBeenCalled();
  });

  it('should create a new user', async () => {
    const userData = {
      name: 'Rob',
      email: 'rob@example.com',
      password: '123456',
    };
    const user = await service.create(userData);
    expect(repo.save).toHaveBeenCalledWith(userData);
    expect(repo.create).toHaveBeenCalledWith(userData);
    expect(user).toEqual({ id: 3, ...userData });
  });
});
