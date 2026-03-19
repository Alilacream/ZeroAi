<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class DeepfakeDetectionService
{
    protected string $apiKey;

    protected string $apiUrl;

    protected string $gradioApiUrl;

    public function __construct()
    {
        $this->apiKey = config('services.huggingface.token');
        $this->apiUrl = config('services.gradio.space');
        $this->gradioApiUrl = rtrim($this->apiUrl, '/').'/api/predict';
    }

    /**
     * Detect if media is a deepfake
     *
     * @param  string  $filePath  Path to the media file
     * @param  string  $mimeType  MIME type of the file
     * @return array Detection results
     */
    public function detect(string $filePath, string $mimeType): array
    {
        try {
            // Prepare file for upload
            $fileData = $this->prepareFile($filePath, $mimeType);

            // Call Gradio API
            $response = Http::withHeaders([
                // Gradio doesn't typically require Authorization header for public spaces
                // But we'll keep it in case it's needed for private spaces
                'Authorization' => "Bearer {$this->apiKey}",
            ])->withTimeout(60)->post($this->gradioApiUrl, [
                'data' => [
                    // For Gradio, we need to pass the file in the data array
                    // The format depends on how the Gradio app expects the input
                    // Based on the JS example, it expects a Blob/File in the image parameter
                    // In Gradio API, this typically becomes the first element in data array
                    $fileData,
                ],
            ]);

            if ($response->failed()) {
                Log::error('Gradio API error: '.$response->body());
                throw new \Exception('Failed to analyze media: '.$response->body());
            }

            // Process Gradio response
            $result = $response->json();

            return $this->processGradioResult($result);
        } catch (Exception $e) {
            Log::error('Deepfake detection exception: '.$e->getMessage());
            throw $e;
        }
    }

    /**
     * Prepare file for API upload (compression, etc.)
     *
     * @param  string  $filePath  Path to the media file
     * @param  string  $mimeType  MIME type of the file
     * @return string Prepared file data
     */
    protected function prepareFile(string $filePath, string $mimeType): string
    {
        // For images, compress if needed
        if (str_starts_with($mimeType, 'image/')) {
            return $this->compressImage($filePath);
        }

        // For videos and other files, return as-is
        return file_get_contents($filePath);
    }

    /**
     * Compress image to reduce upload size while maintaining quality
     *
     * @param  string  $imagePath  Path to the image file
     * @return string Compressed image data
     */
    protected function compressImage(string $imagePath): string
    {
        $image = Image::read($imagePath);

        // Resize if larger than 1024px on longest side
        $maxSize = 1024;
        $width = $image->width();
        $height = $image->height();

        if ($width > $height && $width > $maxSize) {
            $height = ($maxSize * $height) / $width;
            $width = $maxSize;
        } elseif ($height > $maxSize) {
            $width = ($maxSize * $width) / $height;
            $height = $maxSize;
        }

        $image->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        // Encode as JPEG with 85% quality
        return $image->toJpeg(85);
    }

    /**
     * Process Gradio API response into expected format
     *
     * @param  array  $result  Raw Gradio API response
     * @return array Processed result
     */
    protected function processGradioResult(array $result): array
    {
        // Handle Gradio response format
        // Based on the JS example, result.data should contain the output
        if (isset($result['data']) && is_array($result['data'])) {
            // Gradio typically returns an array where each element corresponds to an output component
            // Assuming the first output is the label/score we need
            $output = $result['data'][0] ?? null;

            if ($output !== null) {
                // Check if output is already in the expected format
                if (is_array($output) && isset($output['label']) && isset($output['confidence'])) {
                    // Already in our expected format
                    return $output;
                } elseif (is_string($output)) {
                    // If it's just a label string, we need to create confidences
                    // This is a fallback - ideally we'd get confidence scores too
                    return [
                        'label' => $output,
                        'confidences' => [
                            [
                                'label' => $output,
                                'confidence' => 0.8, // Default confidence
                            ],
                        ],
                    ];
                } elseif (is_array($output)) {
                    // If it's an array of labels/confidences from the model
                    $label = '';
                    $confidence = 0;

                    // Try to find the highest confidence prediction
                    foreach ($output as $item) {
                        if (is_array($item) && isset($item['confidence']) && $item['confidence'] > $confidence) {
                            $confidence = $item['confidence'];
                            $label = $item['label'] ?? '';
                        }
                    }

                    if ($label !== '') {
                        // Create confidences array
                        $confidences = [];
                        foreach ($output as $item) {
                            if (is_array($item) && isset($item['label'], $item['confidence'])) {
                                $confidences[] = [
                                    'label' => $item['label'],
                                    'confidence' => $item['confidence'],
                                ];
                            }
                        }

                        return [
                            'label' => $label,
                            'confidences' => $confidences,
                        ];
                    }
                }
            }
        }

        // Fallback for unexpected response format
        return [
            'label' => 'unknown',
            'confidences' => [
                [
                    'label' => 'unknown',
                    'confidence' => 0.5,
                ],
            ],
        ];
    }
}
