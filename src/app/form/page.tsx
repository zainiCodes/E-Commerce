'use client'
import React, { useActionState, useState } from 'react'
import { test } from './action'
import { toast } from 'sonner'

export default function form() {
    const [state, action, pending] = useActionState(test, null)
    
    return (
        <form action={action}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Name" />
            </div>
            <p>{state?.message}</p>
            
            <button disabled={pending} type="submit">
                Sign Up
            </button>
        </form>

    )
}
