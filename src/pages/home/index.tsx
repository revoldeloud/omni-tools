import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import Hero from 'components/Hero';
import Categories from './Categories';
import { Helmet } from 'react-helmet';
import { useUserTypeFilter } from 'providers/UserTypeFilterProvider';
import UserTypeFilter from '@components/UserTypeFilter';

export default function Home() {
  const { selectedUserTypes, setSelectedUserTypes } = useUserTypeFilter();
  return (
    <Box sx={{ minHeight: '100vh', pb: 12, background: (theme) => theme.palette.mode === 'dark' ? '#101719' : '#f5f8f7' }}>
      <Helmet title="Utitools" />
      <Box sx={{ background: (theme) => theme.palette.mode === 'dark' ? 'radial-gradient(circle at 85% 10%, #24544b 0%, #142522 40%, #111b1a 100%)' : 'radial-gradient(circle at 85% 0%, #d2eee2 0%, #ecf7f2 42%, #e5f1ed 100%)', borderBottom: '1px solid', borderColor: 'divider', py: { xs: 7, md: 11 } }}>
        <Container maxWidth="lg">
          <Chip label="UTITOOLS" size="small" sx={{ bgcolor: '#136c58', color: 'white', fontWeight: 800, letterSpacing: 1.4, mb: 3 }} />
          <Hero />
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 8 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#13836a', fontWeight: 800, letterSpacing: 2 }}>EXPLORE</Typography>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, letterSpacing: '-.04em' }}>Encontre sua próxima ferramenta</Typography>
            <Typography color="text.secondary">Navegue por categoria ou filtre pelo que você precisa.</Typography>
          </Box>
        </Stack>
        <Box sx={{ mb: 4 }}><UserTypeFilter selectedUserTypes={selectedUserTypes} onUserTypesChange={setSelectedUserTypes} /></Box>
        <Categories />
      </Container>
    </Box>
  );
}
