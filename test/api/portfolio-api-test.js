import { assert } from "chai";
import { showcaseService } from "./showcase-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, maggieCredentials, builds, testPortfolios } from "../fixtures.js";

suite("Portfolio API tests", () => {

  let user = null;

  setup(async () => {
    showcaseService.clearAuth();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllPortfolios();
    await showcaseService.deleteAllUsers();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    builds.userid = user._id;
  });

  teardown(async () => {});

  test("create portfolio", async () => {
    const returnedPortfolio = await showcaseService.createPortfolio(builds);
    assert.isNotNull(returnedPortfolio);
    assertSubset(builds, returnedPortfolio);
  });

  test("delete a portfolio", async () => {
    const portfolio = await showcaseService.createPortfolio(builds);
    const response = await showcaseService.deletePortfolio(portfolio._id);
    assert.equal(response.status, 204);
    try {
      const returnedPortfolio = await showcaseService.getPortfolio(portfolio.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Portfolio with this id", "Incorrect Response Message");
    }
  });

  test("create multiple portfolios", async () => {
    for (let i = 0; i < testPortfolios.length; i += 1) {
      testPortfolios[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createPortfolio(testPortfolios[i]);
    }
    let returnedLists = await showcaseService.getAllPortfolios();
    assert.equal(returnedLists.length, testPortfolios.length);
    await showcaseService.deleteAllPortfolios();
    returnedLists = await showcaseService.getAllPortfolios();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant portfolio", async () => {
    try {
      const response = await showcaseService.deletePortfolio("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Portfolio with this id", "Incorrect Response Message");
    }
  });
});