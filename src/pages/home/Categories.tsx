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
  const seeAllText = t('translation:categories.seeAll', 'See all {{title}}', {
    title
  });
  const tryText = t('translation:categories.try', 'Try {{title}}', {
    title: t(category.example.title, category.example.title)
  });

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          borderRadius: 4,
          borderColor: (theme) => theme.palette.mode === 'dark' ? '#30433e' : '#e0ebe6',
          background: (theme) => theme.palette.mode === 'dark' ? '#1a2825' : '#fff',
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 16px 38px rgba(15, 67, 50, .10)',
            borderColor: '#96cbb6'
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
              width: 48,
              height: 48,
                flexShrink: 0,
              borderRadius: 2.5,
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#263c35' : '#edf7f1'
              }}
            >
              <Icon
                icon={category.icon}
                fontSize={26}
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
              minHeight: 60
            }}
          >
            {description}
          </Typography>
          <Stack spacing={1} sx={{ mt: 'auto' }}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{ borderRadius: 2, fontWeight: 700, justifyContent: 'space-between', borderColor: 'divider', color: 'text.primary' }}
              onClick={() => navigate(`/categories/${category.type}`)}
            >
              {seeAllText}
            </Button>
            <Button variant="text" size="small" fullWidth sx={{ justifyContent: 'flex-start', color: '#13836a' }} onClick={() => navigate(`/${category.example.path}`)}>{tryText}</Button>
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
