import { useSelector } from 'react-redux';
import type { RootState } from '../store';

import { useMemo } from 'react';

export const useAuth = () => {
    const { token, role, userName } = useSelector((state: RootState) => state.user);

    return useMemo(() => ({
        user: {
            token,
            role,
            username: userName
        }
    }), [token, role, userName]);
};
