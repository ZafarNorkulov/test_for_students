import React from 'react'
import { it, describe } from 'vitest'
import { render, screen } from "@testing-library/react"
import Login from "../../src/pages/auth/login"
import { Provider } from 'react-redux'
import store from '../../src/store'


describe("Login", () => {
    it("Auth", () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        )
        screen.debug()
    })
})