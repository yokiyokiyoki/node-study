const main = require("../main");
const should = require("should");
describle("./main.test", () => {
  it("should equal 55 when n===10", () => {
    main.fibonacci(10).should.equal(55);
  });
});
