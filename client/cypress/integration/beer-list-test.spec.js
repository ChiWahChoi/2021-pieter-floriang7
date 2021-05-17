describe('Beer List tests', function () {
    beforeEach(function () {
        cy.login();
      });
      it('delayed response brings state out of sync', () => {
        cy.server();
        cy.route({
          method: 'GET',
          url: '/api/beers',
          status: 200,
          response: 'fixture:beers.json'
        });
        cy.route({
          delay: 2000,
          method: 'GET',
          url: '/api/beers/?name=mad%20jack%20mixer',
          status: 200,
          response: 'fixture:mad-jack-mixer.json'
        }).as('getSPrecipes');
        cy.route({
          method: 'GET',
          url: '/api/beers/?name=keystone%20ice',
          status: 200,
          response: 'fixture:keystone-ice.json'
        }).as('getKEYSTONEICEbeer');

        cy.visit('/');
        cy.get('[data-cy=filterInput]').type('mad jack mixer');
        cy.wait(300);
        cy.get('[data-cy=filterInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}keystone ice');
        cy.wait(['@getKEYSTONEICEbeer', '@getKEYSTONEICEbeer']);
        cy.get('[data-cy=beerCard]').should('have.length', 1);
        cy.get('[data-cy=beer-title]').should('contain', 'Keystone');

      });
});