<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CreateRolesAndPermissionsController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\GithubController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
// use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Smalot\PdfParser\Parser;

Route::middleware(['auth:api', 'api'])->group(function () {

    Route::match(['post', 'get'], '/logout', [AuthenticationController::class, 'logout']);

    Route::post('refresh-token', [AuthenticationController::class, 'refreshAccessToken']);

    Route::post('/create-order', [PaymentController::class, 'createRazorPayOrder']);
    Route::post('/verify-payment', [PaymentController::class, 'verifyPayment']);

    Route::get('set-access', [GithubController::class, 'addCollaboratorToRepo']);

    // notification routes
    Route::get('notifications', [NotificationController::class, 'unread']);
    Route::post('create-notification', [NotificationController::class, 'createNotification']);
    Route::post('mark-as-read', [NotificationController::class, 'markAsRead']);

    // bulk insert jobs

    Route::post('bulk-insert-jobs', [\App\Http\Controllers\JobOpportunityController::class, 'bulkInsert']);

});

Route::middleware(['guest', 'throttle:10,1'])->group(function () {

    Route::post('reset-password', [ForgetPasswordController::class, 'resetPassword']);
    Route::post('update-password', [ForgetPasswordController::class, 'updatePassword']);
    Route::post('signup', [AuthenticationController::class, 'signup']);
    Route::post('login', [AuthenticationController::class, 'login']);

    Route::get('create-user-admin-role', [CreateRolesAndPermissionsController::class, 'createUserAndAdminRole']);

});


