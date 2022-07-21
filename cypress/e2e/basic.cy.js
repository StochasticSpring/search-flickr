describe("sample test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the resources text", () => {
    cy.get("h1").contains("Search the Flickr public feed!");
  });
  it("displays the authorship text", () => {
    cy.get("footer").contains("Made by Eugene Lai");
  });
});
