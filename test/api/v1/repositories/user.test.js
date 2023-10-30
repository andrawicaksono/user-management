const { dbTest } = require("../../../dbTest");

const { User } = require("../../../../src/api/v1/models");
const { UserRepository } = require('../../../../src/api/v1/repositories/user');
const { default: mongoose } = require("mongoose");

let userRepository;

beforeAll(async () => {
  await dbTest.setUp();
  userRepository = UserRepository(User);
});

afterEach(async () => {
  await dbTest.dropCollections();
});

afterAll(async () => {
  await dbTest.dropDatabase();
});


describe('UserRepository', () => {
  it('should create a user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
    };

    const [user, errUser] = await userRepository.create(userData);

    expect(user).toBeDefined();
    expect(errUser).toBeNull();
  });
  
  it('should handle create user error', async () => {
    const userData = {
      email: 'test@example.com',
    };

    const [user, errUser] = await userRepository.create(userData);

    expect(user).toBeNull();
    expect(errUser).not.toBeNull();
  });

  it('should find a user by email', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
    };
    await userRepository.create(userData);

    const [foundUser, errFoundUser] = await userRepository.findUserByEmail('test@example.com');

    expect(foundUser).toBeDefined();
    expect(errFoundUser).toBeNull();
  });

  it('should handle user not found by email', async () => {
    const [foundUser, errFoundUser] = await userRepository.findUserByEmail('nonexistent@example.com');

    expect(foundUser).toBeNull();
    expect(errFoundUser).toBeNull();
  });

  it('should find a user by ID', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
    };
    const [createdUser] = await userRepository.create(userData);

    const [foundUser, errFoundUser] = await userRepository.findUserById(createdUser._id);

    expect(foundUser).toBeDefined();
    expect(errFoundUser).toBeNull();
  });

  it('should handle user not found by ID', async () => {
    const [foundUser, errFoundUser] = await userRepository.findUserById(new mongoose.Types.ObjectId());

    expect(foundUser).toBeNull();
    expect(errFoundUser).toBeNull();
  });

  it('should find all users', async () => {
    const userData1 = {
      email: 'user1@example.com',
      password: 'password1',
      first_name: 'User1',
      last_name: 'Last1',
    };

    const userData2 = {
      email: 'user2@example.com',
      password: 'password2',
      first_name: 'User2',
      last_name: 'Last2',
    };

    await userRepository.create(userData1);
    await userRepository.create(userData2);
    
    const [users, errUsers] = await userRepository.findAllUsers();

    expect(users).toHaveLength(2);
    expect(errUsers).toBeNull();
  });

  it('should find users by filter', async () => {
    const userData1 = {
      email: 'user1@example.com',
      password: 'password1',
      first_name: 'User1',
      last_name: 'Last1',
      gender: 'male',
    };

    const userData2 = {
      email: 'user2@example.com',
      password: 'password2',
      first_name: 'User2',
      last_name: 'Last2',
      gender: 'female',
    };

    const userData3 = {
      email: 'user3@example.com',
      password: 'password3',
      first_name: 'User3',
      last_name: 'Last3',
      gender: 'male',
    };

    await userRepository.create(userData1);
    await userRepository.create(userData2);
    await userRepository.create(userData3);

    // Find male users
    const filter = {
      gender: 'male',
    };

    const [result, errResult] = await userRepository.findUsersByFilter(filter);

    expect(result.total_rows).toEqual(2);
    expect(result.users).toHaveLength(2);
    expect(errResult).toBeNull();
  });

  it('should update a user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
    };
    const [createdUser] = await userRepository.create(userData);

    createdUser.first_name = 'UpdatedFirstName';

    const [updatedUser, errUpdatedUser] = await userRepository.update(createdUser);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.first_name).toEqual('UpdatedFirstName');
    expect(errUpdatedUser).toBeNull();
  });

  it('should delete a user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
    };
    const [createdUser] = await userRepository.create(userData);

    const [deletedUser, errDeletedUser] = await userRepository.delete(createdUser);

    expect(deletedUser).toBeDefined();
    expect(deletedUser.deleted_at).not.toBeNull();
    expect(errDeletedUser).toBeNull();
  });
});
