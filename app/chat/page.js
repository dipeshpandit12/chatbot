'use client'
import { useContext, useState, useRef, useEffect } from 'react'
import { FormContext } from '@/context/FormContext'
import Image from 'next/image'
import "./style.css"

export default function Chat() {
    const { formData } = useContext(FormContext)
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const chatContainerRef = useRef(null)

    const generateInitialMessage = () => {
        const platforms = Object.entries(formData.socialPlatforms)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(', ')

        return {
            role: 'assistant',
            content: `Hello! I understand you're looking to establish a web presence for your ${formData.industry} business. 
Based on your profile:
• Your business has ${formData.employeeRange} employees
• You're located in ${formData.location}
• You have ${getExperienceLevel(formData.socialMediaExp)} experience with social media
${platforms ? `• Currently using: ${platforms}` : ''}
Would you like assistance creating a business website?
`
        }
    }

    const getExperienceLevel = (level) => {
        const levels = {
            1: 'beginner',
            2: 'basic',
            3: 'intermediate',
            4: 'advanced',
            5: 'expert'
        }
        return levels[level] || 'intermediate'
    }

    useEffect(() => {
        setMessages([generateInitialMessage()])
    }, [])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!inputMessage.trim()) return
    
        // Create user message object
        const userMessage = {
            role: 'user',
            content: inputMessage
        }
    
        // First update messages with user input
        setMessages(prev => [...prev, userMessage])
        setInputMessage('')
        setIsLoading(true)
    
        // Create a temporary array with message history including new user message
        const updatedMessages = [...messages, userMessage]
    
        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    formData: formData,
                    messageHistory: updatedMessages // Send updated message history
                })
            })
    
            const data = await response.json()
            
            // Then update with assistant's response
            const assistantMessage = {
                role: 'assistant',
                content: data.response
            }
    
            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('Error:', error)
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F5DC] font-['Lora']">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                    {/* Chat Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Website Development Assistant
                        </h1>
                        <p className="text-gray-600">
                            Let&apos;s create your perfect website strategy
                        </p>
                    </div>

                    {/* Chat Messages */}
                    <div 
                        className="bg-slate-50 rounded-lg p-4 mb-6 h-[500px] overflow-y-auto"
                        ref={chatContainerRef}
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 flex ${
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div className={`flex items-start max-w-[80%] ${
                                    message.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg' 
                                        : 'bg-white border border-gray-200 rounded-r-lg rounded-bl-lg'
                                } p-4 shadow-sm`}>
                                    {message.role === 'assistant' && (
                                        <div className="mr-3 flex-shrink-0">
                                            <Image
                                                src="/chatbot.png"
                                                alt="Bot"
                                                width={24}
                                                height={24}
                                                className="rounded-full"
                                            />
                                        </div>
                                    )}
                                    <div className={`${
                                        message.role === 'user' ? 'text-white' : 'text-gray-800'
                                    }`}>
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                    <div className="typing-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="flex-1 px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200 disabled:bg-blue-400"
                            disabled={isLoading}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}