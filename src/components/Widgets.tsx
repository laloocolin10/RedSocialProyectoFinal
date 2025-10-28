export default function Widgets() {
  return (
    <aside className="h-screen sticky top-0 p-4 hidden lg:block">
      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-white font-bold text-xl mb-4">Qué está pasando</h2>
        {/* Aquí irían las tendencias */}
        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-sm">Tendencia en México</p>
            <p className="text-white font-bold">#React</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Tecnología · Tendencia</p>
            <p className="text-white font-bold">#TailwindCSS</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Desarrollo Web · Tendencia</p>
            <p className="text-white font-bold">#Vite</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
