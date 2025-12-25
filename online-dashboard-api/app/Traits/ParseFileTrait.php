<?php

namespace App\Traits;

use Smalot\PdfParser\Parser;

trait ParseFileTrait
{
    /**
     * Parse a PDF resume into plain text.
     */
    public function parseResume(string $filePath): string
    {
        if (! class_exists(Parser::class)) {
            throw new \RuntimeException('PDF parser not installed. Run composer require smalot/pdfparser');
        }

        $parser = new Parser;
        $pdf = $parser->parseFile($filePath);

        return $pdf->getText();
    }
}
