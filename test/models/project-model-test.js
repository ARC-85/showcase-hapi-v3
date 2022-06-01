import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPortfolios, testProjects, extensions, builds, farmhouse, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Project Model tests", () => {

  let extensionsList = null;

  setup(async () => {
    db.init("mongo");
    await db.portfolioStore.deleteAllPortfolios();
    await db.projectStore.deleteAllProjects();
    extensionsList = await db.portfolioStore.addPortfolio(extensions);
    for (let i = 0; i < testProjects.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testProjects[i] = await db.projectStore.addProject(extensionsList._id, testProjects[i]);
    }
  });

  test("create single project", async () => {
    const buildsList = await db.portfolioStore.addPortfolio(builds);
    const project = await db.projectStore.addProject(buildsList._id, farmhouse)
    assert.isNotNull(project._id);
    assertSubset (farmhouse, project);
  });

  test("create multiple projects", async () => {
    const projects = await db.portfolioStore.getPortfolioById(extensionsList._id);
    assert.equal(testProjects.length, testProjects.length)
  });

  test("delete all projects", async () => {
    const projects = await db.projectStore.getAllProjects();
    assert.equal(testProjects.length, projects.length);
    await db.projectStore.deleteAllProjects();
    const newProjects = await db.projectStore.getAllProjects();
    assert.equal(0, newProjects.length);
  });

  test("get a project - success", async () => {
    const buildsList = await db.portfolioStore.addPortfolio(builds);
    const project = await db.projectStore.addProject(buildsList._id, farmhouse)
    const newProject = await db.projectStore.getProjectById(project._id);
    assertSubset (farmhouse, newProject);
  });

  test("delete One Project - success", async () => {
    const id = testProjects[0]._id;
    await db.projectStore.deleteProject(id);
    const projects = await db.projectStore.getAllProjects();
    assert.equal(projects.length, testPortfolios.length - 1);
    const deletedProject = await db.projectStore.getProjectById(id);
    assert.isNull(deletedProject);
  });

  test("get a portfolio - bad params", async () => {
    assert.isNull(await db.projectStore.getProjectById(""));
    assert.isNull(await db.projectStore.getProjectById());
  });

  test("delete One User - fail", async () => {
    await db.projectStore.deleteProject("bad-id");
    const projects = await db.projectStore.getAllProjects();
    assert.equal(projects.length, testPortfolios.length);
  });
});
