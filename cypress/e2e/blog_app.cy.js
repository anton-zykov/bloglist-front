describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Anton Zykov',
      username: 'akzykov',
      password: '1234',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('akzykov')
      cy.get('input:last').type('1234')
      cy.contains('login').click()
      cy.contains('Welcome')
    })

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('akzykov')
      cy.get('input:last').type('4321')
      cy.contains('login').click()
      cy.contains('Log in to application')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'akzykov', password: '1234' })
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#createButton').click()
      cy.get('.blogMainInfo').contains('Test title by Test author')
    })

    describe('Now testing this blog features', function () {
      beforeEach(function () {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Test title')
        cy.get('#author').type('Test author')
        cy.get('#url').type('Test url')
        cy.get('#createButton').click()
      })

      it('A blog can be liked', function () {
        cy.get('#showDetailsButton').click()
        cy.get('#likeButton').click()
        cy.contains('Likes: 1')
      })

      it('A blog can be deleted', function () {
        cy.get('#showDetailsButton').click()
        cy.get('#removeButton').click()
        cy.get('.blogMainInfo').should('not.exist')
      })

      it('Other users cannot delete this blog', function () {
        cy.contains('Logout').click()
        const user = {
          name: 'Anton Zykov 2',
          username: 'akzykov2',
          password: '1234',
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.login({ username: 'akzykov2', password: '1234' })
        cy.get('#showDetailsButton').click()
        cy.get('#removeButton').should('not.exist')
      })
    })

    it('Two blogs must be ordered by number of likes', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#createButton').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('Test title 2')
      cy.get('#author').type('Test author 2')
      cy.get('#url').type('Test url 2')
      cy.get('#createButton').click()

      cy.get('.blog').eq(0).get('#showDetailsButton').click()
      cy.wait(1000)
      cy.get('.blog').eq(1).get('#showDetailsButton').click()
      cy.wait(1000)
      cy.get('.blog').eq(1).contains('Like').click()
      cy.wait(1000)
      cy.get('.blog').eq(0).contains('Test title 2 by Test author 2')
    })
  })
})