Route::post('parse-resume', function (Request $request) {


    // Get the temporary file path (no need to store it)
    $tempPath = $request->file('resume')->getRealPath();

    $parser = new Parser();
    $pdf = $parser->parseFile($tempPath);
    $text = $pdf->getText();

    // info('Parsed resume text: ' . $text);
//     $jobTitles = ['Software Engineer', 'Data Scientist', 'Product Manager', 
//     'Project Manager', 'Business Analyst', 'Python developer', 'software developer', 'frontend developer', 
//     'backend developer', 'full stack developer', 'web developer', 'mobile developer', 'data analyst', 'data engineer', 
//     'machine learning engineer', 'AI engineer', 'cloud engineer', 'DevOps engineer', 'QA engineer', 'UI/UX designer', 'laravel developer', "Software Engineer",
//   "Full Stack Developer",
//   "Laravel Developer",
//   "React Developer",
//   "Web Developer",
//   "Backend Developer",
//   "Open Source Contributor", ]; 

$jobTitles = [
    // Software Development
    'Software Engineer', 'Software Developer', 'Backend Developer', 'Frontend Developer', 'Full Stack Developer',
    'Web Developer', 'Mobile Developer', 'iOS Developer', 'Android Developer', 'Game Developer', 'Embedded Systems Developer',
    'C++ Developer', 'Java Developer', 'Python Developer', 'Go Developer', 'Rust Developer', 'PHP Developer',
    'Laravel Developer', 'Node.js Developer', 'React Developer', 'Vue.js Developer', 'Angular Developer',
    'Django Developer', 'Flask Developer', 'Ruby on Rails Developer', 'ASP.NET Developer',

    // Cloud & DevOps
    'DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer', 'AWS Engineer', 'Azure Engineer', 'GCP Engineer',
    'Cloud Architect', 'Infrastructure Engineer', 'Platform Engineer', 'Systems Engineer',

    // Data & AI
    'Data Analyst', 'Data Scientist', 'Machine Learning Engineer', 'AI Engineer', 'Deep Learning Engineer',
    'Data Engineer', 'Big Data Engineer', 'Business Intelligence Developer', 'ETL Developer',

    // Cybersecurity
    'Cybersecurity Analyst', 'Security Engineer', 'Application Security Engineer', 'Penetration Tester',
    'Information Security Analyst', 'SOC Analyst',

    // Quality Assurance
    'QA Engineer', 'Test Automation Engineer', 'Manual Tester', 'SDET (Software Development Engineer in Test)',

    // UI/UX & Design
    'UI Designer', 'UX Designer', 'Product Designer', 'Interaction Designer', 'Visual Designer',
    'Graphic Designer', 'Motion Designer',

    // Product & Project Management
    'Product Manager', 'Technical Product Manager', 'Project Manager', 'Scrum Master', 'Agile Coach',
    'Technical Program Manager',

    // Support & Operations
    'Technical Support Engineer', 'Customer Success Engineer', 'IT Support Specialist',
    'System Administrator', 'Network Administrator',

    // Emerging Tech & Specialized Roles
    'Blockchain Developer', 'IoT Engineer', 'AR/VR Developer', 'Robotics Engineer', 'Quantum Computing Engineer',

    // Open Source & Misc
    'Open Source Contributor', 'Technical Writer', 'Developer Advocate', 'Solution Architect', 'Tech Lead',

    // Design + Frontend Specialties
    'Frontend Architect', 'Web Accessibility Specialist', 'UI Engineer',

    // Engineering Leadership
    'Engineering Manager', 'CTO', 'VP of Engineering', 'Team Lead', 'Technical Director'
];

// $jobTitles = [
// "SDE 1",
// "Associate Software Engineer",
// "Backend Engineer Intern",
// "Aspiring Innovators Talent Search 2025",
// "GenC, GenC Pro, GenC Next, Analyst Trainee",
// "Full Stack Software Engineer - React & Java",
// "Software Engineer - QA Automation",
// "Associate Software Development Engineer",
// "Junior Software Developer" ] ;



    // $jobTitles = ['Software Engineer', 'Data Scientist', 'Product Manager', 'web developer'] ;

   
    $apiKey = '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';

    // $prompt = "Below is a resume:\n\n$text\n\nThe following job titles are available:\n\n" .
    //       implode(", ", $jobTitles) .
    //       "\n\nBased on the resume, suggest the most suitable job titles from the list above. throw me the list of eligible job titles in a json format. \n\n" ;
//     $prompt = <<<EOT
// Below is a resume:

// $text

// The following job titles are available:

// " . implode(", ", $jobTitles) . "

// From the list above, return only the job titles that are suitable for the candidate based on the resume.

// Output only a raw JSON array of job titles. Do not include any explanation, text, or formatting. Example format: ["Job Title 1", "Job Title 2"]
// EOT;

// $prompt = "Below is a resume:\n\n$text\n\nThe following job titles are available:\n\n" .
//           implode(", ", $jobTitles) .
//           "\n\nBased on the resume, give me the suitable job titles in array format without any explanation. \n\n" ;

$prompt = "You are an expert in resume analysis. Below is a resume:\n\n$text\n\nThe following job titles are available:\n\n" .
          implode(", ", $jobTitles) .
          "\n\nAnalyze the resume and return a JSON array of all job titles from the list above that are relevant, even if they match approximately 90-95%.\n" .
          "Only return the JSON array — no explanation, no extra text. Focus on matching skills, tools, and experience to determine suitability.\n\n";




//     $response = Http::withHeaders([
//     'Authorization' => 'Bearer ' . $hfApiKey,
//         'Content-Type' => 'application/json',
//     ])->post('https://api-inference.huggingface.co/models/facebook/bart-large-mnli'
// , [
//         'inputs' => $text,
//         'parameters' => [
//         'candidate_labels' => $jobTitles
//         ]
//     ]); 

//     info(json_encode($response->json(), JSON_PRETTY_PRINT));

    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . $apiKey,
        'Content-Type' => 'application/json',
    ])->post('https://api.groq.com/openai/v1/chat/completions', [
        'model' => 'llama3-8b-8192', // or llama3-70b-8192, mixtral-8x7b-32768, etc.
        'messages' => [
            ['role' => 'user', 'content' => $prompt]
        ],
        'temperature' => 0.7
    ]);



//     $responseBody = $response->json();
//     $answer = $responseBody[0]['generated_text'] ?? 'No result returned.';


//     info('Hugging Face API response: ' . $answer);

//  return response()->json([
//         'resume_text' => $response->json()
//     ]);


    $result = $response->json();
    info($result);

    if ($response->successful()) {
        return response()->json([
            'reply' => $result['choices'][0]['message']['content']
        ]);



    } else {
        return response()->json([
            'error' => $result,
            'status' => $response->status()
        ],  $response->status());
    }

    // $responseText = $response['reply'] ?? '';

// Match a valid JSON array using regex
// preg_match('/\[[^\]]+\]/', $responseText, $matches);
// info($matches) ;

// // Default empty list
// $jobList = [];

// // If a match is found, decode the array
// if (!empty($matches)) {
//     $jsonArrayString = '[' . $matches[1] . ']';
//     $jobList = json_decode($jsonArrayString, true);
// }

// return response()->json([
//     'job_list' => $jobList
// ]);



});



// Admin routes
require __DIR__.'/admin.php';

// User routes
require __DIR__.'/user.php';

require __DIR__.'/config.php';
