import { useState } from 'react';
import ProfileForm from '../components/account/ProfileForm';
import SecuritySettings from '../components/account/SecuritySettings';
import DeleteAccountDialog from '../components/account/DeleteAccountDialog';
import { User } from 'lucide-react';

// Mock user data – will come from API
const MOCK_USER = {
  id: 'user_123',
  name: 'Jevline kiet',
  email: 'jevline@splitedge.com',
  avatar: null,
  role: 'Owner',
  createdAt: '2026-01-15T10:30:00Z',
  emailVerified: true,
};

const Account = () => {
  const [user, setUser] = useState(MOCK_USER);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSaveProfile = async (data) => {
    setIsSaving(true);
    try {
      // API call would go here
      // await fetch('/api/user/profile', { method: 'PATCH', body: JSON.stringify(data) });
      setUser({ ...user, ...data });
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    setIsSaving(true);
    try {
      // API call would go here
      // await fetch('/api/user/password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) });
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsSaving(true);
    try {
      // API call would go here
      // await fetch('/api/user', { method: 'DELETE' });
      // Redirect to login
    } catch (error) {
      console.error('Failed to delete account:', error);
    } finally {
      setIsSaving(false);
      setShowDeleteDialog(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account</h1>
        <p className="text-text-secondary mt-1">
          Manage your personal information and security settings
        </p>
      </div>

      {/* User info summary */}
      <div className="bg-surface rounded-xl p-6 shadow-card border border-border flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-primary" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-text-secondary">{user.email}</p>
          <p className="text-xs text-text-tertiary mt-1">
            Member since {formatDate(user.createdAt)} • {user.role}
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileForm user={user} onSave={handleSaveProfile} isSaving={isSaving} />
        </div>
        <div className="space-y-6">
          <SecuritySettings onChangePassword={handleChangePassword} isSaving={isSaving} />
          <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
            <h3 className="text-lg font-semibold mb-2 text-error">Danger Zone</h3>
            <p className="text-sm text-text-secondary mb-4">
              Permanently delete your account and all associated data.
            </p>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="w-full px-4 py-2 border border-error/30 text-error rounded-lg text-sm font-medium hover:bg-error/10 transition-colors"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <DeleteAccountDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isSaving}
      />
    </div>
  );
};

export default Account;