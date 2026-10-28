import { useEffect, useRef, useState } from "react";
import type { ClipboardEvent, FormEvent, KeyboardEvent, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import { fieldClass, labelClass } from "../../../shared/components/layout/DemoPage";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}

function AuthShell({ eyebrow, title, subtitle, icon, children }: AuthShellProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-xl border border-app-border bg-app-surface shadow-sm">
          <div className="relative border-b border-app-border bg-accent/10 px-6 py-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent" />
            <div className="relative flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/40 bg-app-surface text-accent-light">
                {icon}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  {eyebrow}
                </p>
                <h1 className="mt-1 text-lg font-semibold text-text-primary">{title}</h1>
                <p className="mt-1 text-xs leading-5 text-text-muted">{subtitle}</p>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-7">{children}</div>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-text-dim">
          <ShieldCheck size={13} className="text-green-500" />
          Secured with 256-bit encryption
        </p>
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
  hint?: string;
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  hint,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className={`${labelClass} flex items-center justify-between`}>
        <span>{label}</span>
        {hint && <span className="font-normal text-text-dim">{hint}</span>}
      </label>
      <div className="relative">
        <Lock
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
        />
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${fieldClass} pl-9 pr-10`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-text-muted transition hover:text-text-primary"
        >
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
}

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}

function Checkbox({ checked, onChange, children }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer select-none items-start gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-app-border bg-app-bg text-white transition peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-1 peer-focus-visible:ring-accent">
        {checked && <Check size={11} strokeWidth={3} />}
      </span>
      <span className="text-xs leading-5 text-text-muted">{children}</span>
    </label>
  );
}

function Divider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-app-border" />
      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-dim">
        or continue with
      </span>
      <span className="h-px flex-1 bg-app-border" />
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 py-2.5 text-xs font-medium text-text-primary transition hover:bg-app-hover"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-app-hover text-[10px] font-bold text-text-primary">
          G
        </span>
        Google
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-app-border bg-app-bg px-3 py-2.5 text-xs font-medium text-text-primary transition hover:bg-app-hover"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-app-hover text-[10px] font-bold text-text-primary">
          A
        </span>
        Apple
      </button>
    </div>
  );
}

function FooterLink({ prompt, action }: { prompt: string; action: string }) {
  return (
    <p className="mt-5 text-center text-xs text-text-muted">
      {prompt}{" "}
      <a
        href="#"
        onClick={(event) => event.preventDefault()}
        className="font-medium text-accent-light hover:underline"
      >
        {action}
      </a>
    </p>
  );
}

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your workspace"
      subtitle="Use your credentials to continue into the admin demo."
      icon={<Lock size={20} />}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signin-email" className={labelClass}>
            Email address
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
            />
            <input
              id="signin-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>

        <PasswordField
          id="signin-password"
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-3">
          <Checkbox checked={remember} onChange={setRemember}>
            Remember me
          </Checkbox>
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="text-xs font-medium text-accent-light hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Sign in
          <ArrowRight size={15} />
        </button>

        {submitted && (
          <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-500">
            <Check size={14} />
            Demo sign-in captured. No credentials were sent.
          </div>
        )}
      </form>

      <Divider />
      <SocialButtons />

      <FooterLink prompt="Don't have an account?" action="Create one" />
    </AuthShell>
  );
}

export function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mismatch = confirmPassword.length > 0 && confirmPassword !== password;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreed || mismatch) return;
    setSubmitted(true);
  };

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Spin up a workspace and explore every page in the demo."
      icon={<User size={20} />}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="signup-first-name" className={labelClass}>
              First name
            </label>
            <input
              id="signup-first-name"
              type="text"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Ada"
              autoComplete="given-name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="signup-last-name" className={labelClass}>
              Last name
            </label>
            <input
              id="signup-last-name"
              type="text"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Lovelace"
              autoComplete="family-name"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className={labelClass}>
            Email address
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
            />
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>

        <PasswordField
          id="signup-password"
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Create a password"
          autoComplete="new-password"
          hint="8+ characters"
        />

        <div>
          <PasswordField
            id="signup-confirm-password"
            label="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Repeat your password"
            autoComplete="new-password"
          />
          {mismatch && (
            <p className="mt-1.5 text-[11px] text-red-500">Passwords do not match.</p>
          )}
        </div>

        <Checkbox checked={agreed} onChange={setAgreed}>
          I agree to the Terms of Service and Privacy Policy.
        </Checkbox>

        <button
          type="submit"
          disabled={!agreed || mismatch}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create account
          <ArrowRight size={15} />
        </button>

        {submitted && (
          <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-500">
            <Check size={14} />
            Demo account created. Nothing was submitted.
          </div>
        )}
      </form>

      <Divider />
      <SocialButtons />

      <FooterLink prompt="Already have an account?" action="Sign in" />
    </AuthShell>
  );
}

export function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Reset your password"
      subtitle="We will email you a secure link to choose a new password."
      icon={<KeyRound size={20} />}
    >
      {sent ? (
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/15 text-green-500">
            <Check size={22} />
          </div>
          <h2 className="mt-4 text-base font-semibold text-text-primary">Check your inbox</h2>
          <p className="mt-2 text-sm text-text-muted">
            Reset instructions were sent to{" "}
            <span className="font-medium text-text-primary">{email}</span>.
          </p>
          <p className="mt-2 text-xs text-text-dim">
            The link expires in 30 minutes. Check your spam folder if it does not arrive.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-5 w-full rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary transition hover:bg-app-hover"
          >
            Use a different email
          </button>
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent-light hover:underline"
          >
            <ArrowLeft size={13} />
            Back to sign in
          </a>
        </div>
      ) : (
        <>
          <p className="text-sm leading-6 text-text-muted">
            Enter the email address linked to your account and we will send you a reset link.
          </p>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="reset-email" className={labelClass}>
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
                />
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={`${fieldClass} pl-9`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Send reset link
              <ArrowRight size={15} />
            </button>
          </form>

          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="mt-5 flex items-center justify-center gap-1.5 text-xs font-medium text-accent-light hover:underline"
          >
            <ArrowLeft size={13} />
            Back to sign in
          </a>
        </>
      )}
    </AuthShell>
  );
}

export function TwoStepVerificationPage() {
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length: 6 }, () => ""));
  const [seconds, setSeconds] = useState(30);
  const [verified, setVerified] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  const code = digits.join("");

  const handleChange = (index: number, value: string) => {
    const character = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = character;
    setDigits(next);
    if (character && index < digits.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      inputs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < digits.length - 1) {
      event.preventDefault();
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    const next = Array.from({ length: 6 }, (_, index) => pasted[index] ?? "");
    setDigits(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const resend = () => {
    setSeconds(30);
    setDigits(Array.from({ length: 6 }, () => ""));
    setVerified(false);
    inputs.current[0]?.focus();
  };

  return (
    <AuthShell
      eyebrow="Security check"
      title="Two-step verification"
      subtitle="Confirm the one-time code from your authenticator to finish signing in."
      icon={<Smartphone size={20} />}
    >
      <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-app-border bg-app-bg px-3 py-2.5">
        <Smartphone size={15} className="text-accent-light" />
        <div>
          <p className="text-[10px] uppercase tracking-wider text-text-dim">Code sent to</p>
          <p className="text-xs font-medium text-text-primary">+1 (555) 000-1234</p>
        </div>
      </div>

      <p className="text-sm leading-6 text-text-muted">
        Enter the 6-digit code from your authenticator app. Each code can be used once.
      </p>

      <div className="mt-4 flex items-center gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${index + 1} of 6`}
            className="h-12 min-w-0 flex-1 rounded-lg border border-app-border bg-app-bg text-center text-lg font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-text-dim">Didn't receive the code?</span>
        {seconds > 0 ? (
          <span className="font-medium text-text-secondary">Resend in {seconds}s</span>
        ) : (
          <button
            type="button"
            onClick={resend}
            className="font-medium text-accent-light hover:underline"
          >
            Resend code
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => code.length === 6 && setVerified(true)}
        disabled={code.length !== 6}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShieldCheck size={15} />
        Verify code
      </button>

      {verified && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-500">
          <Check size={14} />
          Code verified. This is a demo, no request was sent.
        </div>
      )}

      <a
        href="#"
        onClick={(event) => event.preventDefault()}
        className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-accent-light hover:underline"
      >
        <ArrowLeft size={13} />
        Back to sign in
      </a>
    </AuthShell>
  );
}
