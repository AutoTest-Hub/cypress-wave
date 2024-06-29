describe('Reddit Notifications', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should receive notifications', () => {
        // Simulate actions that generate notifications
        cy.visit('/r/test');
        cy.get('.header-notifications').click();
        cy.contains('You have a new notification').should('be.visible');
    });

    it('should read and delete notifications', () => {
        cy.visit('/notifications');
        cy.get('.notification-item').first().click();
        cy.get('.notification-item').first().find('.delete-notification').click();
        cy.get('.notification-item').should('not.exist');
    });
});
