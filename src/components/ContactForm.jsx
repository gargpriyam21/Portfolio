import { useState } from 'react'
import { Send } from 'lucide-react'
import { profile } from '../data/profile.js'

// Contact form for a static site. It posts to the form service endpoint set in
// profile.contact.formEndpoint (for example a Formspree URL), which forwards the
// message to your inbox without exposing your email address on the page.
// With no endpoint set the form is not rendered at all.
const field =
  'mt-2 w-full rounded-xl border border-line-strong bg-transparent px-4 py-3 text-paper placeholder:text-fog/70 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent/40'

export default function ContactForm() {
  const endpoint = profile.contact.formEndpoint
  const previewOnly = !endpoint && import.meta.env.VITE_FORM_PREVIEW === '1'
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | preview

  if (!endpoint && !previewOnly) return null

  async function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (previewOnly) {
      setStatus('preview')
      return
    }
    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Request failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const messages = {
    sent: 'Message sent. Thank you, I will get back to you soon.',
    error: 'Message not sent. Check your connection and try again, or reach me on LinkedIn.',
    preview: 'This is a preview. The form is not connected to an inbox yet.',
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line surface p-6 sm:p-8" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block font-medium text-paper">
          Your name
          <input type="text" name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block font-medium text-paper">
          Your email
          <input type="email" name="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="mt-5 block font-medium text-paper">
        Message
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>
      {/* Hidden field that only bots fill in; the form service discards those submissions. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-solid disabled:opacity-60" disabled={status === 'sending'}>
          <Send aria-hidden="true" className="size-4" />
          {status === 'sending' ? 'Sending message' : 'Send message'}
        </button>
        <p role="status" aria-live="polite" className={status === 'error' ? 'text-accent-ink' : 'text-paper'}>
          {messages[status] || ''}
        </p>
      </div>
    </form>
  )
}
