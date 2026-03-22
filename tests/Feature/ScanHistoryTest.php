<?php
use App\Models\Scan;

describe('Scan History API', function () {
    it('can store a scan result', function () {
        $response = $this->postJson('/api/scans/history', [
            'filename' => 'test-image.jpg',
            'label' => 'AI_Generated',
            'confidence_score' => 0.95,
            'full_result' => [
                ['label' => 'AI_Generated', 'confidence' => 0.95],
                ['label' => 'Real', 'confidence' => 0.05],
            ],
        ]);

        $response->assertSuccessful()
            ->assertJsonStructure(['message', 'scan' => ['id', 'filename', 'label', 'confidence_score', 'full_result', 'created_at']]);

        $this->assertDatabaseHas('scans', [
            'filename' => 'test-image.jpg',
            'label' => 'AI_Generated',
        ]);
    });

    it('validates required fields when storing scan', function () {
        $response = $this->postJson('/api/scans/history', []);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['filename', 'label', 'confidence_score']);
    });

    it('validates confidence score range', function () {
        $response = $this->postJson('/api/scans/history', [
            'filename' => 'test.jpg',
            'label' => 'Fake',
            'confidence_score' => 1.5,
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['confidence_score']);
    });

    it('can retrieve scan history', function () {
        Scan::factory()->count(3)->create();

        $response = $this->getJson('/api/scans/history');

        $response->assertSuccessful()
            ->assertJsonStructure(['scans']);
    });
});
