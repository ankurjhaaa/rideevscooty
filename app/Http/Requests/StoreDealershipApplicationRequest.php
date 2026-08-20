<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDealershipApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'digits:10'],
            'pincode' => ['required', 'digits:6'],
            'area_available' => ['required', Rule::in([
                'Below 500 sq.ft',
                '500 - 1,000 sq.ft',
                '1,000 - 2,000 sq.ft',
                'Above 2,000 sq.ft',
            ])],
            'investment' => ['required', Rule::in([
                'Below ₹5 Lakhs',
                '₹5 - 10 Lakhs',
                '₹10 - 25 Lakhs',
                'Above ₹25 Lakhs',
            ])],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Please enter your full name.',
            'phone.required' => 'Please enter your phone number.',
            'phone.digits' => 'Phone number should be exactly 10 digits.',
            'pincode.required' => 'Please enter your pincode.',
            'pincode.digits' => 'Pincode should be exactly 6 digits.',
            'area_available.required' => 'Please select the area available.',
            'area_available.in' => 'Please select a valid area option.',
            'investment.required' => 'Please select your investment range.',
            'investment.in' => 'Please select a valid investment option.',
        ];
    }
}
