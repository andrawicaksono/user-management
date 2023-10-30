const { User } = require("../../src/api/v1/models");
const { dbTest } = require("../dbTest");

beforeAll(async () => {
    await dbTest.setUp();
});

afterEach(async () => {
    await dbTest.dropCollections();
});

afterAll(async () => {
    await dbTest.dropDatabase();
});

describe('User Model', () => {
    it('should save a user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'somepassword',
        first_name: 'John',
        last_name: 'Doe',
      };

      const user = new User(userData);
      const savedUser = await user.save();
  
      expect(savedUser._id).toBeDefined();
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.password).toBe(userData.password);
      expect(savedUser.first_name).toBe(userData.first_name);
      expect(savedUser.last_name).toBe(userData.last_name);
    });
  
    it('should not save a user without required fields', async () => {
      const user = new User({});
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
    });
  
    it('should retrieve a user by email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'somepassword',
        first_name: 'John',
        last_name: 'Doe',
      };

      const user = new User(userData);
      await user.save();
  
      const retrievedUser = await User.findOne({ email: userData.email });
  
      expect(retrievedUser).toBeDefined();
      expect(retrievedUser.email).toBe(userData.email);
      expect(retrievedUser.password).toBe(userData.password);
    });
});