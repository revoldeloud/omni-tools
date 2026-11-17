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
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontWeight: 850,
              letterSpacing: '-0.05em',
              color: theme.palette.text.primary
            }}
          >
            Utitools
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.secondary', fontWeight: 600 }}>Ferramentas simples. Resultados rápidos.</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
