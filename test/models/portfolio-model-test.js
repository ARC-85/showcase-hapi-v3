import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPortfolios, builds } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Portfolio Model tests", () => {

setup(async () => {
    db.init("mongo");
    await db.portfolioStore.deleteAllPortfolios();
    for (let i = 0; i < testPortfolios.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPortfolios[i] = await db.portfolioStore.addPortfolio(testPortfolios[i]);
    }
  });

  test("create a portfolio", async () => {
    const portfolio = await db.portfolioStore.addPortfolio(builds);
    assertSubset(builds, portfolio);
    assert.isDefined(portfolio._id);
  });

  test("delete all portfolios", async () => {
    let returnedPortfolios = await db.portfolioStore.getAllPortfolios();
    assert.equal(returnedPortfolios.length, 3);
    await db.portfolioStore.deleteAllPortfolios();
    returnedPortfolios = await db.portfolioStore.getAllPortfolios();
    assert.equal(returnedPortfolios.length, 0);
  });

  test("get a portfolio - success", async () => {
    const portfolio = await db.portfolioStore.addPortfolio(builds);
    const returnedPortfolio = await db.portfolioStore.getPortfolioById(portfolio._id);
    assertSubset(builds, portfolio);
  });

  test("delete One Portfolio - success", async () => {
    const id = testPortfolios[0]._id;
    await db.portfolioStore.deletePortfolioById(id);
    const returnedPortfolios = await db.portfolioStore.getAllPortfolios();
    assert.equal(returnedPortfolios.length, testPortfolios.length - 1);
    const deletedPortfolio = await db.portfolioStore.getPortfolioById(id);
    assert.isNull(deletedPortfolio);
  });

  test("get a portfolio - bad params", async () => {
    assert.isNull(await db.portfolioStore.getPortfolioById(""));
    assert.isNull(await db.portfolioStore.getPortfolioById());
  });

  test("delete One Portfolio - fail", async () => {
    await db.portfolioStore.deletePortfolioById("bad-id");
    const allPortfolios = await db.portfolioStore.getAllPortfolios();
    assert.equal(testPortfolios.length, allPortfolios.length);
  });
});