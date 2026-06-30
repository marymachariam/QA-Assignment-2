describe('Cypress Fundamentals End-To-End Mini Project Suite', () => {
  
  beforeEach(() => {
  });

  it('Fills and tests multiple interactive element properties across target sites', () => {
    //visit the website
    cy.visit('https://expandtesting.com');
     // 2. Fill out inputs on the dedicated webinputs page
    cy.get('#input-string').type('Automation Tester');
    cy.get('#input-number').type('42');
    
    // 3. Select values from a dropdown on its dedicated page
    cy.visit('https://expandtesting.com');
    cy.get('#dropdown').select('Option 1');

    // 4. Check and uncheck checkboxes on its dedicated page
    cy.visit('https://expandtesting.com');
    cy.get('#checkbox1').check().should('be.checked');
    cy.get('#checkbox1').uncheck().should('not.be.checked');

    // 5. Select radio buttons on its dedicated page
    cy.visit('https://expandtesting.com');
    cy.get('#blue').check().should('be.checked');

    // 6. Upload a file on its dedicated page
    cy.visit('https://expandtesting.com');
    // Ensure you create an empty 'test.txt' file inside your local project's 'cypress/fixtures/' folder!
    cy.get('#file-upload').selectFile('cypress/fixtures/test.txt');
    cy.get('#file-submit').click();
    
    // 7. Scroll down to look at the hidden footer on this page
    cy.get('footer').scrollIntoView();

    // 8 & 9. Final Multi-Assertion verification block (5 distinct assertions)
     // Assertion 1: Visibility
    cy.get('h1').should('be.visible');  
    // Assertion 2: Existence of upload container
    cy.get('#uploaded-files').should('exist');   
    // Assertion 3: Contain text              
    cy.get('footer').should('contain', 'Expand Testing');  
    // Assertion 4: URL inclusion matching the landing spot    
    cy.url().should('include', '/upload');    
    // Assertion 5: Length property checks                
    cy.get('footer p').should('have.length.at.least', 1);     
  });
});
