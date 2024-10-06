import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{ width: 240, flexShrink: 0 }}
        >
            <List>
                <ListItem button>
                    <ListItemText primary="Plugin 1" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Plugin 2" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;