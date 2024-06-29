describe('Reddit Subreddit Interaction', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should create a subreddit', () => {
        cy.visit('/subreddits/create');
        cy.get('input[name="name"]').type('TestSubreddit');
        cy.get('textarea[name="description"]').type('This is a test subreddit.');
        cy.get('button[type="submit"]').click();
        cy.contains('TestSubreddit').should('be.visible');
    });

    it('should subscribe to a subreddit', () => {
        cy.visit('/r/test');
        cy.get('.subscribe-button').click();
        cy.get('.subscribed').should('be.visible');
    });

    it('should unsubscribe from a subreddit', () => {
        cy.visit('/r/test');
        cy.get('.unsubscribe-button').click();
        cy.get('.subscribed').should('not.exist');
    });
});
