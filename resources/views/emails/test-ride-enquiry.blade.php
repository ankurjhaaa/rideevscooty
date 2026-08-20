<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="margin:0; padding:0; background-color:#f4f4f3; font-family: Arial, Helvetica, sans-serif; color:#1b1b18;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f3; padding:32px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e3e3e0;">
                    <tr>
                        <td style="background-color:#10b981; padding:20px 32px;">
                            <span style="color:#ffffff; font-size:18px; font-weight:bold;">New Test Ride Booking</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px;">
                            <p style="margin:0 0 24px; font-size:14px; color:#706f6c;">
                                A new test ride has been booked on the RideEV website.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c; width:160px;">Customer Name</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $enquiry->full_name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Phone</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $enquiry->phone }}</td>
                                </tr>
                                @if ($enquiry->email)
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Email</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $enquiry->email }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Pincode</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $enquiry->pincode }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding:16px 0 8px; border-top:1px solid #e3e3e0;"></td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Scooter</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $enquiry->product_name }}</td>
                                </tr>
                                @if ($enquiry->color_name)
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Color</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $enquiry->color_name }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Mode</td>
                                    <td style="padding:8px 0; font-weight:bold; text-transform:capitalize;">{{ $enquiry->mode }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Preferred Date</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $enquiry->preferred_date->format('d M Y') }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Time Slot</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $enquiry->time_slot }}</td>
                                </tr>
                                @if ($enquiry->message)
                                <tr>
                                    <td colspan="2" style="padding:16px 0 8px; border-top:1px solid #e3e3e0;"></td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c; vertical-align:top;">Message</td>
                                    <td style="padding:8px 0;">{{ $enquiry->message }}</td>
                                </tr>
                                @endif
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px 32px; background-color:#f4f4f3; font-size:12px; color:#a3a29e;">
                            Ye enquiry admin panel mein bhi save ho chuki hai — /admin/enquiries par jaake status update kar sakte ho.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
