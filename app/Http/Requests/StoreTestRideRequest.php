<?php

namespace App\Http\Requests;

use App\Http\Controllers\TestRideController;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreTestRideRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'color_id' => ['nullable', 'integer', 'exists:product_colors,id'],
            'full_name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'digits:10'],
            'email' => ['nullable', 'email', 'max:255'],
            'pincode' => ['required', 'digits:6'],
            'mode' => ['required', Rule::in(['home', 'dealer'])],
            'preferred_date' => ['required', 'date', 'after_or_equal:today'],
            'time_slot' => ['required', Rule::in(TestRideController::TIME_SLOTS)],
            'message' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'Please select a scooter.',
            'product_id.exists' => 'Please select a valid scooter.',
            'full_name.required' => 'Please enter your full name.',
            'phone.required' => 'Please enter your phone number.',
            'phone.digits' => 'Phone number should be exactly 10 digits.',
            'email.email' => 'Please enter a valid email address.',
            'pincode.required' => 'Please enter your pincode.',
            'pincode.digits' => 'Pincode should be exactly 6 digits.',
            'mode.required' => 'Please choose a test ride mode.',
            'mode.in' => 'Please choose either Home or Dealer.',
            'preferred_date.required' => 'Please select a preferred date.',
            'preferred_date.after_or_equal' => 'Please select today or a future date.',
            'time_slot.required' => 'Please select a time slot.',
            'time_slot.in' => 'Please select a valid time slot.',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if (! $this->filled('preferred_date') || ! $this->filled('time_slot')) {
                return;
            }

            if (! Carbon::parse($this->preferred_date)->isToday()) {
                return;
            }

            $startTime = trim(explode('-', $this->time_slot)[0] ?? '');

            if ($startTime !== '' && Carbon::parse($startTime)->lessThanOrEqualTo(now())) {
                $validator->errors()->add('time_slot', 'This time slot has already passed. Please choose a later slot.');
            }
        });
    }
}
