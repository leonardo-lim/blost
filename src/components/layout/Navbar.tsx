import { useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Button, Flex, Typography } from 'antd';
import { ThemeMode, ThemeModeContext } from '@/contexts/theme-mode-context';

const Navbar: React.FC = () => {
    const { mode, setMode } = useContext(ThemeModeContext);

    const changeThemeMode = () => {
        if (mode === ThemeMode.dark) {
            setMode(ThemeMode.light);
        } else {
            setMode(ThemeMode.dark);
        }
    };

    return (
        <Flex
            justify="space-between"
            align="center"
            className="w-full h-24 px-10 md:px-20 absolute top-0 left-0"
        >
            <Typography.Title level={2} className="mt-3">Blost.</Typography.Title>
            <Button
                color="default"
                variant="solid"
                icon={mode === ThemeMode.dark ? <FaSun /> : <FaMoon />}
                onClick={changeThemeMode}
            />
        </Flex>
    );
};

export default Navbar;