"use client";

import { LoginForm } from "@/components/login";
import withAdminAuth from "@/components/with-admin-auth";

function LoginPage() {
    return (
        <>
            <LoginForm />
        </>
    )
}

export default withAdminAuth(LoginPage)