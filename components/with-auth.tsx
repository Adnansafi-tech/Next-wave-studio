"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { DecodedData } from '@/services/types/type';
import { AppDispatch } from '@/features/Store';
import { appStart, GeneralInitialState } from '@/features/general/generalSlice';
import { jwtDecode } from 'jwt-decode';
import { ScreenLoader } from '@/components/screen-loader';

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAuthComponent = (props: P) => {
        const dispatch = useDispatch<AppDispatch>();
        const { token, userData } = useSelector<{ general: GeneralInitialState }, GeneralInitialState>(state => state.general);
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            dispatch(appStart());
        }, [dispatch]);

        useEffect(() => {
            const authenticate = async () => {
                if (!token) {
                    router?.push('/admin');
                } else {
                    try {
                        const decoded: DecodedData = jwtDecode(token);
                        const isTokenExpired = decoded?.exp * 1000 < Date.now();
                        const isUserRoleCorrect = decoded?.Role === userData?.Role;

                        if (isTokenExpired || !isUserRoleCorrect) {
                            router?.push('/admin');
                        } else {
                            setLoading(false);
                        }
                    } catch (error) {
                        console.error("Failed to decode token or validate user role:", error);
                        router?.push('/admin');
                    }
                }
            };

            authenticate();
        }, [token, userData, router]);

        if (loading) {
            return <ScreenLoader />;
        }

        return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuthComponent;
};