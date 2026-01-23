import { redirect } from 'next/navigation'

const Redirect = () => {
  redirect('/')
  
  return (
    <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            fbq('track', 'CompleteRegistration');
            `,
          }}
        />
    </>
  )
}

export default Redirect