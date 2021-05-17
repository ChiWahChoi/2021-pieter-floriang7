describe('First tests', function() {
    beforeEach(function () {
        cy.login();
      });
    it('App runs', function() {
        cy.visit('/');
        cy.get('[data-cy=filterInput]').type('mad');
        cy.get('[data-cy=beerCard]').should('have.length', 13);
    });
    it('mock beer get', function() {
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/beers',
            status: 200,
            response: 'fixtures:beers.json' 
        });
        cy.visit('/');
        cy.get('[data-cy=beerCard]').should('have.length', 3);
    });
    it('on error should show error message', function() { 
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
});


//FORM TESTING
describe('Testing add review form', function() {
    beforeEach(function () {
        cy.login();
      });
    it('valid data should create a new review', function() {
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/beers/2',
            status: 200,
            response : 'fixtures:mad-jack-mixer.json'
        });

        cy.visit('/beer/list/detail/2')
        cy.get('[data-cy=ratingInput]')
            .type('7')
            .should('have.value', '7')
        cy.get('[data-cy=descriptionInput]')
            .type('this is a description of a review for testing purposes')
            .should('have.value', 'this is a description of a review for testing purposes')

        cy.get('[data-cy=addReviewButton]').click()
    });
    it('invalid data should display an error message', function() {
        cy.visit('/beer/list/detail/2')
        cy.get('[data-cy=ratingInput]')
            .type('12')
            .should('have.value', '12')
        cy.get('[data-cy=descriptionInput]')
            .type('this is a description of a review for testing purposes')
            .should('have.value', 'this is a description of a review for testing purposes')

        cy.get('[data-cy=addReviewButton]').click()

        cy.get('[data-cy=ratingError]').should('be.visible')
    });
});