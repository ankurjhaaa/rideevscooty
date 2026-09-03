<?php

namespace App\Http\Requests;

use App\Http\Controllers\ServiceBookingController;
use App\Models\ServiceBooking;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreServiceBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'full_name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'digits:10'],
            'whatsapp' => ['nullable', 'digits:10'],
            'vehicle_purchase_date' => ['nullable', 'date', 'before_or_equal:today'],
            'service_type' => ['required', Rule::in(array_keys(ServiceBookingController::SERVICE_TYPES))],
            'complaint' => ['required', 'string', 'max:1000'],
            'preferred_date' => ['required', 'date', 'after_or_equal:today'],
            'preferred_time' => ['required', Rule::in(ServiceBookingController::TIME_SLOTS)],
            'location_type' => ['required', Rule::in(['showroom', 'pickup_drop'])],
            'address' => ['required_if:location_type,pickup_drop', 'nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'Please select your vehicle model.',
            'product_id.exists' => 'Please select a valid vehicle model.',
            'full_name.required' => 'Please enter your full name.',
            'phone.required' => 'Please enter your mobile number.',
            'phone.digits' => 'Mobile number should be exactly 10 digits.',
            'whatsapp.digits' => 'WhatsApp number should be exactly 10 digits.',
            'vehicle_purchase_date.before_or_equal' => 'Purchase date cannot be in the future.',
            'service_type.required' => 'Please select a service type.',
            'service_type.in' => 'Please select a valid service type.',
            'complaint.required' => 'Please describe the problem or complaint.',
            'preferred_date.required' => 'Please select a preferred service date.',
            'preferred_date.after_or_equal' => 'Please select today or a future date.',
            'preferred_time.required' => 'Please select a preferred time.',
            'preferred_time.in' => 'Please select a valid time slot.',
            'location_type.required' => 'Please choose a service location.',
            'address.required_if' => 'Please enter your address for pickup & drop.',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if (! $this->filled('preferred_date')) {
                return;
            }

            $count = ServiceBooking::where('preferred_date', $this->preferred_date)
                ->where('status', '!=', 'cancelled')
                ->count();

            if ($count >= ServiceBookingController::MAX_BOOKINGS_PER_DAY) {
                $validator->errors()->add(
                    'preferred_date',
                    'Is date ke liye saari service slots book ho chuki hain. Kripya doosri date chuno.',
                );
            }
        });
    }
}
