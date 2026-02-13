import { useState } from 'react';
import NotificationSettings from '../components/settings/NotificationSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import ApiSettings from '../components/settings/ApiSettings';
import { Bell, Moon, Globe, Key } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      paymentAlerts: true,
      weeklyReport: true,
    },
    appearance: {
      theme: 'light', // light, dark, system
      compact: false,
    },
    language: 'en',
    timezone: 'America/New_York',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNotifications = async (data) => {
    setIsSaving(true);
    try {
      // API call
      setSettings({ ...settings, notifications: data });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAppearance = async (data) => {
    setIsSaving(true);
    try {
      setSettings({ ...settings, appearance: data });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveApi = async (data) => {
    setIsSaving(true);
    try {
      // API call
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-text-secondary mt-1">
          Manage your application preferences
        </p>
      </div>

      {/* Settings sections */}
      <div className="space-y-6">
        <NotificationSettings
          settings={settings.notifications}
          onSave={handleSaveNotifications}
          isSaving={isSaving}
        />
        <AppearanceSettings
          settings={settings.appearance}
          onSave={handleSaveAppearance}
          isSaving={isSaving}
        />
        <ApiSettings onSave={handleSaveApi} isSaving={isSaving} />
      </div>
    </div>
  );
};

export default Settings;