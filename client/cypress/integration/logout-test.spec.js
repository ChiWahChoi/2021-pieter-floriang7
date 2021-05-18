describe('Logout test', function() {
    beforeEach(function () {
        cy.login();
      });

    it('Log out', function() {
        cy.visit('/beer/list')
        cy.get('[data-cy=logoutButton]').click();

        cy.get('[data-cy=loginTitle]').should(l => expect(l).to.contain('Login'));   
        cy.url().should('be.equal', 'http://localhost:4200/login');

    });
});