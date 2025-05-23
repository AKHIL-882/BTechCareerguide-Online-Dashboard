<?php 

namespace App\Traits\ParseFileTrait;
use Smalot\PdfParser\Parser;



trait ParseFileTrait 
{

    public function parseresume($file) 
    {
        $parser = new Parser() ;
        $pdf = $parser->parseFile($file);
        $text = $pdf->getText() ;

        return $text ;
    }


}