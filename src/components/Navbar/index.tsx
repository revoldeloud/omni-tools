import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import type { Mode } from 'components/App';

interface NavbarProps {
  mode: Mode;
  onChangeMode: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        color: 'text.primary',
        pt: 2
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h4"
            component="span"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.03em',
              color: theme.palette.text.primary
            }}
          >
            Utitools
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
