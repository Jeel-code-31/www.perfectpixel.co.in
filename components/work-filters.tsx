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
                  relative px-4 py-2 border transition-all duration-300 uppercase text-[10px] tracking-[0.2em]
                ${isActive
                ? 'border-[#AC9148] text-[#AC9148] font-bold bg-[#AC9148]/5'
                : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600'
              }
                `}
          >
            {category.title}
          </button>
          )}
      )}
    </div>
  )
}