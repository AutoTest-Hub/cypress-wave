describe('Reddit Search Functionality', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should search for posts', () => {
        cy.get('.header-search').type('Cypress{enter}');
        cy.url().should('include', 'search');
        cy.contains('Cypress').should('be.visible');
    });

    it('should search for subreddits', () => {
        cy.get('.header-search').type('test{enter}');
        cy.url().should('include', 'search');
        cy.contains('Communities and Users').click();
        cy.contains('r/test').should('be.visible');
    });

    it('should search for users', () => {
        cy.get('.header-search').type('testuser{enter}');
        cy.url().should('include', 'search');
        cy.contains('Communities and Users').click();
        cy.contains('u/testuser').should('be.visible');
    });
});
