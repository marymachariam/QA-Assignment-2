WHAT I AHVE LEARNT

Part A: Test Structure
describe()
Purpose: Groups related test cases together into a logical suite.
Syntax: describe('Suite Name', () => { ... })
Example:
describe('Login Functionality', () => {
});
Real-World Use Case: Grouping all tests that verify user authentication (login, logout, forgot password).
it()
Purpose: Defines an individual, specific test case.
Syntax: it('Test Case Name', () => { ... })
Example:
it('should login successfully with valid credentials', () => {
});
Real-World Use Case: Verifying that typing a wrong password triggers an error message.
before()
Purpose: Runs exactly once before any test cases inside the describe block begin.
Syntax: before(() => { ... })
Example:
before(() => {
  cy.log('Setting up global test database seed.');
});
Real-World Use Case: Seeding a database or clearing severe system caches before launching the entire test suite.

beforeEach()
Purpose: Runs before every single individual it() test block.
Syntax: beforeEach(() => { ... })
Example:
beforeEach(() => {
  cy.visit('/login');
});
Real-World Use Case: Navigating to the homepage or resetting the browser state before each test starts.

after()
Purpose: Runs exactly once after all the tests in the current block finish.
Syntax: after(() => { ... })
Example:
after(() => {
  cy.log('Cleaning up master test data.');
});
Real-World Use Case: Deleting temporary global accounts generated during the suite run.

afterEach()
Purpose: Runs right after every single individual it() test block completes.
Syntax: afterEach(() => { ... })
Example:
afterEach(() => {
  cy.clearCookies();
});
Real-World Use Case: Logging out of an application or clearing session storage so the next test starts clean.
Part B: Assertions
Difference Between expect() and should()
should(): A BDD assertion chained directly onto a Cypress command command chain. It automatically retries until it passes or times out

expect(): A BDD assertion used on direct Javascript variables or objects. It does not retry automatically.

When to Use EachUse 
should() , when checking DOM elements directly from UI commands.
Expect(), when writing custom logic or checking raw data values, variables, or API response bodies.

Examples for should():

cy.get('.error-msg').should('be.visible');
cy.get('#submit-btn').should('have.text', 'Save');
cy.get('[type="checkbox"]').should('be.checked');

Examples for expect():

expect(name).to.equal('Mary');
expect(response.status).to.eq(200);
expect(array).to.have.lengthOf(3);


Part C: Basic Cypress Commands
Action
Command
Example
Visit a page
cy.visit()
cy.visit('/dashboard')
Type into a textbox
cy.type()
cy.get('#email').type('mary@gmail.com')
Click a button
cy.click()
cy.get('.btn-submit').click()
Clear a field
cy.clear()
cy.get('#username').clear()
Check a checkbox
cy.check()
cy.get('[type="checkbox"]').check()
Uncheck a checkbox
cy.uncheck()
cy.get('[type="checkbox"]').uncheck()
Select from a dropdown
cy.select()
cy.get('#country').select('Canada')
Scroll to an element
cy.scrollIntoView()
cy.get('#footer').scrollIntoView()
Upload a file
cy.selectFile()
cy.get('#file-upload').selectFile('file.jpg')
Hover over an element
cy.trigger('mouseover')
cy.get('.menu').trigger('mouseover')
Right click
cy.rightclick()
cy.get('.context-menu').rightclick()
Double click
cy.dblclick()
cy.get('.row-item').dblclick()
Press keyboard keys
cy.type('{key}')
cy.get('input').type('{enter}')



Part D: Locators
cy.get(): Finds elements by standard CSS selectors.
cy.get('.btn-primary')

cy.contains(): Finds an element containing specific text string.
cy.contains('Submit Form')

.find(): Searches downward through descendants of a previously located element.
cy.get('form').find('input')

.children(): Gets immediate children elements of a DOM element.
cy.get('ul.menu-list').children()

.parent(): Targets the single direct parent element above the current selection.
cy.get('input#name').parent()

.closest(): Traverses up the DOM tree to find the nearest matching ancestor element.
cy.get('input').closest('div.form-group')

.eq(): Grabs a specific element from a list based on its index number (starts at 0).
cy.get('li').eq(2) // Gets the 3rd item

.first(): Picks the very first item out of an array or group of elements.
cy.get('tr').first()

.last(): Picks the absolute last element out of an array or group.
cy.get('tr').last()

.within(): Limits all subsequent inner queries to run strictly inside this specific parent element block.
cy.get('#login-form').within(() => {
  cy.get('[type="text"]').type('John');
});

Questions
Why are IDs preferred? 
IDs are unique within a webpage document. This makes targeting exact items clean, precise, and fast.
What are CSS selectors?
 Patterns used to select elements based on tags, classes, IDs, attributes, or structural relationships.
What are data attributes (data-cy, data-testid)?
 Custom HTML attributes added purely for testing. They separate application design styles from automation hooks so UI updates do not break tests.
Why are long CSS selectors discouraged? 
Long structural selectors (like div > span > ul > li > input) break easily if a developer inserts or rearranges an element anywhere in that chain.
Part E: Assertions Practice
Write examples using:
cy.get('#logo').should('be.visible');
cy.get('.modal').should('exist');
cy.get('.banner').should('contain', 'Welcome back');
cy.get('h1').should('have.text', 'Dashboard');
cy.get('#username').should('have.value', 'alex123');
cy.get('ul.items > li').should('have.length', 5);
cy.get('#submit-btn').should('be.enabled');
cy.get('#expired-input').should('be.disabled');
cy.get('#terms-checkbox').should('be.checked');
cy.get('a#profile').should('have.attr', 'href', '/profile');

Part F: Working with Elements
Buttons
cy.get('.save-btn').click();

Text fields
cy.get('#first-name').type('Mary');

