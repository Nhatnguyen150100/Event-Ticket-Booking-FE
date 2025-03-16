import React from 'react'
import { useParams } from 'react-router-dom';


export default function EventDetail() {
  const { id: eventId } = useParams<{ id: string }>();
  return (
    <div>EventDetail</div>
  )
}