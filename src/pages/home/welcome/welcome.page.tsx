import MainMap from '@/components/shared/main-map'
import GlassBox from '@/components/shared/glass-box'

const CATEGORIES = [
  {
    id: 1,
    name: 'Psicólogo Infantil'
  },
  {
    id: 2,
    name: 'Depresión'
  },
  {
    id: 3,
    name: 'Terapia'
  },
  {
    id: 4,
    name: 'Psicólogo Infantil'
  }
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
