<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreScanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'filename' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:100'],
            'confidence_score' => ['required', 'numeric', 'min:0', 'max:1'],
            'full_result' => ['nullable', 'array'],
            'type' => 'nullable|string|in:image,video',
        ];
    }
}
