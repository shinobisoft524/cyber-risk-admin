'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AssessmentSidebar from '@/app/components/assessment/AssessmentSidebar';
import QuestionList from './QuestionList';
import { useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';
import { Card } from '@mui/material';

const AssessmentView = () => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  return (
    <Card
      sx={{ display: 'flex', p: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      <AssessmentSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <Box p={3} flexGrow={1}>
        <QuestionList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
      </Box>
    </Card>
  );
};

export default AssessmentView;
