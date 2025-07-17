import React, { useContext } from 'react';
import ThemeContext from './themeContext';

export function Themes() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: theme === 'light' ? 'white' : '#333',
                color: theme === 'light' ? 'black' : 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem',
            }}
        >
            Theme is "{theme}" — Switch
        </button>
    );
}





// import React from 'react';
// import ThemeContext from './themeContext';

// export function Themes() {
//   return (
//     <ThemeContext.Consumer>
//       {({ theme, setTheme }) => (
//         <div style={{ marginTop: '1rem' }}>
//           <p>Current Theme: <strong>{theme}</strong></p>

//           <button
//             onClick={() => setTheme('light')}
//             style={{
//               marginRight: '10px',
//               backgroundColor: '#f0f0f0',
//               padding: '8px 16px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: theme === 'light' ? 'bold' : 'normal',
//             }}
//           >
//             Light Theme
//           </button>

//           <button
//             onClick={() => setTheme('dark')}
//             style={{
//               backgroundColor: '#333',
//               color: '#fff',
//               padding: '8px 16px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: theme === 'dark' ? 'bold' : 'normal',
//             }}
//           >
//             Dark Theme
//           </button>
//         </div>
//       )}
//     </ThemeContext.Consumer>
//   );
// }
