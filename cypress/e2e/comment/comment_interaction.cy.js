describe('Reddit Comment Interaction', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should comment on a post', () => {
        cy.visit('/r/test');
        cy.contains('My Test Post').click();
        cy.get('textarea[name="comment"]').type('This is a test comment.');
        cy.get('button[type="submit"]').click();
        cy.contains('This is a test comment.').should('be.visible');
    });

    it('should edit a comment', () => {
        cy.visit('/r/test');
        cy.contains('My Test Post').click();
        cy.contains('This is a test comment.').parent().find('.Comment__edit-button').click(); // Adjust selector
        cy.get('textarea[name="comment"]').clear().type('This is an edited test comment.');
        cy.get('button[type="submit"]').click();
        cy.contains('This is an edited test comment.').should('be.visible');
    });

    it('should delete a comment', () => {
        cy.visit('/r/test');
        cy.contains('My Test Post').click();
        cy.contains('This is an edited test comment.').parent().find('.Comment__delete-button').click(); // Adjust selector
        cy.contains('This is an edited test comment.').should('not.exist');
    });
});
