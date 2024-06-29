describe('Reddit Messaging', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should send a private message', () => {
        cy.visit('/message/compose');
        cy.get('#to').type('otheruser');
        cy.get('#subject').type('Test Message');
        cy.get('#message').type('This is a test message.');
        cy.get('.send-button').click();
        cy.contains('Your message has been sent').should('be.visible');
    });

    it('should read a private message', () => {
        cy.visit('/message/inbox');
        cy.contains('Test Message').click();
        cy.contains('This is a test message.').should('be.visible');
    });

    it('should delete a private message', () => {
        cy.visit('/message/inbox');
        cy.contains('Test Message').click();
        cy.get('.delete-button').click();
        cy.contains('Test Message').should('not.exist');
    });
});
