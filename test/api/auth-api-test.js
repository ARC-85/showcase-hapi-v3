import { assert } from "chai";
import { showcaseService } from "./showcase-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    showcaseService.clearAuth();
    await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await showcaseService.createUser(maggie);
    const response = await showcaseService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await showcaseService.createUser(maggie);
    const response = await showcaseService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    showcaseService.clearAuth();
    try {
      await showcaseService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});