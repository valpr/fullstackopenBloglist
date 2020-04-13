import React from 'react'
import {render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('called with right details', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm handleCreate={createBlog} />
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    
    fireEvent.change(title, {target: {value: 'title'}})
    fireEvent.change(author,{target: {
        value: 'author'
    }})    
    fireEvent.change(url,{target: {
        value: 'url'
    }})
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title')
    expect(createBlog.mock.calls[0][0].author).toBe('author')

    expect(createBlog.mock.calls[0][0].url).toBe('url')



})