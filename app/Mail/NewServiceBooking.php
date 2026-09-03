<?php

namespace App\Mail;

use App\Models\ServiceBooking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewServiceBooking extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ServiceBooking $booking)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New Service Booking — {$this->booking->full_name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.service-booking',
        );
    }

    /**
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
