import { useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ThemeMode, ThemeModeContext } from '@/contexts/theme-mode-context';

interface ProviderProps {
    children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(ThemeMode.light);

    const value = { mode, setMode };

    const themeConfig = {
        algorithm: mode === ThemeMode.dark ? theme.darkAlgorithm : undefined
    };

    useEffect(() => {
        if (mode === ThemeMode.dark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [mode]);

    return (
        <ThemeModeContext.Provider value={value}>
            <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
        </ThemeModeContext.Provider>
    );
};

export default Provider;