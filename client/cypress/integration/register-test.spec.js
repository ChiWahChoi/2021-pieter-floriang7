describe('Register tests', function() {
    it('Invalid registration, username already exists', function() {
        cy.visit('/register');
        cy.get('[data-cy=firstnameInput]').type('Dirk');
        cy.get('[data-cy=lastnameInput]').type('De Bakker');
        cy.get('[data-cy=emailInput]').type('dirk@hogent.be');
        cy.get('[data-cy=passwordInput]').type('Dirkie123&');
        cy.get('[data-cy=passwordConfirmInput]').type('Dirkie123&');
        cy.get('[data-cy=registerButton]').click();

        cy.get('[data-cy=emailError]').should('be.visible');
        cy.get('[data-cy=appError]').should('be.visible');
        cy.url()
        .should('be.equal', 'http://localhost:4200/register');
    });

    it('Invalid registration, passwords do not match', function() {
        cy.visit('/register');
        cy.get('[data-cy=firstnameInput]').type('Tom');
        cy.get('[data-cy=lastnameInput]').type('Snelder');
        cy.get('[data-cy=emailInput]').type('tom@hogent.be');
        cy.get('[data-cy=passwordInput]').type('Tomie123&');
        cy.get('[data-cy=passwordConfirmInput]').type('tomie123&');
        cy.get('[data-cy=registerButton]').click();

        cy.get('[data-cy=passwordGroupErrors]').should('be.visible');
        cy.url()
        .should('be.equal', 'http://localhost:4200/register');
    });
});