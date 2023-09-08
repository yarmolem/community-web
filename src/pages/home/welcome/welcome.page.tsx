import MainMap from '@/components/shared/main-map'
import GlassBox from '@/components/shared/glass-box'

const CATEGORIES = [
  { id: 1, name: 'Psicología Clínica' },
  { id: 2, name: 'Psicología del Deporte' },
  { id: 3, name: 'Psicología Educativa' },
  { id: 4, name: 'Psicología Social' },
  { id: 5, name: 'Neuropsicología' },
  { id: 6, name: 'Psicología Forense' },
  { id: 7, name: 'Psicología de la Salud' },
  { id: 8, name: 'Psicología Organizacional' },
  { id: 9, name: 'Psicología Infantil' },
  { id: 10, name: 'Psicología Gerontológica' },
  { id: 11, name: 'Psicología Transpersonal' },
  { id: 12, name: 'Terapia Cognitivo-Conductual' },
  { id: 13, name: 'Terapia Gestalt' },
  { id: 14, name: 'Terapia Psicoanalítica' },
  { id: 15, name: 'Terapia Familiar' },
  { id: 16, name: 'Terapia de Juego' },
  { id: 17, name: 'Terapia de Arte' },
  { id: 18, name: 'Otras Categorías de Psicología' }
]

const WelcomePage = () => {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 p-8 flex items-center overflow-x-auto max-w-[100vw] sm:max-w-[calc(100vw_-_218px)] gap-3 no-scrollbar">
        {CATEGORIES.map((category) => (
          <GlassBox
            asChild
            key={category.id}
            className="hover:bg-opacity-40 transition-colors duration-300"
          >
            <button className="py-2 px-3 text-xs text-white flex items-center gap-2 font-semibold uppercase whitespace-nowrap">
              {category.name}
            </button>
          </GlassBox>
        ))}
      </div>

      <MainMap />
    </>
  )
}

export default WelcomePage