Password fields
cy.get('[type="password"]').type('Mary@2345!');

Checkboxes
cy.get('#newsletter').check().should('be.checked');

Radio buttons
cy.get('[value="female"]').check().should('be.checked');

Dropdowns
cy.get('select#state').select('California');

Text areas
cy.get('textarea#bio').type('Learning automation basics.');

Links
cy.get('a.privacy-policy').click();

Images
cy.get('img.avatar').should('be.visible').and('have.attr', 'alt', 'User profile photo');

Part G: Waiting
Research
Automatic waiting:
 Cypress waits automatically for elements to exist and become visible/actionable before performing commands.
Retry-ability: 
Cypress commands will rerun queries and assertions automatically for a default timeframe (4 seconds) before failing.
cy.wait(): 
Pauses test execution for an explicit millisecond count or waits for a defined network alias to resolve.
Waiting for API requests
Intercepting a network call via an alias and instructing Cypress to pause until the live backend response finishes.
Waiting for page loading
Checking for a target UI element or page URL transition to confirm the DOM state is completely initialized.
Questions
Why is cy.wait(5000) considered bad practice?
 It forces the test execution to sleep for a static period. If an element loads in 1 second, you waste 4 seconds. If it takes 6 seconds, the test breaks anyway.
What is a better alternative? 
Use structural assertions that leverage retry-ability, or set custom timeout options within specific element commands.
cy.get('.heavy-component', { timeout: 10000 }).should('be.visible');
Part H: Forms
describe('Form Submission Suite', () => {
  it('should fill out and successfully submit the registration form', () => {
    cy.visit('/registration-form-page')
    cy.get('#firstName').type('Mary');
    cy.get('#lastName').type('Macharia');
    cy.get('#email').type('marymacharia@gmail.com');
    cy.get('#password').type('@machariaM2024');
    cy.get('#dob-picker').type('2000-06-15');
    cy.get('#country-select').select('Kenya');
    cy.get('#newsletter-opt-in').check();
    cy.get('[value="female"]').check();
    
    cy.get('#submit-form-button').click();

    // Verify submission success
    cy.get('.success-banner')
      .should('be.visible')
      .and('contain.text', 'Thank you for registering');
  });
});
Part I: Tables
describe('Data Table Operations', () => {
  beforeEach(() => {
    cy.visit('/tables-demo');
  });

  it('should validate table data structural properties', () => {
    // Count rows (excluding header)
    cy.get('table#data-table tbody tr').should('have.length', 5);

    // Count columns
    cy.get('table#data-table thead tr th').should('have.length', 4);

    // Read data from a row and verify text content
    cy.get('table#data-table tbody tr').eq(1).within(() => {
      cy.get('td').eq(0).should('have.text', 'Jane Smith');
      cy.get('td').eq(1).should('have.text', 'Admin');
    });

    // Click a button inside a specific row
    cy.get('table#data-table tbody tr').eq(2).find('.btn-edit').click();

    // Verify target table contents anywhere in body
    cy.get('table#data-table').should('contain', 'Active');
  });
});
Part J: Browser Interactions
// Browser Back
cy.go('back');

// Browser Forward
cy.go('forward');

// Reload
cy.reload();

// Open a new tab (How Cypress handles this)
// Cypress does not support multiple tabs. To test links opening in a new tab, remove the target="_blank" attribute before clicking.
cy.get('a#external-link').invoke('removeAttr', 'target').click();

// Browser alerts
cy.on('window:alert', (alertText) => {
  expect(alertText).to.equal('Action completed!');
});

// Confirmation dialogs (accepting)
cy.on('window:confirm', (confirmText) => {
  expect(confirmText).to.equal('Are you sure?');
  return true; // Click OK
});

// Prompt dialogs (typing value)
cy.window().then((win) => {
  cy.stub(win, 'prompt').returns('Student Response');
});


Part J: Browser Interactions
// Enter
cy.get('#search').type('Automation{enter}');

// Tab (Requires cypress-real-events plugin or typing special sequences)
cy.get('#input-one').realPress('Tab');

// Escape
cy.get('.modal-input').type('{esc}');

// Arrow directions
cy.get('.game-canvas').type('{uparrow}');
cy.get('.game-canvas').type('{downarrow}');
cy.get('.game-canvas').type('{leftarrow}');
cy.get('.game-canvas').type('{rightarrow}');

// Deleting inputs
cy.get('#editor').type('{del}');
cy.get('#editor').type('{backspace}');

Part K: Keyboard Actions
// Enter
cy.get('#search').type('Automation{enter}');

// Tab (Requires cypress-real-events plugin or typing special sequences)
cy.get('#input-one').realPress('Tab');

// Escape
cy.get('.modal-input').type('{esc}');

// Arrow directions
cy.get('.game-canvas').type('{uparrow}');
cy.get('.game-canvas').type('{downarrow}');
cy.get('.game-canvas').type('{leftarrow}');
cy.get('.game-canvas').type('{rightarrow}');

// Deleting inputs
cy.get('#editor').type('{del}');
cy.get('#editor').type('{backspace}');

Part L: Scrolling
// Scroll to bottom of page
cy.scrollTo('bottom');

// Scroll to top of page
cy.scrollTo('top');

// Scroll to specific element and verify visibility
cy.get('#privacy-disclaimer-footer')
  .scrollIntoView()
  .should('be.visible');

Part M: File Upload
Research:
Why Cypress cannot upload files by default: Historically, standard HTML file input structures rely on direct native OS file picker interfaces which JavaScript sandboxes cannot control.
The solution: Modern Cypress uses the built-in .selectFile() command directly on input elements, or tests rely on the cypress-file-upload plugin.
 Example:
cy.get('input[type="file"]').selectFile('cypress/fixtures/sample-image.jpg')

