export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you are looking for may have moved.</p>
      <a className="mt-8 inline-block font-bold text-orange-700 underline" href="/">
        Return to ApexGutters
      </a>
    </main>
  );
}
