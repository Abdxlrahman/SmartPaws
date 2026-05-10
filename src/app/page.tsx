import React from 'react';
import AppLayout from '@/components/AppLayout';
import UnifiedDashboardContent from './components/UnifiedDashboardContent';

export default function UnifiedDashboardPage() {
  return (
    <AppLayout activeRoute="/">
      <UnifiedDashboardContent />
    </AppLayout>
  );
}