import { useState } from 'react';
import NavBar from '../components/NavBar';
import { useAuth } from '../contexts/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Profile() {
  const { currentUser, users, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState<{ email?: string; mobile?: string }>({});

  const profile = users.find((user) => user.username === currentUser) ?? {
    username: 'Unknown',
    email: 'Not available',
    mobile: 'Not available',
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[0-9]{10,15}$/;
    return mobileRegex.test(mobile);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEmail(profile.email);
    setMobile(profile.mobile.replace(/\D/g, ''));
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEmail('');
    setMobile('');
    setErrors({});
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setMobile(numericValue);
    if (errors.mobile) {
      setErrors((prev) => ({ ...prev, mobile: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; mobile?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateMobile(mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number (at least 10 digits)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (currentUser) {
      updateProfile(currentUser, email, mobile);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-foreground">User Profile</h2>
            {!isEditing && (
              <Button onClick={handleEdit}>Edit Profile</Button>
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Username</label>
                      <p className="text-sm font-medium">{profile.username}</p>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email address</label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="mobile" className="text-sm font-medium text-muted-foreground">Mobile</label>
                        <Input
                        id="mobile"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={mobile}
                        onChange={handleMobileChange}
                        className={errors.mobile ? 'border-red-500' : ''}
                      />
                      {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Role</label>
                      <p className="text-sm font-medium">Administrator</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Username</label>
                    <p className="text-sm font-medium">{profile.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email address</label>
                    <p className="text-sm font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Mobile</label>
                    <p className="text-sm font-medium">{profile.mobile}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <p className="text-sm font-medium">Administrator</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}   