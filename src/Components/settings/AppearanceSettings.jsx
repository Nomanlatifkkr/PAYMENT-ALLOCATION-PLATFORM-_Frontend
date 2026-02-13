import { useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import Button from '../ui/Button';

const AppearanceSettings = ({ settings, onSave, isSaving }) => {
  const [form, setForm] = useState(settings);

  const handleThemeChange = (theme) => {
    setForm({ ...form, theme });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Moon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Appearance</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">Theme</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleThemeChange('light')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                form.theme === 'light'
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-border hover:bg-surface-hover'
              }`}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange('dark')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                form.theme === 'dark'
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-border hover:bg-surface-hover'
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange('system')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                form.theme === 'system'
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-border hover:bg-surface-hover'
              }`}
            >
              <Monitor className="w-4 h-4" />
              System
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Compact mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={form.compact}
              onChange={(e) => setForm({ ...form, compact: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-soft peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save preferences'}
        </Button>
      </div>
    </form>
  );
};

export default AppearanceSettings;