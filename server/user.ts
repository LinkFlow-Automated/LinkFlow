"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export const signUp = await auth.api.signUpEmail({
    body: {
        name: "John Doe", // required
        email: "john.doe@example.com", // required
        password: "password1234", // required
        image: "https://example.com/image.png",
        callbackURL: "https://example.com/callback",
    },
});


export const signIn = await auth.api.signInEmail({
    body: {
        email: "john.doe@example.com", // required
        password: "password1234", // required
        rememberMe: true,
        callbackURL: "https://example.com/callback",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});



const signOut = await auth.api.signOut({
    // This endpoint requires session cookies.
    headers: await headers(),
});