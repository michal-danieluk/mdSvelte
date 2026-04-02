import { ImageResponse } from '@vercel/og'
import { firstName, lastName } from '$lib/info'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const title = url.searchParams.get('title') || 'Michał Danieluk'
  
  // Design Twojej karty OG w stylu Zinc/Indigo (Premium SaaS)
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#09090b', // Zinc-950
          backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              height: '40px',
              width: '4px',
              backgroundColor: '#4f46e5', // Indigo-600
              marginRight: '20px',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              fontWeight: '900',
              letterSpacing: '-0.05em',
              color: 'white',
              textTransform: 'uppercase',
            }}
          >
            {firstName}<span style={{ color: '#4f46e5' }}>.</span>{lastName.charAt(0)}
          </div>
        </div>

        <div
          style={{
            fontSize: '80px',
            fontWeight: '900',
            lineHeight: '1.1',
            letterSpacing: '-0.05em',
            color: 'white',
            maxWidth: '900px',
            marginBottom: '40px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#a1a1aa', // Zinc-400
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Marketing • Automation • AI
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
