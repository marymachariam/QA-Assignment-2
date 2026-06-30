describe('Mini Project Automation', () => {

  it('should successfully interact with all required form controls and elements', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    cy.visit('https://testautomationpractice.blogspot.com/', { timeout: 30000 });

    cy.get('#name').type('Mary Macharia').should('have.value', 'Mary Macharia');
    cy.get('#email').type('mary@gmail.com').should('have.value','mary@gmail.com');
    cy.get('#phone').type('0712345678').should('have.value', '0712345678');
    cy.get('#textarea').type('Nairobi, Kenya').should('contain.value', 'Kenya');

    cy.get('#country').select('United Kingdom').should('have.value', 'uk');

    cy.get('#monday').check().should('be.checked');
    cy.get('#sunday').check().should('be.checked');
    cy.get('#monday').uncheck().should('not.be.checked');

    cy.get('#female').check().should('be.checked');
    cy.get('#male').should('not.be.checked');

    cy.get('#singleFileInput').selectFile({
      contents: Cypress.Buffer.from('Mock file content for assignment submission'),
      fileName: 'assignment-document.pdf',
      mimeType: 'application/pdf'
    });

    cy.get('footer').scrollIntoView().should('be.visible');

    cy.get('.title').first().should('exist').and('contain.text', 'Automation Testing Practice');
  });

});
