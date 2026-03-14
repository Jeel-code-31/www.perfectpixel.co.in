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
    router.push(pathname + (query ? `?${query}` : ""), { scroll: false })
  }

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-10 mb-8 sm:mb-10 items-center">
      {/* "All Works" button */}
      <button
        onClick={() => handleFilterChange(null)}
        className={`group relative tracking-[0.20em] uppercase text-[10px] transition-colors duration-300 py-2
          ${!currentCategory 
            ? 'font-bold text-[#AC9148]' 
            : 'text-black hover:text-[#AC9148]'
          }`}
      >
        All Works
        {/* Underline for All Works */}
        <span
          className={`absolute bottom-0 left-0 h-[1.5px] bg-[#AC9148] transition-all duration-500 ease-out
            ${!currentCategory ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}
          `}
        />
      </button>

      {categories.map((category) => {
        const isActive = currentCategory === category.slug.current

        return (
          <button
            key={category._id}
            onClick={() => handleFilterChange(category.slug.current)}
            className={`
              group relative mt-10 transition-all duration-300 uppercase text-[10px] tracking-[0.25em]
              ${isActive
                ? 'text-[#AC9148] font-bold'
                : 'text-black hover:text-[#AC9148]/300 text-2xl'
              }
            `}
          >
            {category.title}

            {/* THE GOLDEN LINE ANIMATION */}
            <span
              className={`
                absolute bottom-0 left-0 h-[1.5px] bg-[#AC9148] transition-all duration-500 ease-out
                ${isActive
                  ? 'w-full opacity-100'
                  : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }
              `}
            />
          </button>
        )
      })}
    </div>
  )
}