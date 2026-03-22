<?php

namespace Database\Factories;

use App\Models\Scan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Scan>
 */
class ScanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'filename' => fake()->word().'.jpg',
            'label' => fake()->randomElement(['AI_Generated', 'Real']),
            'confidence_score' => fake()->randomFloat(2, 0, 1),
            'full_result' => [
                ['label' => 'AI_Generated', 'confidence' => fake()->randomFloat(2, 0, 1)],
                ['label' => 'Real', 'confidence' => fake()->randomFloat(2, 0, 1)],
            ],
        ];
    }
}
