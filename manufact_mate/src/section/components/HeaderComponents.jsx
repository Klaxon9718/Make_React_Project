// HeaderComponents.jsx
import React from 'react';
import { IconButton, Typography, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as Headercss from 'src/section/css/Headercss'; // Headercss 파일에서 스타일을 불러옵니다.

export const LogoTypography = ({ children }) => (
  <Typography
    variant="h6"
    noWrap
    component="a"
    href="http://localhost:3000/"
    sx={Headercss.logoStyle}
  >
    {children}
  </Typography>
);

export const MenuIconButton = ({ onClick }) => (
  <IconButton
    size="large"
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={onClick}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
);

export function NavMenu({ pages, anchorElNav, handleCloseNavMenu }) {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={Headercss.meunAnchorOrigin}
      keepMounted
      transformOrigin={Headercss.menuTransformOrigin}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
    >
      {pages.map((page) => (
        <MenuItem key={page} onClick={handleCloseNavMenu}>
          <Typography textAlign="center">{page}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export const CompanyTypo = ({ children }) => (
  <Typography
    variant="h5"
    noWrap
    component="a"
    href="#app-bar-with-responsive-menu"
    sx={Headercss.CompanyTypo}>
    {children}
  </Typography>
);

export function UserMenu ({settings, anchorElUser, handleCloseUserMenu}){
  return (
<Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={Headercss.meunAnchorOrigin2}
                  keepMounted
                  transformOrigin={Headercss.menuTransformOrigin2}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
  );
}