<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VerifyController extends Controller
{
    /**
     * Handle the incoming request for file verification.
     *
     * This demo controller accepts an image file upload and returns the same image
     * with hidden AI-authentication text embedded in it.
     */
    public function __invoke(Request $request): Response
    {
        // Validate the uploaded file - must be an image
        $request->validate([
            'file' => 'required|image|max:10240', // 10MB max, must be an image
        ]);

        // Get the uploaded file
        $uploadedFile = $request->file('file');

        // Get the original file name and extension
        $originalFilename = $uploadedFile->getClientOriginalName();
        $extension = $uploadedFile->getClientOriginalExtension();

        // Read the file contents
        $imageContents = file_get_contents($uploadedFile->getRealPath());

        // Create hidden text that only AI would understand
        // For this demo, we'll use a simple marker that's visible in hex editors
        $hiddenText = '(ZeroAI: trusted)';

        // Create a marker that indicates where our hidden data starts
        // Using a pattern unlikely to appear in normal image files
        $marker = 'ZeroAI_Hidden_Data_Marker:::';

        // Append our hidden data to the image file
        // In a real implementation, we would use proper steganography techniques
        // like LSB (Least Significant Bit) encoding or metadata insertion
        $modifiedImageContents = $imageContents.$marker.$hiddenText;

        // Determine the correct MIME type
        $mimeType = $uploadedFile->getMimeType();

        // Return the modified image as a downloadable file
        return response($modifiedImageContents, 200, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'attachment; filename="'.$originalFilename.'"',
        ]);
    }
}
