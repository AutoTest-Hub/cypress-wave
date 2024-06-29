describe('Reddit Post Interaction', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should create a new post', () => {
        cy.visit('/r/test/submit');
        cy.get('input[name="title"]').type('My Test Post');
        cy.get('textarea[name="text"]').type('This is a test post for Cypress.');
        cy.get('button[type="submit"]').click();
        cy.contains('My Test Post').should('be.visible');
    });

    it('should edit a post', () => {
        cy.visit('/r/test');
        cy.contains('My Test Post').click();
        cy.get('.Post__edit-button').click(); // Adjust selector based on Reddit's actual edit button
        cy.get('textarea[name="text"]').clear().type('This is an edited test post for Cypress.');
        cy.get('button[type="submit"]').click();
        cy.contains('This is an edited test post for Cypress.').should('be.visible');
    });

    it('should delete a post', () => {
        cy.visit('/r/test');
        cy.contains('My Test Post').click();
        cy.get('.Post__delete-button').click(); // Adjust selector based on Reddit's actual delete button
        cy.contains('My Test Post').should('not.exist');
    });
});
