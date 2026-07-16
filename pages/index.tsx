import type { FormEvent } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Row,
  Spacer,
  Text,
  useToast
} from "@nextui-org/react";

const DEMO_EMAIL = "demo@nextui.dev";
const DEMO_PASSWORD = "nextui-rocks";

const simulateAuth = (email: string, password: string) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        resolve();
      } else {
        reject(new Error("Invalid credentials. Try demo@nextui.dev / nextui-rocks."));
      }
    }, 900);
  });

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

const LoginPage = () => {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);

    const nextErrors: typeof errors = {};

    if (!email.trim()) {
      nextErrors.email = "Please provide an email address.";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "That doesn't look like a valid email address.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setSubmitting(true);

    try {
      await simulateAuth(email, password);
      toast({
        title: "Welcome back!",
        description: "You've signed in with the demo experience.",
        variant: "solid"
      });
      setFormMessage("You are signed in. We'll keep you logged in for future visits.");
    } catch (error) {
      setFormMessage((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-layout">
      <Card className="login-card" isHoverable variant="bordered">
        <Card.Body>
          <Text h3>Sign in to your workspace</Text>
          <Text className="login-subtitle" size="$sm">
            A minimalist login form built with Next.js and Next UI so you can focus on the essentials.
          </Text>

          <Spacer y={1} />

          <form onSubmit={handleSubmit} noValidate>
            <Input
              clearable
              label="Email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              status={errors.email ? "error" : "default"}
              helperText={errors.email ?? "We will never sell your data."}
              helperColor={errors.email ? "error" : "default"}
              aria-describedby="email-helper"
              autoComplete="email"
              isDisabled={submitting}
            />

            <Input
              clearable
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              status={errors.password ? "error" : "default"}
              helperText={errors.password ?? "Use at least 8 characters."}
              helperColor={errors.password ? "error" : "default"}
              aria-describedby="password-helper"
              autoComplete="current-password"
              isDisabled={submitting}
            />

            <Row align="center">
              <Checkbox
                isSelected={remember}
                onChange={(event) => setRemember(event.target.checked)}
                isDisabled={submitting}
                size="sm"
                aria-label="Remember me checkbox"
              >
                Remember me
              </Checkbox>
              <Spacer x={0.5} />
              <Text size="$sm" color="secondary">
                Keep me signed in for 30 days
              </Text>
            </Row>

            <Spacer y={0.5} />

            <Button type="submit" size="lg" isDisabled={submitting} isLoading={submitting} css={{ gap: "$4" }}>
              Sign in
            </Button>

            {formMessage && (
              <Text className="form-error" role="status" aria-live="polite">
                {formMessage}
              </Text>
            )}

            <Row justify="space-between" css={{ paddingTop: "$2" }}>
              <Text size="$sm" color="secondary">
                Try {DEMO_EMAIL} / {DEMO_PASSWORD}
              </Text>
              <Text size="$sm" color="secondary">
                Forgot password?
              </Text>
            </Row>
          </form>
        </Card.Body>
      </Card>
    </main>
  );
};

export default LoginPage;
