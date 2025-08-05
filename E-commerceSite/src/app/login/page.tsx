'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!');

        const meRes = await fetch('/api/me', {
          credentials: 'include',
        });

        const me = await meRes.json();

        if (me?.loggedIn) {
          sessionStorage.setItem('loginSuccess', 'true');
          window.dispatchEvent(new Event('auth-changed'));
          await new Promise((r) => setTimeout(r, 300));
          window.location.reload();
        } else {
          toast.error('Login verification failed. Try again.');
        }
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f3edf7] to-[#e5d6ea] px-4"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#decbe4] p-10 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-[#4A154B] tracking-tight">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#4A154B] mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B] bg-[#FAF8FB]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4A154B] mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B] bg-[#FAF8FB]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#A97BA5] hover:bg-[#8E6796] text-white font-semibold rounded-lg shadow transition duration-200"
          >
            Log In
          </button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-2"
        >
          <p className="text-sm text-[#6D4B7E]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#8E6796] hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}



//admin underdevelop


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import toast from 'react-hot-toast';

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginMode, setLoginMode] = useState<'user' | 'admin'>('user');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//    if (loginMode === 'admin') {
//   if (email === 'admin@gmail.com' && password === 'admin123') {
//     toast.success('Admin login successful!');
//     document.cookie = "adminAuth=true; path=/"; 
//     router.push('/adminDashboard');
//   } else {
//     toast.error('Invalid admin credentials');
//   }
//   return;
// }

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include',
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success('Login successful!');

//         const meRes = await fetch('/api/me', {
//           credentials: 'include',
//         });

//         const me = await meRes.json();

//         if (me?.loggedIn) {
//           sessionStorage.setItem('loginSuccess', 'true');
//           window.dispatchEvent(new Event('auth-changed'));
//           await new Promise((r) => setTimeout(r, 300));
//           window.location.reload();
//         } else {
//           toast.error('Login verification failed. Try again.');
//         }
//       } else {
//         toast.error(data.error || 'Login failed');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       toast.error('Something went wrong');
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f3edf7] to-[#e5d6ea] px-4"
//     >
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#decbe4] p-10 space-y-6">
//         <h2 className="text-3xl font-extrabold text-center text-[#4A154B] tracking-tight">
//           {loginMode === 'admin' ? 'Admin Login' : 'Welcome Back'}
//         </h2>

//         {/* Toggle Button */}
//         <div className="flex justify-center gap-4 mb-4">
//           <button
//             type="button"
//             className={`px-4 py-2 rounded-lg text-sm font-semibold ${loginMode === 'user' ? 'bg-[#A97BA5] text-white' : 'bg-[#eee] text-[#4A154B]'}`}
//             onClick={() => setLoginMode('user')}
//           >
//             User Login
//           </button>
//           <button
//             type="button"
//             className={`px-4 py-2 rounded-lg text-sm font-semibold ${loginMode === 'admin' ? 'bg-[#A97BA5] text-white' : 'bg-[#eee] text-[#4A154B]'}`}
//             onClick={() => setLoginMode('admin')}
//           >
//             Admin Login
//           </button>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-sm font-semibold text-[#4A154B] mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B] bg-[#FAF8FB]"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-[#4A154B] mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B] bg-[#FAF8FB]"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-[#A97BA5] hover:bg-[#8E6796] text-white font-semibold rounded-lg shadow transition duration-200"
//           >
//             {loginMode === 'admin' ? 'Log In as Admin' : 'Log In'}
//           </button>
//         </form>

//         {loginMode === 'user' && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="text-center pt-2"
//           >
//             <p className="text-sm text-[#6D4B7E]">
//               Don&apos;t have an account?{' '}
//               <Link href="/signup" className="text-[#8E6796] hover:underline font-medium">
//                 Sign up here
//               </Link>
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// }
