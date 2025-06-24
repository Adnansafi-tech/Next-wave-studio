"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { DecodedData, UserData } from '@/services/types/type';
import { AppDispatch } from '@/features/Store';
import { appStart } from '@/features/general/generalSlice';
import { jwtDecode } from 'jwt-decode';
import { ScreenLoader } from './screen-loader';

interface AuthState {
    token: string | null;
    userData: UserData;
}

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAdminAuthComponent = (props: P) => {
        const { token, userData } = useSelector<{ general: AuthState }, AuthState>(state => state.general);
        const router = useRouter();
        const dispatch = useDispatch<AppDispatch>();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            dispatch(appStart());
        }, [dispatch]);

        useEffect(() => {
            if (token) {
                try {
                    const decoded: DecodedData = jwtDecode(token);
                    const isTokenExpired = decoded.exp * 1000 < Date.now();
                    const isUserRoleCorrect = decoded.Role === userData.Role;

                    if (!isTokenExpired && isUserRoleCorrect) {
                        router.push('/');
                    } else {
                        setLoading(false);
                    }
                } catch (error) {
                    console.error("Failed to decode token or validate user role:", error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }, [token, userData, router]);

        if (loading) {
            return <ScreenLoader />;
        }

        return <WrappedComponent {...props} />;
    };

    WithAdminAuthComponent.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAdminAuthComponent;
};

export default withAdminAuth;