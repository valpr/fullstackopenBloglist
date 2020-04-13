import { isExportDeclaration } from "typescript"

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'Andrew Fong',
          username: 'heyguys',
          password: 'heyguys'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
      })

    it('Login form is shown', function () {
        cy.contains('Login to application')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function() {

        it('succeeds with correct credentials', function (){
            cy.get('#username').type('heyguys')
            cy.get('#password').type('heyguys')
            cy.get('#login-button').click()
            cy.contains(`${'Andrew Fong'} logged in`)
        })
        it('fails with wrong credentials', function () {
            cy.get('#username').type('heyguys')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.contains(`Login failed, check credentials`)
        })
        describe('When logged in', function (){
            beforeEach(function() {
                cy.login({username:'heyguys', password:'heyguys'})
            })
            const blog = {
                title:'test blog name',
                author:'test author',
                url:'testurl.com'
            }
            it('A blog can be created', function (){
                cy.get('#show').click()
                cy.get('#title').type(blog.title)
                cy.get('#author').type(blog.author)
                cy.get('#url').type(blog.url)
                cy.get('#newBlog').click()
                cy.contains(blog.title)
            })

            describe('one blog functions', function (){
                beforeEach(function(){
                    cy.createBlog({title:'How Code?', author:'dolan', url:'SellStonks.com'})
                })
                it('user can like a blog', function (){
                    cy.contains('view').click()
                    cy.get('.like').click()
                    cy.contains('1')
                })
    
                it('user can delete a blog if they create it', function(){
                    cy.contains('view').click()
                    cy.get('#delete').click()
                    cy.contains('How Code?').should('not.exist')
                })
            })
            describe('multiple blog functions', function (){
                beforeEach(function(){
                    cy.createBlog({title:'How Code?', author:'dolan', url:'SellStonks.com'})
                    cy.createBlog({title:'Alternatives to code?', author:'nalod', url:'tradingztocks'})
                    cy.createBlog({title:'Dim Gai?', author:'lonad', url:'segway.com'})
                    cy.contains('How Code?').contains('view').click()
                    cy.contains('Dim Gai').contains('view').click()
                    cy.contains('Alternatives to code?').contains('view').click()
                })
                it.only('blogs are sorted from most likes to least', function(){
                    cy.contains('How Code?').find('.like').as('buttonOne')
                    cy.contains('Dim Gai').find('.like').as('buttonTwo')
                    
                    cy.contains('Alternatives to code?').find('.like').as('buttonThree')
                    cy.get('@buttonOne').click()
                    cy.get('@buttonOne').click()
                    cy.get('@buttonThree').click()
                    cy.get('@buttonTwo').click()
                    cy.get('@buttonTwo').click()
                    cy.get('@buttonTwo').click()
                    cy.contains('Dim Gai').contains('3')
                    cy.contains('How Code?').contains('2')
                    cy.contains('Alternatives to code?').contains('1')
                    cy.get('div.blog > .toggle > .likes').then(list => {
                        let decreasing = Number.MAX_SAFE_INTEGER
                        let num = parseInt(list['0'].innerText)
                        expect(num).to.be.most(decreasing)
                        decreasing = num
                        num = parseInt(list['1'].innerText)
                        expect(num).to.be.most(decreasing)
                        decreasing = num
                        num = parseInt(list['2'].innerText)
                        expect(num).to.be.most(decreasing)
                        decreasing = num
                    })

                    
                    


                })
            })

        })
    })


})