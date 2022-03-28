import { useCallback, useEffect, useState } from 'react';
import useScript from './useScriptHooks';
import { UseAgaveLinkProps, UseAgaveLinkResponse } from './types';

export const useAgaveLink = (config: UseAgaveLinkProps): UseAgaveLinkResponse => {
    const [loading, error] = useScript({
        src: 'https://app.agaveapi.com/init.js',
        checkForExisting: true,
    });
    const [isReady, setIsReady] = useState(false);
    const isServer = (typeof window === 'undefined');
    const isReadyForInitialization = !isServer && !!window.AgaveLink && !loading && !error;

    useEffect(() => {
        if (isReadyForInitialization && window.AgaveLink) {
            setIsReady(true);
        }
    }, [isReadyForInitialization, config]);

    const openLink = useCallback(
        (overrideConfig: Partial<UseAgaveLinkProps>) => {
            if (window.AgaveLink) {
                window.AgaveLink.openLink({
                    ...config,
                    ...overrideConfig,
                });
            }
        },
        [config]
    );

    return { openLink, isReady, error };
};
