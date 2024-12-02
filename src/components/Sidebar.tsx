import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as ProfileIcon,
  CardGiftcard as PromotionsIcon,
  EmojiEvents as AffiliateIcon,
  Star as VIPClubIcon,
  Description as BlogIcon,
  Forum as ForumIcon,
  Handshake as SponsorshipsIcon,
  Shield as ResponsibleGamblingIcon,
  Headset as LiveSupportIcon,
  Language as LanguageIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

// Estilos personalizados para el Drawer
const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidthExpanded : drawerWidthCollapsed,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidthExpanded : drawerWidthCollapsed,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          backgroundColor: '#1c1c1c',
          color: '#fff',
        },
      }}
    >
      {/* Botón de menú para colapsar o expandir el sidebar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <IconButton onClick={toggleDrawer} color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>

      <List>
        {/* Ítems del sidebar */}
        {[
          { text: 'Profile', icon: <ProfileIcon /> },
          { text: 'Promotions', icon: <PromotionsIcon /> },
          { text: 'Affiliate', icon: <AffiliateIcon /> },
          { text: 'VIP Club', icon: <VIPClubIcon /> },
          { text: 'Blog', icon: <BlogIcon /> },
          { text: 'Forum', icon: <ForumIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Collapse in={open}>
                <ListItemText primary={item.text} />
              </Collapse>
            </ListItemButton>
          </ListItem>
        ))}

        {/* Separador */}
        <Box sx={{ borderBottom: '1px solid #444', my: 1 }} />

        {/* Segunda sección de ítems */}
        {[
          { text: 'Sponsorships', icon: <SponsorshipsIcon /> },
          { text: 'Responsible Gambling', icon: <ResponsibleGamblingIcon /> },
          { text: 'Live Support', icon: <LiveSupportIcon /> },
          { text: 'Language: English', icon: <LanguageIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Collapse in={open}>
                <ListItemText primary={item.text} />
              </Collapse>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
