export interface AgaveLink {
    openLink: (config: UseAgaveLinkProps) => void;
}

export interface UseAgaveLinkProps {
    linkToken: string;
    onSuccess: (publicToken: string) => void;
    onExit?: (error?: string) => void;
    showSandboxSourceSystems?: boolean;
    showProductionSourceSystems?: boolean;
    sourceSystem?: string;
    sourceSystemEnvironment?: string;
    category?: string;
}

export type UseAgaveLinkResponse = {
    openLink: (config: UseAgaveLinkProps) => void;
    isReady: boolean;
    error: ErrorEvent | null;
}

declare global {
    interface Window {
        AgaveLink: AgaveLink;
    }
}