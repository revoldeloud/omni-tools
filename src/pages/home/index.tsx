import { Box, Container, Stack, Typography } from '@mui/material';
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
      <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 3 }, pb: 2 }}>
        <Hero />
      </Container>
      <Container maxWidth="lg" sx={{ pt: 1, pb: 8 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={1} sx={{ mb: 1 }}>
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 800, letterSpacing: '-.03em' }}>Todas as ferramentas</Typography>
          </Box>
        </Stack>
        <Box sx={{ mb: 2 }}><UserTypeFilter selectedUserTypes={selectedUserTypes} onUserTypesChange={setSelectedUserTypes} /></Box>
        <Categories />
      </Container>
    </Box>
  );
}
