
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Load Spline viewer script
const splineScript = document.createElement('script');
splineScript.src = "https://unpkg.com/@splinetool/viewer@0.9.490/build/spline-viewer.js";
splineScript.type = "module";
document.head.appendChild(splineScript);

// Add global smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

createRoot(document.getElementById("root")!).render(<App />);
