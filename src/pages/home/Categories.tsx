import { getToolsByCategory } from '@tools/index';
import Grid from '@mui/material/Grid';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { getI18nNamespaceFromToolCategory } from '@utils/string';
import { categoriesColors } from 'config/uiConfig';
import { useUserTypeFilter } from '../../providers/UserTypeFilterProvider';

type Category = ReturnType<typeof getToolsByCategory>[number];

function SingleCategory({
  category,
  index
}: {
  category: Category;
  index: number;
}) {
  const { t } = useTranslation(getI18nNamespaceFromToolCategory(category.type));
  const navigate = useNavigate();
  const title = t(`categories.${category.type}.title`, category.title);
  const description = t(
    `categories.${category.type}.description`,
    category.description
  );
  const toolsCount = category.tools.length;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          borderColor: (theme) => theme.palette.mode === 'dark' ? '#36554b' : '#d5e8df',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, #1d302b 0%, #17231f 100%)'
            : `linear-gradient(145deg, ${index % 2 === 0 ? '#ffffff' : '#f4fbf7'} 0%, #edf7f1 100%)`,
          boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 8px 24px #07100d55' : '0 8px 24px #164b3510',
          transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
          '&::before': { content: '""', position: 'absolute', inset: '0 0 auto', height: 4, background: categoriesColors[index % categoriesColors.length] },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 18px 36px rgba(15, 67, 50, .16)',
            borderColor: categoriesColors[index % categoriesColors.length]
          }
        }}
      >
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 52,
                height: 52,
                flexShrink: 0,
                borderRadius: 2.5,
                bgcolor: `${categoriesColors[index % categoriesColors.length]}20`,
                boxShadow: `inset 0 0 0 1px ${categoriesColors[index % categoriesColors.length]}35`
              }}
            >
              <Icon
                icon={category.icon}
                fontSize={29}
                color={categoriesColors[index % categoriesColors.length]}
              />
            </Box>
            <Typography
              component="h2"
              variant="h6"
              sx={{ fontWeight: 700, lineHeight: 1.25, overflowWrap: 'anywhere' }}
            >
              {title}
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ display: 'inline-flex', mt: 1.5, px: 1.1, py: .45, borderRadius: 5, bgcolor: `${categoriesColors[index % categoriesColors.length]}18`, color: categoriesColors[index % categoriesColors.length], fontWeight: 800 }}>
            {toolsCount} {toolsCount === 1 ? 'ferramenta' : 'ferramentas'}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 2,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 60,
              lineHeight: 1.55
            }}
          >
            {description}
          </Typography>
          <Stack spacing={1.2} sx={{ mt: 'auto' }}>
            <Button
              variant="outlined"
              size="medium"
              fullWidth
              sx={{ borderRadius: 2, fontWeight: 750, minHeight: 42, justifyContent: 'space-between', borderColor: `${categoriesColors[index % categoriesColors.length]}75`, color: 'text.primary', '&:hover': { bgcolor: `${categoriesColors[index % categoriesColors.length]}12`, borderColor: categoriesColors[index % categoriesColors.length] } }}
              onClick={() => navigate(`/categories/${category.type}`)}
            >
              {`Ver todas as ferramentas de ${title}`}
            </Button>
            <Button variant="contained" size="medium" fullWidth disableElevation sx={{ borderRadius: 2, minHeight: 42, fontWeight: 800, bgcolor: categoriesColors[index % categoriesColors.length], color: '#fff', '&:hover': { bgcolor: categoriesColors[index % categoriesColors.length], filter: 'brightness(.92)' } }} onClick={() => category.type === 'video' ? window.location.assign('/openreel/') : navigate(`/${category.example.path}`)}>Usar ferramenta</Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default function Categories() {
  const { selectedUserTypes } = useUserTypeFilter();
  const { t } = useTranslation();
  // Display a tool only in its own primary category on the portal.
  // Global search and the original tool definitions remain unchanged.
  const categories = getToolsByCategory(selectedUserTypes, t, undefined, false);

  return (
    <Box width="100%">
      <Grid container spacing={2.5}>
        {categories.map((category, index) => (
          <SingleCategory
            key={category.type}
            category={category}
            index={index}
          />
        ))}
      </Grid>
    </Box>
  );
}
