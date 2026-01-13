# Deployment Configuration Guide

## Environment Variables Setup

### Frontend (Vercel)

You need to set the following environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

#### Required Variables:

- **`VITE_API_URL`**: Your Render backend URL
  - Example: `https://gigflow-hgsk.onrender.com`
  - This is used for all API requests (axios)

- **`VITE_SOCKET_URL`** (Optional): Your Render backend URL for Socket.IO
  - Example: `https://gigflow-hgsk.onrender.com`
  - If not set, it will use `VITE_API_URL` automatically
  - Should be the same as `VITE_API_URL` in most cases

#### Example Configuration:
```
VITE_API_URL=https://gigflow-hgsk.onrender.com
VITE_SOCKET_URL=https://gigflow-hgsk.onrender.com
```

**Important**: After adding environment variables in Vercel, you need to **redeploy** your application for the changes to take effect.

---

### Backend (Render)

You need to set the following environment variables in your Render service settings:

1. Go to your Render dashboard
2. Select your backend service
3. Navigate to **Environment** tab
4. Add the following variables:

#### Required Variables:

- **`MONGO_URI`**: Your MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

- **`JWT_SECRET`**: Secret key for JWT token generation
  - Use a strong random string
  - Example: `your-super-secret-jwt-key-here`

- **`CLIENT_URL`**: Your Vercel frontend URL(s)
  - For single URL: `https://your-app.vercel.app`
  - For multiple URLs (comma-separated): `https://app1.vercel.app,https://app2.vercel.app`
  - This is used for CORS configuration

- **`PORT`** (Optional): Server port
  - Render automatically sets this, but you can override if needed
  - Default: `5000`

#### Example Configuration:
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/gigflow
JWT_SECRET=your-jwt-secret-key-here
CLIENT_URL=https://gig-flow-sable.vercel.app
PORT=5000
```

**Important**: After adding environment variables in Render, the service will automatically restart.

---

## Common Issues and Solutions

### Issue 1: `ERR_CONNECTION_REFUSED` for Socket.IO
**Cause**: `VITE_SOCKET_URL` or `VITE_API_URL` not set in Vercel, causing fallback to `localhost:5000`

**Solution**: 
1. Set `VITE_API_URL` in Vercel environment variables
2. Redeploy your Vercel application

### Issue 2: 401 Unauthorized Errors
**Cause**: 
- API requests going to wrong URL (localhost instead of Render)
- Cookies not being sent due to CORS issues
- Backend not recognizing the frontend origin

**Solution**:
1. Ensure `VITE_API_URL` is set correctly in Vercel
2. Ensure `CLIENT_URL` in Render matches your Vercel URL exactly
3. Check that both frontend and backend have `withCredentials: true` (already configured)
4. Verify CORS settings in backend allow your Vercel domain

### Issue 3: CORS Errors
**Cause**: Frontend URL not in backend's allowed origins list

**Solution**:
1. Add your Vercel URL to `CLIENT_URL` in Render
2. The backend will automatically add it to allowed origins
3. Restart the Render service

### Issue 4: Socket.IO Connection Fails
**Cause**: 
- Wrong URL configuration
- CORS blocking Socket.IO handshake
- Backend not allowing the origin

**Solution**:
1. Set `VITE_SOCKET_URL` in Vercel (or ensure `VITE_API_URL` is set)
2. Ensure `CLIENT_URL` in Render includes your Vercel URL
3. Check backend logs in Render to see if CORS errors appear

---

## Verification Steps

After setting up environment variables:

1. **Frontend**:
   - Check browser console for any connection errors
   - Verify API calls are going to Render URL (not localhost)
   - Check Network tab to see actual request URLs

2. **Backend**:
   - Check Render logs for startup messages
   - Verify "Allowed origins" log shows your Vercel URL
   - Check for any CORS errors in logs

3. **Test**:
   - Try logging in from production frontend
   - Check if Socket.IO connects (if used)
   - Verify API endpoints respond correctly

---

## Quick Checklist

- [ ] `VITE_API_URL` set in Vercel → Points to Render backend URL
- [ ] `VITE_SOCKET_URL` set in Vercel (optional) → Points to Render backend URL
- [ ] `CLIENT_URL` set in Render → Points to Vercel frontend URL
- [ ] `MONGO_URI` set in Render → Valid MongoDB connection string
- [ ] `JWT_SECRET` set in Render → Strong secret key
- [ ] Frontend redeployed after adding environment variables
- [ ] Backend restarted after adding environment variables
- [ ] Tested login/authentication in production
- [ ] Verified Socket.IO connection (if applicable)

