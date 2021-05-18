describe('Beer List tests', function () {
    beforeEach(function () {
        cy.login();
      });
      it('mock beer get, should display beers in the list', function() {
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/beers',
            status: 200,
            response: 'fixture:beers.json' 
        });
        cy.visit('/beer/list');
        cy.get('[data-cy=beerCard]').should('have.length', 3);
    });
    it('mock beer get on error, should show error message', function() { 
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/beers',
            status: 400,
            response : 'ERROR'
        });
        cy.visit('/');
        cy.get('[data-cy=appError]').should('be.visible'); 
    });

      it('mock beer get filtering by name, should display the correct beer', () => {
        cy.server();
        cy.route({
          method: 'GET',
          url: '/api/beers',
          status: 200,
          response: 'fixture:beers.json'
        });

        cy.visit('/');
        cy.get('[data-cy=filterInput]').type('keystone ice');
        cy.get('[data-cy=beerCard]').should('have.length', 1);
        cy.get('[data-cy=beerTitle]').should('contain', 'Keystone');
      });

});