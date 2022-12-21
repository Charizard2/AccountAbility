describe('visits localhost 5173', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Signup').click();

  })
})