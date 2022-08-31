/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

const movies = [
  {
    id: "tgbNymZ7vqY",
    name: "First Blood Part II",
    tags: ["#action"],
    sharedBy: "root@gmail.com",
    votedUp: 89,
    votedDown: 32,
  },
  {
    id: "8IEezGQwgZk",
    name: "Tom and Jerry",
    tags: ["#music"],
    sharedBy: "root@gmail.com",
    votedUp: 12,
    votedDown: 3,
  },
];

describe("test home page", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
  });

  it("home page", () => {
    cy.intercept("GET", "**/api/movie/", movies).as("loadMovie");
    cy.visit("http://localhost:3000/");
    cy.wait("@loadMovie");

    cy.get(".movieItem").should("have.length", 2);
    cy.get("h1").contains("Funny Movies!");
  });

  it("signup", () => {
    cy.intercept("POST", "**/api/user/signup", {
      status: 200,
      message: "Register success",
    }).as("registerUser");
    cy.visit("http://localhost:3000/register");

    cy.get("[type='email']").type("myemail@domain.com");
    cy.get("[type='password']").type("123456");
    cy.get("[type='button']").click();
    cy.wait("@registerUser");

    cy.contains("Your account is created success");
  });

  it("login", () => {
    cy.intercept("POST", "**/api/user/auth", {
      token: "aADBhqToYwLPRIcItGeARDeXdGuYGuBH",
    }).as("authUser");
    cy.intercept("GET", "**/api/movie/", movies).as("loadMovie");
    cy.visit("http://localhost:3000/login");

    cy.get("[type='email']").type("myemail@domain.com");
    cy.get("[type='password']").type("123456");
    cy.get("[type='button']").click();
    cy.wait("@authUser");
    cy.wait("@loadMovie");

    // check vote button
    cy.get(".votedAction").first().find("svg").should("have.length", 2);
  });

  it("should be able to vote up and vote down", () => {
    // check vote up button
    cy.get(".votedInfo").first().find("span").first().contains("89");
    cy.get(".votedAction").first().find("svg").first().click();
    cy.get(".votedInfo").first().find("span").first().contains("90");

    // check vote down button
    cy.get(".votedInfo").last().find("span").last().contains("3");
    cy.get(".votedAction").last().find("svg").last().click();
    cy.get(".votedInfo").last().find("span").last().contains("4");
  });

  it("should be able to share movie", () => {
    cy.intercept("POST", "**/api/movie/share", {
      id: "11111",
      sharedBy: "myemail@domain.com",
      name: "New name",
      tags: ["#action"],
      votedUp: 0,
      votedDown: 0,
    }).as("shareMovie");
    // check vote up button
    cy.get("button").contains("Share a movie").should("exist").click();
    cy.get("[type='text']").type("https://www.youtube.com/watch?v=11111");
    cy.get("[type='button']").click();
    cy.wait("@shareMovie");

    cy.get(".movieItem").should("have.length", 3);
    cy.get(".movieItem").last().should('contain', 'New name');
  });

  it("should be able to logout", () => {
    cy.get("button").contains("Logout").should("exist").click();
    // check vote action is disappear
    cy.get(".votedAction").first().find("svg").should("have.length", 0);
  });
});
