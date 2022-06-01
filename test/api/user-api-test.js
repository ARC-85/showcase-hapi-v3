import { assert } from "chai";
import { showcaseService } from "./showcase-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers, maggieCredentials } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    showcaseService.clearAuth();
    await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await showcaseService.createUser(testUsers[i]);
    }
    await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await showcaseService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await showcaseService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await showcaseService.deleteAllUsers();
    await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    returnedUsers = await showcaseService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await showcaseService.getUser(testUsers[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await showcaseService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await showcaseService.deleteAllUsers();
    await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    try {
      const returnedUser = await showcaseService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});