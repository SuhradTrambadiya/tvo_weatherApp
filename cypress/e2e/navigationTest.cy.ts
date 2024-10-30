describe("Navbar Component", () => {
  
  beforeEach(() => {
    cy.visit("http://localhost:3000"); 
  });

  it("renders the navbar with correct elements", () => {
    cy.get("nav").should("exist");
    cy.contains("Suhrad - WeatherApi").should("exist");
  });

  it("toggles dark mode", () => {
    cy.get('[aria-label="Switch to dark mode"]').click();
    cy.get("nav").should("have.class", "bg-gray-800");

    cy.get('[aria-label="Switch to light mode"]').click();
    cy.get("nav").should("have.class", "bg-white");
  });

  it("opens and closes the settings dropdown", () => {
    // Open dropdown
    cy.get('[aria-label="Settings"]').click();
    cy.get('[role="menu"]').should("be.visible");

    // Close dropdown by clicking outside
    cy.get("body").click(0, 0); // Click on the corner of the screen to close dropdown
    cy.get('[role="menu"]').should("not.exist");
  });

  it("selects Celsius and Fahrenheit from dropdown", () => {
    // Open dropdown
    cy.get('[aria-label="Settings"]').click();
    cy.get('[role="menu"]').should("be.visible");

    // Select Celsius
    cy.contains("Celsius").click();
    cy.get('[role="menu"]').should("not.exist"); // Dropdown closes after selection

    // Open dropdown again
    cy.get('[aria-label="Settings"]').click();
    cy.get('[role="menu"]').should("be.visible");

    // Select Fahrenheit
    cy.contains("Fahrenheit").click();
    cy.get('[role="menu"]').should("not.exist");
  });
});
