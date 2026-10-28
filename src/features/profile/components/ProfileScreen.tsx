import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { Card } from "../../../shared/components/Card";
import { Button } from "../../../shared/components/Button";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function ProfileScreen() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="My Profile" />

      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-accent/20 to-accent/10" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 gap-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-2xl font-semibold ring-4 ring-app-surface">
                M
              </div>
              <div className="mb-1">
                <h2 className="text-xl font-semibold text-text-primary">Musharof Chowdhury</h2>
                <p className="text-sm text-text-muted">Team Manager • Arizona, United States.</p>
              </div>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-muted mb-1">First Name</p>
              <p className="text-sm text-text-primary">Musharof</p>
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">Last Name</p>
              <p className="text-sm text-text-primary">Chowdury</p>
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">Email address</p>
              <p className="text-sm text-text-primary">randomuser@pimjo.com</p>
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">Phone</p>
              <p className="text-sm text-text-primary">+09 363 398 46</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-text-muted mb-1">Bio</p>
              <p className="text-sm text-text-primary">Team Manager</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-text-muted mb-2">Social Links</p>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-app-hover text-text-muted"><Facebook size={18} /></button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-app-hover text-text-muted"><Twitter size={18} /></button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-app-hover text-text-muted"><Linkedin size={18} /></button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-app-hover text-text-muted"><Instagram size={18} /></button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Address</h3>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-muted mb-1">Country</p>
              <p className="text-sm text-text-primary">United States</p>
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">City/State</p>
              <p className="text-sm text-text-primary">Arizona, United States.</p>
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">Postal Code</p>
              <p className="text-sm text-text-primary">ERT 2489</p>
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">TAX ID</p>
              <p className="text-sm text-text-primary">AS4568384</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-app-border">
            <div>
              <p className="text-sm font-medium text-text-primary">Change Password</p>
              <p className="text-xs text-text-muted">Receive real-time notifications and team alerts.</p>
            </div>
            <Button variant="secondary">Change Password</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-app-border">
            <div>
              <p className="text-sm font-medium text-text-primary">Two-factor authentication (2FA)</p>
              <p className="text-xs text-text-muted">Keep your account secure by enabling 2FA</p>
            </div>
            <button className="w-11 h-6 rounded-full bg-app-border relative">
              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-app-surface" />
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/30">
            <div>
              <p className="text-sm font-medium text-text-primary">Logout all devices</p>
              <p className="text-xs text-text-muted">Sign out from every active session.</p>
            </div>
            <Button variant="secondary">Logout all devices</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/30">
            <div>
              <p className="text-sm font-medium text-text-primary">Delete account</p>
              <p className="text-xs text-text-muted">Permanently remove your account and data.</p>
            </div>
            <Button variant="secondary">Delete account</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
