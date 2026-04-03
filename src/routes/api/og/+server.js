import { ImageResponse } from '@vercel/og'
import { firstName, lastName } from '$lib/info'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const title = url.searchParams.get('title') || 'Michał Danieluk'
  
  // Przepisane na czyste obiekty JS, aby uniknąć błędów kompilacji JSX w pliku .js
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
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
        },
        children: [
          // Logo/Header
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      height: '40px',
                      width: '4px',
                      backgroundColor: '#4f46e5', // Indigo-600
                      marginRight: '20px',
                    }
                  }
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      fontWeight: '900',
                      letterSpacing: '-0.05em',
                      color: 'white',
                      display: 'flex',
                    },
                    children: [
                      firstName,
                      {
                        type: 'span',
                        props: {
                          style: { color: '#4f46e5' },
                          children: '.'
                        }
                      },
                      lastName.charAt(0)
                    ]
                  }
                }
              ]
            }
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                fontSize: '80px',
                fontWeight: '900',
                lineHeight: '1.1',
                letterSpacing: '-0.05em',
                color: 'white',
                maxWidth: '900px',
                marginBottom: '40px',
                display: 'flex',
              },
              children: title
            }
          },
          // Footer
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#a1a1aa', // Zinc-400
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    },
                    children: 'Marketing • Automation • AI'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
    }
  )
}
