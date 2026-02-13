import { useState } from 'react';
import { User, Mail, Save } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ProfileForm = ({ user, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary mb-1 block">Full name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-text-secondary mb-1 block">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;