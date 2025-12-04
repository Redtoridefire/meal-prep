// MACRO COMMAND - Pre-populated Nutrition Dashboard
// Ready for Vercel deployment

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #00f5ff 0%, #00ff88 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem',
        letterSpacing: '4px'
      }}>
        MACRO COMMAND
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#888', marginBottom: '2rem' }}>
        Ultra-Modern Nutrition Dashboard
      </p>
      <div style={{
        background: 'rgba(30, 30, 45, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '600px'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#00f5ff' }}>✅ Setup Complete!</h2>
        <p style={{ color: '#ccc', lineHeight: '1.6' }}>
          Your Macro Command dashboard is ready. This placeholder will be replaced with the full dashboard once you complete the setup:
        </p>
        <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: '#888', lineHeight: '1.8' }}>
          <li>Copy the full dashboard component to this file</li>
          <li>Install dependencies: <code style={{background: '#000', padding: '0.25rem 0.5rem', borderRadius: '4px'}}>npm install</code></li>
          <li>Run locally: <code style={{background: '#000', padding: '0.25rem 0.5rem', borderRadius: '4px'}}>npm run dev</code></li>
          <li>Deploy to Vercel</li>
        </ol>
      </div>
    </div>
  )
}
