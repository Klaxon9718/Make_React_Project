import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Container, Avatar, Button, Tooltip } from '@mui/material';
import * as HeaderComponents from 'src/section/components/HeaderComponents';

const pages = ['시스템 관리', '생산관리', '자재관리'];
const settings = ['Profile', 'Account', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };




  return (
    <AppBar position="static">
      <Container maxWidth="x2">
        <Toolbar disableGutters>
          {/*좌측 상단 로고 */}
          <HeaderComponents.LogoTypography>LOGO</HeaderComponents.LogoTypography>

          {/*좌측 상단 로고와 네비게이션 바에 관련된 처리 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <HeaderComponents.MenuIconButton onClick={handleOpenNavMenu} />
            <HeaderComponents.NavMenu pages={pages} anchorElNav={anchorElNav} handleCloseNavMenu={handleCloseNavMenu} />
          </Box>

          {/*중앙 로고 */}
          <HeaderComponents.CompanyTypo>Maunfact Mate</HeaderComponents.CompanyTypo>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/*사용자 로고 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <HeaderComponents.UserMenu settings={settings} anchorElUser={anchorElNav} handleCloseUserMenu={handleCloseUserMenu} />
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;