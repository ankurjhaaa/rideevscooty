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
                            <span style="color:#ffffff; font-size:18px; font-weight:bold;">New Service Booking</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px;">
                            <p style="margin:0 0 24px; font-size:14px; color:#706f6c;">
                                A new service request has been booked on the RideEV website.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c; width:160px;">Customer Name</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->full_name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Mobile</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->phone }}</td>
                                </tr>
                                @if ($booking->whatsapp)
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">WhatsApp</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->whatsapp }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td colspan="2" style="padding:16px 0 8px; border-top:1px solid #e3e3e0;"></td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Vehicle Model</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->vehicle_model }}</td>
                                </tr>
                                @if ($booking->vehicle_purchase_date)
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Purchase Date</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->vehicle_purchase_date->format('d M Y') }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td colspan="2" style="padding:16px 0 8px; border-top:1px solid #e3e3e0;"></td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Service Type</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->service_type_label }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c; vertical-align:top;">Complaint</td>
                                    <td style="padding:8px 0;">{{ $booking->complaint }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Preferred Date</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->preferred_date->format('d M Y') }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Preferred Time</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->preferred_time }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c;">Location</td>
                                    <td style="padding:8px 0; font-weight:bold;">{{ $booking->location_type === 'pickup_drop' ? 'Pickup & Drop' : 'Visit Showroom' }}</td>
                                </tr>
                                @if ($booking->address)
                                <tr>
                                    <td style="padding:8px 0; color:#706f6c; vertical-align:top;">Address</td>
                                    <td style="padding:8px 0;">{{ $booking->address }}</td>
                                </tr>
                                @endif
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px 32px; background-color:#f4f4f3; font-size:12px; color:#a3a29e;">
                            Ye booking admin panel mein bhi save ho chuki hai — /admin/service-bookings par jaake status update kar sakte ho.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
