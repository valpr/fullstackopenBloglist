import React from 'react'
import {render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
describe('Togglable', () =>{
    let component
    let blog
    const fakeLike = jest.fn()
    const fakeShow = jest.fn()
    beforeEach(() =>{

        blog = {
            title: 'Title',
            author: 'Author',
            url: 'URL',
            likes:'likes',
            user:{
                name:'mluk',
                username:'mluk'
            }
        }
        const user = {
            username: 'mluk'
        }
        component = render(
            <Blog blog={blog} handleLike={fakeLike} handleDelete={fakeShow} user={user}/>
        )
    })
    
    test('Title, Author, no URL/likes', () => {
    
        const div = component.container.querySelector('.blog')
        expect(div).toHaveTextContent(blog.title)
        expect(div).toHaveTextContent(blog.author)
        const tgl = component.container.querySelector('.toggle')
        expect(tgl).toHaveStyle('display: none')
    
        
    })

    test('toggle visibility', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const tgl = component.container.querySelector('.toggle')
        expect(tgl).toHaveTextContent(blog.url)
        expect(tgl).toHaveTextContent(blog.likes)
    })

    test('click like twice', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const like = component.getByText('like')
        fireEvent.click(like)
        fireEvent.click(like)

        expect(fakeLike.mock.calls).toHaveLength(2)
    })
})
