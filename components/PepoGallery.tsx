import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GalleryCarousel from './FanceBox';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export default function CenteredTabs({
    tabs,
    id
}: {
    tabs: {
        title: string;
        images: string[];
        id?: string;
    }[]
    id: string;
}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    {tabs.map((tab, index) => (
                        <Tab label={tab.title} key={index} />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((e, i) =>
                <CustomTabPanel value={value} index={i} key={e.title}>
                    <GalleryCarousel
                        images={tabs[value].images.map((image) => ({
                            thumb: (tabs[value].id ? tabs[value].id : id) + image,
                            full: (tabs[value].id ? tabs[value].id : id) + image,
                        }))}
                        height={500}
                    />
                </CustomTabPanel>
            )}
        </>
    );
}
