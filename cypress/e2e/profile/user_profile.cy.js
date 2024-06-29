describe('Reddit User Profile', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should view user profile', () => {
        cy.visit('/user/testuser');
        cy.contains('testuser').should('be.visible');
    });

    it('should edit user profile', () => {
        cy.visit('/user/testuser/edit');
        cy.get('input[name="bio"]').clear().type('This is a test bio.');
        cy.get('button[type="submit"]').click();
        cy.contains('This is a test bio.').should('be.visible');
    });
});
