<?php

namespace App\Http\Controllers;

use App\Models\JobOpportunity;
use App\Traits\ParseFileTrait\ParseFileTrait;
use Illuminate\Http\Request;

class ResumeAnalysisController extends Controller
{
    use ParseFileTrait ;


    public function getLastestJobs()
    {
        $jobs = JobOpportunity::where('created_at', '>=', now()->subDays(12))->latest()->get() ;
    }
}
