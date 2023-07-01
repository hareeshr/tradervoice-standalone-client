import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  styled,
  Toolbar,
  useTheme,
} from '@mui/material';
import SearchInput2 from './narrative/time-series/SearchInput2';
import LogoutIcon from '@mui/icons-material/Logout';
import logoDark from './../gfx/logo.dark.svg';
import logoLight from '../gfx/logo.light.svg';
import './Header.css'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

type MenuItemType = {
  title: string,
  link: string,
};

export default function Header() {
  const MENU_ITEMS: MenuItemType[] = [
    // {title: 'Time-series', link: '/narrative/quickstart'},
    // {title: 'Visual Narratives', link: '/visualnarratives'}
  ];

  const theme = useTheme();

  function onSignOut() {
    window.location.href = '/';
  }

  return (
    <header>
      
        <Button component={RouterLink} to="/" sx={{ px: 2, mr: 2 }}>
          <img
            src={theme.palette.mode === 'dark' ? logoDark : logoLight}
            alt="tradervoice.io"
            height="46"
          />
        </Button>
        <SearchInput2 />
        <IconButton
          onClick={onSignOut}
          title="Sign Out"
          aria-label="Sign Out"
          sx={{ color: 'text.primary', mr: 1 }}
        >
          <LogoutIcon />
        </IconButton>
        
    </header>
  )

  // return (
  //   <>
  //     <AppBar color="inherit">
  //       <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
  //         <Button component={RouterLink} to="/" sx={{ px: 2, mr: 2 }}>
  //           <img
  //             src={theme.palette.mode === 'dark' ? logoDark : logoLight}
  //             alt="tradervoice.io"
  //             height="46"
  //           />
  //         </Button>

  //         {/* TODO Navigation: https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu */}
  //         <Box sx={{ display: 'flex', flexGrow: 1 }} component="nav">
  //           {MENU_ITEMS.map((menuItem) => (
  //             <Button
  //               component={RouterLink}
  //               key={menuItem.title}
  //               sx={{ color: 'text.primary' }}
  //               to={menuItem.link}
  //             >
  //               {menuItem.title}
  //             </Button>
  //           ))}
  //         </Box>

  //         <IconButton
  //           onClick={onSignOut}
  //           title="Sign Out"
  //           aria-label="Sign Out"
  //           sx={{ color: 'text.primary', mr: 1 }}
  //         >
  //           <LogoutIcon />
  //         </IconButton>
  //       </Toolbar>
  //     </AppBar>
  //     <Offset />
  //   </>
  // );
}
