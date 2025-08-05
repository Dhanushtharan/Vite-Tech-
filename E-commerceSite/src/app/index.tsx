import Image from 'next/image';

export default function TestImagePage() {
  return (
    <main style={{ padding: 20, width: 400, height: 300, position: 'relative' }}>
      <h1>Next.js Image Test</h1>
      <Image
        src="/banner/men.jpg"
        alt="Men Banner"
        fill
        style={{ objectFit: 'cover' }}
      />
    </main>
  );
}
