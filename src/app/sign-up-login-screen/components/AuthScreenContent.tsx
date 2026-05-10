import React from 'react';
import AuthBrandPanel from './AuthBrandPanel';
import AuthFormPanel from './AuthFormPanel';

export default function AuthScreenContent() {
  return (
    <div className="min-h-screen flex bg-background">
      <AuthBrandPanel />
      <AuthFormPanel />
    </div>
  );
}