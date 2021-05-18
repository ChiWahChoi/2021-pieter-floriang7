describe('First tests', function() {
    beforeEach(function () {
        cy.login();
      });
    it('App runs', function() {
        cy.visit('/beer/list');
        cy.get('[data-cy=filterInput]').type('mad');
        cy.get('[data-cy=beerCard]').should('have.length', 13);
    });
});


//ADD REVIEW
describe('Tests add review form', function() {
    beforeEach(function () {
        cy.login();
      });
    it('invalid rating should display an error message', function() {
        cy.visit('/beer/list/detail/1');
        cy.get('[data-cy=ratingInput]').type('12');
        //cy.get('[data-cy=descriptionInput]').type('');
        cy.get('[data-cy=addReviewButton]').click();

        cy.get('[data-cy=ratingError]').should('be.visible')
    }); 
    it('valid rating & description, should create a new review', function() {
        cy.visit('/beer/list/detail/1');
        cy.get('[data-cy=ratingInput]').type('8');
        cy.get('[data-cy=descriptionInput]').type('this is a test description from cypress');
        cy.get('[data-cy=addReviewButton]').click();

        cy.contains('this is a test description from cypress').should('be.visible');
    });

});


//DELETE REVIEW
/*describe('Test delete review', function() {
    beforeEach(function () {
        cy.login();
      });
    it('clicking delete button, should delete review', function() {
        cy.visit('/beer/list/detail/1');
    });
});*/