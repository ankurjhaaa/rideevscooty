<?php

namespace App\Mail;

use App\Models\DealershipApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewDealershipApplication extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public DealershipApplication $application)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New Dealership Application — {$this->application->full_name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.dealership-application',
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
