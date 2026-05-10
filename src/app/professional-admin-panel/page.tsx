import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProfessionalPanelContent from './components/ProfessionalPanelContent';

export default function ProfessionalAdminPanelPage() {
  return (
    <AppLayout activeRoute="/professional-admin-panel">
      <ProfessionalPanelContent />
    </AppLayout>
  );
}