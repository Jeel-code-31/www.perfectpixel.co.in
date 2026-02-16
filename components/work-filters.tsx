"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

interface WorksFiltersProps {
  categories: Array<{
    _id: string
    title: string
    slug: { current: string }
  }>
}

export function WorksFilters({ categories }: WorksFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get the current active category from the URL
  const currentCategory = searchParams.get("category")

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleFilterChange = (categorySlug: string | null) => {
    const query = createQueryString("category", categorySlug)
    // Updates the URL: e.g., /works?category=branding
    router.push(pathname + (query ? `?${query}` : ""), { scroll: false })
  }

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8 mb-8 sm:mb-10 items-center">
      {/* "All Works" button - clicking this removes the "category" param */}
      <button
        onClick={() => handleFilterChange(null)}
        className={`tracking-[0.20em] uppercase text-xs transition-colors ${!currentCategory ? 'font-bold text-white' : 'text-gray-400 hover:text-[#AC9148]'
          }`}
      >
        All Works
      </button>

      {categories.map((category) => {
        const isActive = currentCategory === category.slug.current

        return (
          <button
            key={category._id}
            onClick={() => handleFilterChange(category.slug.current)}
            className={`
    group relative px-6 py-3 transition-all duration-500 uppercase text-[10px] tracking-[0.3em]
    ${isActive
                ? 'text-[#AC9148] font-bold'
                : 'text-white hover:text-[#AC9148]' // Changed from white/40 to solid white
              }
  `}
          >
            {category.title}

            {/* THE GOLDEN LINE ANIMATION */}
            <span
              className={`
      absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#AC9148] transition-all duration-500 ease-out
      ${isActive
                  ? 'w-full opacity-100'
                  : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }
    `}
            />
          </button>
        )
      }
      )}
    </div>
  )
}