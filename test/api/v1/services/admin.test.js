const { AdminService } = require("../../../../src/api/v1/services/admin");

const UserRepository = {
  findUserByEmail: jest.fn(),
  create: jest.fn(),
};

beforeEach(() => {
  UserRepository.findUserByEmail.mockReset();
  UserRepository.create.mockReset();
});

const adminService = AdminService(UserRepository);

describe("AdminService - createAdmin", () => {
  const secret = process.env.ADMIN_SECRET;

  const adminData = {
    email: "admin@example.com",
    password: "password123",
    first_name: "Admin",
    last_name: "User",
  };


  it("should create an admin when valid secret is provided", async () => {
    UserRepository.findUserByEmail.mockResolvedValue([null, null]);
    UserRepository.create.mockResolvedValue([{ ...adminData, role: "admin" }, null]);

    const [admin, err] = await adminService.createAdmin({...adminData, secret});

    expect(UserRepository.findUserByEmail).toHaveBeenCalledWith(adminData.email);
    expect(UserRepository.create).toHaveBeenCalledWith(expect.objectContaining({ ...adminData, role: "admin", password: expect.any(String) }));
    expect(admin).toBeTruthy();
    expect(err).toBeNull();
  });

  it("should return ERROR.ACCESS_DENIED when an invalid secret is provided", async () => {
    const invalidSecretData = { ...adminData, secret: "invalid-secret" };
    const [admin, err] = await adminService.createAdmin(invalidSecretData);

    expect(UserRepository.findUserByEmail).not.toHaveBeenCalled();
    expect(UserRepository.create).not.toHaveBeenCalled();
    expect(admin).toBeNull();
    expect(err).toEqual(Error("error;400;004;access denied!"));
  });

  it("should return ERROR.EMAIL_REGISTERED when the email is already registered", async () => {
    UserRepository.findUserByEmail.mockResolvedValue([{ ...adminData, role: "admin" }, null]);

    const [admin, err] = await adminService.createAdmin(adminData);

    expect(UserRepository.findUserByEmail).toHaveBeenCalledWith(adminData.email);
    expect(UserRepository.create).not.toHaveBeenCalled();
    expect(admin).toBeNull();
    expect(err).toEqual(Error("error;400;001;email has already registered!"));
  });
});
