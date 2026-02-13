import { useState } from 'react';
import { Key, Copy, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ApiSettings = ({ onSave, isSaving }) => {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk_live_xxxxxxxxxxxxxx');
  const [webhookUrl, setWebhookUrl] = useState('https://api.splitedge.com/webhooks/stripe');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Could show toast
  };

  const handleRegenerate = () => {
    // API call to regenerate key
    setApiKey('sk_live_' + Math.random().toString(36).substring(2));
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Key className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">API Access</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary mb-1 block">API Key</label>
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              readOnly
              className="pr-24 font-mono text-sm"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => handleCopy(apiKey)}
                className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={handleRegenerate}
            className="text-xs text-primary hover:text-primary-light mt-2"
          >
            Regenerate API key
          </button>
        </div>
        <div>
          <label className="text-sm font-medium text-text-secondary mb-1 block">Webhook URL</label>
          <div className="relative">
            <Input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="pr-10 font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => handleCopy(webhookUrl)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={onSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save settings'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;