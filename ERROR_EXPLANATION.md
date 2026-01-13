# Error Explanation and Fixes

## Errors You're Seeing

### 1. `ERR_CONNECTION_REFUSED` for `localhost:5000/socket.io/`

**What it means:**
- Your frontend is trying to connect to `http://localhost:5000` (your local development server)
- In production (Vercel), there is no server running on localhost:5000
- This happens because the environment variable `VITE_SOCKET_URL` (or `VITE_API_URL`) is not set in Vercel

**Why it happens:**
- The code has a fallback: `import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'`
- When the environment variable is missing, it defaults to localhost
- This works fine in development but fails in production

**Fix:**
1. Go to Vercel dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://gigflow-hgsk.onrender.com`
3. Add: `VITE_SOCKET_URL` = `https://gigflow-hgsk.onrender.com` (optional, will use API_URL if not set)
4. **Redeploy** your application

---

### 2. `401 Unauthorized` for `/api/gigs/my-gigs`

**What it means:**
- The server is rejecting your request because you're not authenticated
- This could be because:
  1. The request is going to the wrong URL (localhost instead of Render)
  2. Cookies are not being sent properly
  3. The authentication token/cookie is missing or invalid

**Why it happens:**
- If `VITE_API_URL` is not set, API calls go to `localhost:5000` which doesn't exist in production
- Even if the URL is correct, cookies might not work if CORS is misconfigured
- The backend might not recognize your Vercel domain as an allowed origin

**Fix:**
1. Set `VITE_API_URL` in Vercel (same as above)
2. In Render, set `CLIENT_URL` = your Vercel URL (e.g., `https://gig-flow-sable.vercel.app`)
3. Ensure both frontend and backend have `withCredentials: true` (already configured)
4. Redeploy both frontend and backend

---

## Root Cause Summary

The main issue is **missing environment variables in production**:

1. **Frontend (Vercel)** needs:
   - `VITE_API_URL` → Your Render backend URL
   - `VITE_SOCKET_URL` → Your Render backend URL (optional)

2. **Backend (Render)** needs:
   - `CLIENT_URL` → Your Vercel frontend URL
   - `MONGO_URI` → MongoDB connection string
   - `JWT_SECRET` → Secret for JWT tokens

---

## What I Fixed in the Code

1. **Updated `socket.js`**:
   - Now uses `VITE_API_URL` as fallback if `VITE_SOCKET_URL` is not set
   - Added explicit transport methods for better compatibility

2. **Updated `backend/index.js`**:
   - Made CORS more flexible to handle multiple client URLs
   - Supports comma-separated URLs in `CLIENT_URL` environment variable

3. **Created `DEPLOYMENT.md`**:
   - Complete guide for setting up environment variables
   - Troubleshooting steps for common issues

---

## Next Steps

1. **Set Environment Variables** (see DEPLOYMENT.md for details):
   - Vercel: Add `VITE_API_URL` and `VITE_SOCKET_URL`
   - Render: Ensure `CLIENT_URL` is set correctly

2. **Redeploy**:
   - Vercel: Trigger a new deployment (or push a commit)
   - Render: Restart the service if needed

3. **Test**:
   - Open your production frontend
   - Check browser console - errors should be gone
   - Try logging in and using the app

4. **Verify**:
   - Check Network tab in browser DevTools
   - API calls should go to `gigflow-hgsk.onrender.com` (not localhost)
   - Socket.IO should connect to Render URL

---

## Quick Fix Checklist

- [ ] Add `VITE_API_URL=https://gigflow-hgsk.onrender.com` in Vercel
- [ ] Add `VITE_SOCKET_URL=https://gigflow-hgsk.onrender.com` in Vercel (optional)
- [ ] Verify `CLIENT_URL` in Render matches your Vercel URL
- [ ] Redeploy Vercel application
- [ ] Check Render logs to ensure backend is running
- [ ] Test in production browser

After completing these steps, all errors should be resolved!

