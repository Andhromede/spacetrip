import React from 'react'
import emailjs from '@emailjs/browser';

const public_key = import.meta.env.VITE_APP_PUBLIC_KEY;
export default function emailJs() {
  return (
   emailjs.init(public_key)
  )
}
