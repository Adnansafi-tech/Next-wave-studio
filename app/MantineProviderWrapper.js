import { MantineProvider } from '@mantine/core';

const MantineProviderWrapper = ({ children }) => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS >
            { children }
            </MantineProvider>
    );
};

export default MantineProviderWrapper;