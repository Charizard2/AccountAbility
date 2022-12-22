import  db from '../../server/models/UserModel'
//const db = require('../../server/models/UserModel')


describe('visits localhost 5173', () => {
let randomUsername:any;
  beforeEach(() => {
    randomUsername = (Math.floor(Math.random() * 2000000)).toString();
  })

  
  it('passes', async () => {
    cy.visit('http://localhost:5173')
    cy.contains('Signup').click();
    cy.get('[data-testid=username]').type(randomUsername)
    cy.get('[data-testid=first-name]').type('first name')
    cy.get('[data-testid=last-name]').type('last name')
    cy.get('[data-testid=password]').type('password')
    cy.get('[data-testid=verify-password]').type('password')
    cy.get('[data-testid=secondary-signup]').click();
    cy.contains('Close').click()
    cy.get('[data-testid=username-login]').type(randomUsername)
    cy.get('[data-testid=password-login]').type('password')
    cy.get('[data-testid=login-button]').click();
    cy.wait(1000)
    cy.url().should('include', '/feed');
    cy.contains('Logout').click()
    cy.url().should('equal', 'http://localhost:5173/');
    cy.end()
  })

  // cy.url().should('eq', 'http://localhost:8000/users/1/edit') // => true


  // it('logs in after creating the user', async () => {
  //   cy.visit('http://localhost:5173')
   
  // })

})

// cy.intercept(
//   {
//     method: 'GET', // Route all GET requests
//     url: '/users/*', // that have a URL that matches '/users/*'
//   },
//   [] // and force the response to be: []
// ).as('getUsers')


// data-testid="initial-signup"
// data-testid = "secondary-signup"
// export default {}
