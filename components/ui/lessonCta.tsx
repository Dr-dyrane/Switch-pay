"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle, Play, Repeat, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Lesson {
    id: number
}

interface Progress {
    completedLessons: Set<number>
    streak: number
    points: number
}

interface isRead {
    [lessonId: number]: boolean; // Maps each lessonId to a boolean value indicating if it’s read
}

interface LessonCtaProps {
    lesson: Lesson
    progress: Progress
    handleStartLesson: () => void
    handleLessonCompletion: (lessonId: number) => void
    isRead: isRead
}

export function LessonCta({ lesson, progress, handleStartLesson, handleLessonCompletion, isRead }: LessonCtaProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [loading, setLoading] = useState(false)  // Loading state to manage loading phase
    const isCompleted = progress.completedLessons.has(lesson.id)
    const readStatus = isRead[lesson.id] || false;

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    }

    const iconVariants = {
        initial: { rotate: 0 },
        hover: { rotate: 15 },
    }

    // Handling loading state during lesson start
    const handleStartClick = async () => {
        setLoading(true)
        handleStartLesson()
        setLoading(false)
    }

    // Handling lesson completion with loading phase
    const handleCompleteClick = async () => {
        setLoading(true)
        handleLessonCompletion(lesson.id)
        setLoading(false)
    }

    return (
        <TooltipProvider>
            <div className="mt-6 space-y-4">
                <motion.div
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className="w-full group bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground hover:from-secondary hover:via-primary hover:to-primary transition-all duration-300"
                                onClick={handleStartClick}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                disabled={loading}  // Disable button while loading
                            >
                                <span className="mr-2">
                                    {isCompleted ? "Revisit Lesson" : "Start Lesson"}
                                </span>
                                <motion.div variants={iconVariants}>
                                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : isCompleted ? <Repeat className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                </motion.div>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-popover text-popover-foreground">
                            {isCompleted ? "Review the lesson" : "Begin your learning journey"}
                        </TooltipContent>
                    </Tooltip>
                </motion.div>

                <AnimatePresence>
                    {readStatus && !isCompleted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="w-full group bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-all duration-300"
                                        onClick={handleCompleteClick}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        disabled={loading}  // Disable button while loading
                                    >
                                        <motion.div
                                            className="flex items-center justify-center w-full"
                                            initial={{ x: 0 }}
                                            animate={{ x: isHovered ? 10 : 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle className="h-5 w-5 mr-2" />}
                                            <span>{loading ? "Processing..." : "Mark as Complete"}</span>
                                        </motion.div>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="bg-popover text-popover-foreground">
                                    Click to mark the lesson as complete
                                </TooltipContent>
                            </Tooltip>
                        </motion.div>
                    )}
                </AnimatePresence>

                {isCompleted && (
                    <motion.div
                        className="text-center text-sm text-muted-foreground"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <CheckCircle className="h-5 w-5 text-green-500 inline-block mr-2" />
                        Lesson completed
                    </motion.div>
                )}
            </div>
        </TooltipProvider>
    )
}
