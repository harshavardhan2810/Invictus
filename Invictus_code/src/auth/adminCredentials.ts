// FRONTEND-ONLY DEMO AUTH. Anything bundled into the browser can be read by
// visitors, so these credentials protect nothing on a public deployment.
// Before going live, replace `verifyAdminCredentials` with a backend login
// (e.g. POST /auth/login that sets an httpOnly session cookie) and have the
// API enforce admin access on every admissions endpoint.

const DEMO_USERNAME = 'admin'
const DEMO_PASSWORD = 'Invictus@2027'

const configuredUsername = import.meta.env.VITE_ADMIN_USERNAME
const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD

export const isUsingDemoCredentials = !configuredUsername || !configuredPassword

export const demoCredentials = { username: DEMO_USERNAME, password: DEMO_PASSWORD }

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUsername = isUsingDemoCredentials ? DEMO_USERNAME : configuredUsername
  const expectedPassword = isUsingDemoCredentials ? DEMO_PASSWORD : configuredPassword
  return username.trim().toLowerCase() === expectedUsername?.toLowerCase() && password === expectedPassword
}
