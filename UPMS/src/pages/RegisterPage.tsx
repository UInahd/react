import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const sanitizeName = (value: string) => value.replace(/[^A-Za-z]/g, '');
  const isNameValid = (value: string) => /^[A-Za-z]{2,}$/.test(value);
  const getNameValidationText = (value: string, label: string) => {
    if (!value) {
      return `${label} should be at least 2 letters.`;
    }
    if (value.length === 1) {
      return `${label} must contain more than 1 character.`;
    }
    return `${label} should contain only letters.`;
  };
  const isPasswordValid = (value: string) =>
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(value);
  const getPasswordValidationText = () =>
    'Password must be at least 8 characters and include an uppercase letter, a number, and a symbol.';
  const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isMobileValid = (value: string) => /^[0-9]{10,15}$/.test(value);
  const getMobileValidationText = () =>
    'Mobile number must contain 10 to 15 digits.';

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(sanitizeName(e.target.value));
  const handleMiddleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setMiddleName(sanitizeName(e.target.value));
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(sanitizeName(e.target.value));
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value.replace(/\D/g, ''));

  const calculateAge = (dateString: string) => {
    const birthDate = new Date(dateString);
    if (Number.isNaN(birthDate.getTime())) {
      return -1;
    }
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!isPasswordValid(password)) {
      setError('Password must be at least 8 characters and include an uppercase letter, a number, and a symbol.');
      return;
    }

    if (!isNameValid(firstName) || !isNameValid(lastName)) {
      setError('First name and last name must be at least 2 letters.');
      return;
    }

    if (middleName && !isNameValid(middleName)) {
      setError('Middle name must be at least 2 letters if provided.');
      return;
    }

    if (!birthdate) {
      setError('Please select your birthdate.');
      return;
    }

    const age = calculateAge(birthdate);
    if (age <= 0) {
      setError('Please enter a valid birthdate.');
      return;
    }

    if (!gender) {
      setError('Please select a gender.');
      return;
    }

    const emailValue = email.trim();
    const mobileValue = mobile.trim();
    if (!emailValue || !mobileValue) {
      setError('Email and mobile number are required.');
      return;
    }

    if (!isEmailValid(emailValue)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isMobileValid(mobileValue)) {
      setError(getMobileValidationText());
      return;
    }

    if (register(firstName.trim(), middleName.trim(), lastName.trim(), String(age), gender, password, emailValue, mobileValue)) {
      navigate('/dashboard');
    } else {
      setError('An account with this email already exists.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Admin Registration</CardTitle>
          <CardDescription className="text-center">
            Create a new admin account to monitor the bread shop inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                First name
              </label>
              <div className="relative">
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  placeholder="Enter first name"
                  required
                />
                {firstName.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl">
                    {isNameValid(firstName) ? '✅' : '⚠️'}
                  </span>
                )}
              </div>
              {firstName.length > 0 && !isNameValid(firstName) && (
                <p className="text-xs text-red-600">{getNameValidationText(firstName, 'First name')}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="middleName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Middle name
              </label>
              <div className="relative">
                <Input
                  id="middleName"
                  type="text"
                  value={middleName}
                  onChange={handleMiddleNameChange}
                  placeholder="Enter middle name"
                />
                {middleName.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl">
                    {isNameValid(middleName) ? '✅' : '⚠️'}
                  </span>
                )}
              </div>
              {middleName.length > 0 && !isNameValid(middleName) && (
                <p className="text-xs text-red-600">{getNameValidationText(middleName, 'Middle name')}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Last name
              </label>
              <div className="relative">
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder="Enter last name"
                  required
                />
                {lastName.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl">
                    {isNameValid(lastName) ? '✅' : '⚠️'}
                  </span>
                )}
              </div>
              {lastName.length > 0 && !isNameValid(lastName) && (
                <p className="text-xs text-red-600">{getNameValidationText(lastName, 'Last name')}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="birthdate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Birthdate
                </label>
                <Input
                  id="birthdate"
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Mobile number
              </label>
              <Input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >
                  {showPassword ? '👁️' : '👁️'}
                </button>
                {password.length > 0 && (
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xl">
                    {isPasswordValid(password) ? '✅' : '⚠️'}
                  </span>
                )}
              </div>
              {password.length > 0 && !isPasswordValid(password) && (
                <p className="text-xs text-red-600">{getPasswordValidationText()}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >
                  {showConfirmPassword ? '👁️' : '👁️'}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" size="sm">
              Register
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already registered? <Link to="/login" className="text-primary underline">Sign in here</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
