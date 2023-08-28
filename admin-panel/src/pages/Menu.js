import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { deleteAuth } from "../api/auth";
import CategorySection from "../sections/Category";
import DrinkSection from "../sections/Drink";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        style={{width: '100%'}}
      >
        {value === index && (
          <Box sx={{height:'100%', overflow:'auto', width: '100%' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export default function Menu({login}) {
    const {setLoggedIn} = login;
    const [value, setValue] = useState(0);
    
    const handleChange = async (x,newValue) => {
        if (newValue === 2) {
          await deleteAuth();
          setLoggedIn(false);
          return;
        }
        setValue(newValue);
    }

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', width: 150 }}
            >
                <Tab label="Category" value={0} />
                <Tab label="Drink" value={1} />
                <Tab label="Logout" value={2} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <CategorySection />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DrinkSection />
            </TabPanel>
        </Box>
    )
}