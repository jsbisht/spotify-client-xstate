const { Machine } = require("xstate");
const { createModel } = require("@xstate/test");

describe("music app", () => {
  const musicMachine = Machine({
    id: "home",
    initial: "home",
    states: {
      home: {
        meta: {
          type: "final",
          test: async (page) => {
            await page.waitFor('[data-testid="home-page"]');
          },
        },
      },
    },
  });

  const testModel = createModel(musicMachine, {});

  const testPlans = testModel.getSimplePathPlans();

  testPlans.forEach((plan, i) => {
    describe(plan.description, () => {
      plan.paths.forEach((path, i) => {
        it(
          path.description,
          async () => {
            await page.goto("http://localhost:3000");
            await path.test(page);
          },
          10000
        );
      });
    });
  });

  it("coverage", () => {
    testModel.testCoverage();
  });
});
