import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sparkles, Lock, Mail, KeyRound, LogIn, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid admin email or password.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify server connection.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@natyabharati.com');
    setPassword('Admin@12345');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FFFFFF] py-12 px-4">
      <div className="max-w-md w-full bg-white border-2 border-[#FACC15] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#BE185D] text-[#FEF08A] p-8 text-center space-y-2 border-b border-[#FACC15]">
          <div className="w-14 h-14 rounded-full bg-[#831843] border border-[#FACC15] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7 text-[#FEF08A]" />
          </div>
          <h1 className="font-cinzel text-2xl font-bold tracking-wide text-white">
            Academy Admin Portal
          </h1>
          <p className="text-xs text-[#FEF9C3]">
            Jothi's Classical Dancing Management System
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 space-y-6">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@natyabharati.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Master Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#FEF08A] via-[#FACC15] to-[#EAB308] text-[#831843] font-bold text-sm rounded-lg shadow-lg hover:shadow-yellow-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
              <LogIn className="w-4 h-4" />
            </button>
          </form>

          {/* Helper Button for Testing */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="text-xs text-[#BE185D] hover:underline font-bold"
            >
              ⚡ Auto-Fill Seed Admin Credentials (admin@natyabharati.com)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
