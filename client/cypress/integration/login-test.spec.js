describe('Login tests', function() {
    it('Valid login', function() {
        cy.visit('/login');
        cy.get('[data-cy=usernameInput]').type('admin@hogent.be');
        cy.get('[data-cy=passwordInput]').type('Admin123&');
        cy.get('[data-cy=loginButton]').click();

        cy.url()
      .should('be.equal', 'http://localhost:4200/beer/list');
    });

    it('Invalid login, wrong password', function() {
        cy.visit('/login');
        cy.get('[data-cy=usernameInput]').type('admin@hogent.be');
        cy.get('[data-cy=passwordInput]').type('admin123');
        cy.get('[data-cy=loginButton]').click();

        cy.get('[data-cy=loginError]').should('be.visible');
        cy.url()
      .should('be.equal', 'http://localhost:4200/login');

    });
});