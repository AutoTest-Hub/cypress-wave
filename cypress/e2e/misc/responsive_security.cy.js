describe('Reddit Responsive Design and Security', () => {
    beforeEach(() => {
        // Log in before each test
        cy.visit('/login');
        cy.get('#loginUsername').type('testuser');
        cy.get('#loginPassword').type('password');
        cy.get('.AnimatedForm__submitButton').click();
        cy.url().should('include', '/');
    });

    it('should be responsive on different screen sizes', () => {
        cy.viewport('iphone-6');
        cy.visit('/');
        cy.get('.header').should('be.visible');

        cy.viewport('ipad-2');
        cy.get('.header').should('be.visible');

        cy.viewport('macbook-15');
        cy.get('.header').should('be.visible');
    });

    it('should protect against SQL injection', () => {
        cy.visit('/login');
        cy.get('#loginUsername').type("testuser' OR '1'='1");
        cy.get('#loginPassword').type("password' OR '1'='1");
        cy.get('.AnimatedForm__submitButton').click();
        cy.contains('Incorrect username or password').should('be.visible');
    });

    it('should protect against XSS', () => {
        cy.visit('/r/test/submit');
        cy.get('input[name="title"]').type('<script>alert("XSS")</script>');
        cy.get('textarea[name="text"]').type('This is a test post with XSS.');
        cy.get('button[type="submit"]').click();
        cy.contains('<script>alert("XSS")</script>').should('not.exist');
    });
});
