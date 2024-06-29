describe('Reddit Performance', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should load the homepage within acceptable time', () => {
        const start = new Date().getTime();
        cy.visit('/');
        const end = new Date().getTime();
        const loadTime = end - start;
        expect(loadTime).to.be.lessThan(2000); // Example threshold, adjust as needed
    });

    it('should handle stress under heavy traffic', () => {
        const requests = Array.from({ length: 50 }, (_, i) => i);
        cy.wrap(requests).each(() => {
            cy.visit('/');
        });
        // Add more validations as needed to check site stability
    });
});
