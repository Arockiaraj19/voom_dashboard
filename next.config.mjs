
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
   
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'riderstroagedev.s3.me-south-1.amazonaws.com',
         
        }
      ],
     
  },
    reactStrictMode: true,
  };
  
  export default nextConfig;
  