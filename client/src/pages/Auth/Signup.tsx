// Signup.tsx
// Registration page for students, teachers, and admin

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Home/Button';
import Tag from '../Home/Tag';
import RevealOnScroll from '../Home/RevealOnScroll';

interface Role {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const ROLES: Role[] = [
  { id: 'student', label: 'Student', description: 'Learn from expert instructors', icon: '🎓' },
  { id: 'teacher', label: 'Teacher', description: 'Create and sell courses', icon: '📚' },
  { id: 'admin', label: 'Admin', description: 'Manage platform operations', icon: '⚙️' },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState<string>('student');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert(`Account created successfully as ${selectedRole}!`);
      }, 1500);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink pt-[54px]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-[54px] border-b border-ink-15 bg-paper/90 backdrop-blur-[14px]">
        <Link to="/" className="font-serif text-[22px] tracking-[-0.02em] text-ink absolute left-1/2 -translate-x-1/2">
          Course<span className="text-red italic">Craft</span>
        </Link>
        <div className="flex items-center h-full ml-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] px-[1.4rem] text-ink-45 hidden sm:block">
            Already have an account?
          </span>
          <Link to="/login">
            <Button variant="primary" style={{ height: '54px', borderRadius: 0 }}>
              Sign in →
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="section min-h-[calc(100vh-54px)] flex items-center justify-center">
        <div className="w-full max-w-[600px]">
          <RevealOnScroll instant>
            <Tag className="block mb-4">Create Account</Tag>
            <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-[1.05] tracking-[-0.03em] mb-8">
              Start your <em className="text-red">learning journey</em>
            </h1>
          </RevealOnScroll>

          {/* Role Selection */}
          <RevealOnScroll delay={1}>
            <div className="mb-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-45 mb-4">[ Select your role ]</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROLES.map((role) => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    isSelected={selectedRole === role.id}
                    onClick={() => setSelectedRole(role.id)}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Form */}
          <RevealOnScroll delay={2}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormInput
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  placeholder="John"
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  placeholder="Doe"
                />
              </div>

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
              />

              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
              />

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-red "
                />
                <label htmlFor="agreeTerms" className="text-[13px] leading-[1.6] text-ink-70 ">
                  I agree to the{' '}
                  <a href="#" className="text-red hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-red hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-red text-[12px] font-mono">{errors.agreeTerms}</p>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-mono text-[12px] tracking-[0.1em] uppercase bg-red text-white border-2 border-red px-6 py-4 transition-all duration-150 hover:bg-transparent hover:text-red  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating Account...' : `Create ${selectedRole === 'student' ? 'Student' : selectedRole === 'teacher' ? 'Teacher' : 'Admin'} Account →`}
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-[13px] text-ink-45 pt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-red hover:underline">Sign in</Link>
              </p>
            </form>
          </RevealOnScroll>
        </div>
      </main>
    </div>
  );
}

interface RoleCardProps {
  role: Role;
  isSelected: boolean;
  onClick: () => void;
}

function RoleCard({ role, isSelected, onClick }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 border-2 text-left transition-all duration-150  ${
        isSelected
          ? 'border-red bg-red/5'
          : 'border-ink-15 hover:border-ink-30'
      }`}
    >
      <span className="text-2xl mb-2 block">{role.icon}</span>
      <p className={`font-mono text-[11px] uppercase tracking-[0.08em] mb-1 ${isSelected ? 'text-red' : 'text-ink'}`}>
        {role.label}
      </p>
      <p className="text-[12px] text-ink-45 leading-[1.4]">{role.description}</p>
    </button>
  );
}

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
}

function FormInput({ label, name, type = 'text', value, onChange, error, placeholder }: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-45 mb-2">
        [ {label} ]
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full bg-transparent border-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-30 outline-none transition-colors duration-150  ${
          error
            ? 'border-red'
            : isFocused
            ? 'border-red'
            : 'border-ink-15 hover:border-ink-30'
        }`}
      />
      {error && (
        <p className="text-red text-[11px] font-mono mt-1.5">{error}</p>
      )}
    </div>
  );
}
