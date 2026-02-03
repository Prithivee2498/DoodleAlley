import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { toast } from 'sonner';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Login successful!');
        localStorage.setItem('adminLoggedIn', 'true');
        onLoginSuccess();
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-[#FFFDF9] to-orange-100/30 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-orange-100">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#D97706] shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#1E293B]">Admin Login</h1>
            <p className="text-[#1E293B]/70 mt-2">Doodle Alley Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-[#1E293B]">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                className="mt-1 border-orange-100 focus:border-[#D97706] focus:ring-[#D97706]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#1E293B]">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="mt-1 border-orange-100 focus:border-[#D97706] focus:ring-[#D97706]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D97706] text-white hover:bg-[#b45309] shadow-lg"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBack}
              className="text-sm text-[#1E293B]/70 hover:text-[#D97706] underline"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}