describe('Mini Project', () => {

  beforeEach(() => {
    // 1. Visit the practice website
    cy.visit('testautomationpractice.blogspot.com');

    // Assertion 1: Verify the main page body has loaded successfully
    cy.get('body').should('be.visible');
    cy.screenshot('01-page-loaded');
  });

  it('fills the complete form and handles network bonuses', () => {

    // 2. Fill out text fields
    cy.get('#name').type('Mary').should('have.value', 'Mary'); // Assertion 2
    cy.screenshot('02-name-typed');

    cy.get('#email').type('mary@gmail.com');
    cy.screenshot('03-email-typed');

    cy.get('#phone').type('0797488020');
    cy.screenshot('04-phone-typed');

    cy.get('#textarea').type('I am learning Cypress automation.');
    cy.screenshot('05-address-typed');

    // 5. Select radio button
    cy.get('#female').check().should('be.checked'); // Assertion 3
    cy.screenshot('06-radio-checked');

    // 4. Check and uncheck checkboxes
    cy.get('#sunday').check().should('be.checked'); // Assertion 4
    cy.screenshot('07-checkbox-checked');

    cy.get('#monday').check();
    cy.screenshot('08-checkbox-temp');

    cy.get('#monday').uncheck().should('not.be.checked'); // Assertion 5
    cy.screenshot('09-checkbox-unchecked');

    // 3. Dropdown Selection
    cy.get('#country').select('canada').should('have.value', 'canada');
    cy.screenshot('10-dropdown-selected');

    // 6. Upload a file
    cy.get('input[type="file"]#fileInput').selectFile({
      contents: Cypress.Buffer.from('assignment submission text'),
      fileName: 'mary-assignment.pdf'
    });
    cy.screenshot('11-file-attached');

    // 7. Scroll to a hidden element
    cy.get('#footer-layout').scrollIntoView().should('be.visible');
    cy.screenshot('12-scrolled-to-footer');


    cy.intercept('GET', 'jsonplaceholder.typicode.com/posts/1', {
      statusCode: 200,
      body: { status: 'Bonus Completed', student: 'Mary' }
    }).as('mockProfile');

    cy.request('GET', 'jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({ status: 'Bonus Completed', student: 'Mary' });
      });

    cy.wait('@myProfile');
    cy.screenshot('13-bonus-network-demonstrated');
  });
});