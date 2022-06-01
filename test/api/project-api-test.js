import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { showcaseService } from "./showcase-service.js";
import { maggie, maggieCredentials, builds, testPortfolios, testProjects, farmhouse } from "../fixtures.js";

suite("Project API tests", () => {
  let user = null;
  let budgetBuilds = null;

  setup(async () => {
    showcaseService.clearAuth();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllPortfolios();
    await showcaseService.deleteAllProjects();
    await showcaseService.deleteAllUsers();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    builds.userid = user._id;
    budgetBuilds = await showcaseService.createPortfolio(builds);
  });

  teardown(async () => {});

  test("create project", async () => {
    const returnedProject = await showcaseService.createProject(budgetBuilds._id, farmhouse);
    assertSubset(farmhouse, returnedProject);
  });

  test("create Multiple projects", async () => {
    for (let i = 0; i < testProjects.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createProject(budgetBuilds._id, testProjects[i]);
    }
    const returnedProjects = await showcaseService.getAllProjects();
    assert.equal(returnedProjects.length, testProjects.length);
    for (let i = 0; i < returnedProjects.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const project = await showcaseService.getProject(returnedProjects[i]._id);
      assertSubset(project, returnedProjects[i]);
    }
  });

  test("Delete ProjectApi", async () => {
    for (let i = 0; i < testProjects.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createProject(budgetBuilds._id, testProjects[i]);
    }
    let returnedProjects = await showcaseService.getAllProjects();
    assert.equal(returnedProjects.length, testProjects.length);
    for (let i = 0; i < returnedProjects.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const project = await showcaseService.deleteProject(returnedProjects[i]._id);
    }
    returnedProjects = await showcaseService.getAllProjects();
    assert.equal(returnedProjects.length, 0);
  });

  test("denormalised portfolio", async () => {
    for (let i = 0; i < testProjects.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createProject(budgetBuilds._id, testProjects[i]);
    }
    const returnedPortfolio = await showcaseService.getPortfolio(budgetBuilds._id);
    assert.equal(returnedPortfolio.projects.length, testProjects.length);
    for (let i = 0; i < testProjects.length; i += 1) {
      assertSubset(testProjects[i], returnedPortfolio.projects[i]);
    }
  });
});