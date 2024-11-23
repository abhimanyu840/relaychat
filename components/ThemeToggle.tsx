"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [hydrated, setHydrated] = React.useState(false)

    React.useEffect(() => {
        setHydrated(true)
    }, [])


    return (
        hydrated && <>
            <div>
                <Button variant="outline" className="p-2" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {theme === "light" && <Moon className=" w-5 h-5 " />}
                    {theme === "dark" && <Sun className=" w-5 h-5 " />}
                </Button>
            </div>
        </>
    )
}
