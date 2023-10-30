const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthService } = require("../../../../src/api/v1/services/auth");

const UserRepository = {
  findUserByEmail: jest.fn(),
  create: jest.fn(),
};

const jwtSecret = "secret";

const authService = AuthService(UserRepository);

describe("AuthService", () => {
  describe("register", () => {
    it("should register a user successfully", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        first_name: "John",
        last_name: "Doe",
      };

      UserRepository.findUserByEmail.mockResolvedValue([null, null]);
      UserRepository.create.mockResolvedValue([userData, null]);

      const [user, errUser] = await authService.register(userData);

      expect(user).toEqual(userData);
      expect(errUser).toBeNull();
    });

    it("should handle registration when email is already registered", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        first_name: "John",
        last_name: "Doe",
      };

      UserRepository.findUserByEmail.mockResolvedValue([userData, null]);

      const [user, errUser] = await authService.register(userData);

      expect(user).toBeNull();
      expect(errUser).toEqual(Error("error;400;email has already registered!"));
    });

    it("should handle registration error", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        first_name: "John",
        last_name: "Doe",
      };

      UserRepository.findUserByEmail.mockRejectedValue(new Error("Database error"));

      const [user, errUser] = await authService.register(userData);

      expect(user).toBeNull();
      expect(errUser).toEqual(new Error("Database error"));
    });
  });

  describe("login", () => {
    it("should log in a user with correct credentials", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
      };

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = {
        _id: "user_id",
        email: userData.email,
        password: hashedPassword,
      };

      const tokenPayload = { id: user._id };
      const expectedToken = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "30m" });

      UserRepository.findUserByEmail.mockResolvedValue([user, null]);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jest.spyOn(jwt, "sign").mockReturnValue(expectedToken);

      const [result, errResult] = await authService.login(userData);

      expect(result).toEqual({ user, token: expectedToken });
      expect(errResult).toBeNull();
    });

    it("should handle login with incorrect password", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
      };

      const hashedPassword = await bcrypt.hash("wrongPassword", 10);

      const user = {
        _id: "user_id",
        email: userData.email,
        password: hashedPassword,
      };

      UserRepository.findUserByEmail.mockResolvedValue([user, null]);
      bcrypt.compare.mockResolvedValue(false);

      const [result, errResult] = await authService.login(userData);

      expect(result).toBeNull();
      expect(errResult).toEqual(Error("error;400;wrong password!"));
    });

    it("should handle login when the user does not exist", async () => {
      const userData = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      UserRepository.findUserByEmail.mockResolvedValue([null, null]);

      const [result, errResult] = await authService.login(userData);

      expect(result).toBeNull();
      expect(errResult).toEqual(Error("error;404;user not found!"));
    });

    it("should handle login error", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
      };

      UserRepository.findUserByEmail.mockRejectedValue(new Error("Database error"));

      const [result, errResult] = await authService.login(userData);

      expect(result).toBeNull();
      expect(errResult).toEqual(new Error("Database error"));
    });
  });
});
