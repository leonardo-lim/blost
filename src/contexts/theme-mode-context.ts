import { createContext } from 'react';

enum ThemeMode {
    light = 'light',
    dark = 'dark'
}

interface ThemeModeContextType {
    mode: ThemeMode;
    setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
    mode: ThemeMode.light,
    setMode: () => { }
});

export { ThemeMode, ThemeModeContext };