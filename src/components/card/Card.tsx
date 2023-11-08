import React from 'react'

interface CardProps {
    children: React.ReactNode
}

const Card = ({children}: CardProps) => {
  return (
    <div className='p-3 rounded-md bg-card text-card-foreground shadow'>
         {children}
    </div>
  )
}

export default Card