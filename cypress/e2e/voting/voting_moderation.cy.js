describe('Reddit Voting and Moderation', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should upvote a post', () => {
        cy.visit('/r/test');
        cy.contains('My Test Post').click();
        cy.get('.upvote-button').click();
        cy.get('.vote-count').should('contain', '1');
    });

    it('should downvote a post', () => {
        cy.visit('/r/test');
        cy.contains('My Test Post').click();
        cy.get('.downvote-button').click();
        cy.get('.vote-count').should('contain', '-1');
    });

    it('should report a post', () => {
        cy.visit('/r/test');
        cy.contains('My Test Post').click();
        cy.get('.report-button').click();
        cy.get('.report-confirmation').should('be.visible');
    });
});
