<?php
/**
 * GitHub Webhook Auto-Deploy
 * 
 * This script receives GitHub webhook notifications and
 * automatically pulls the latest code.
 * 
 * Security: Uses secret token to verify requests
 */

// Configuration
$secret = 'my-super-secret-key-123'; // 在 GitHub 中设置相同的 secret
$projectPath = '/home/web/html/shrimp.5556655.xyz'; // 你的项目路径
$branch = 'main';
$logFile = __DIR__ . '/deploy.log';

// Log function
function writeLog($message) {
    global $logFile;
    $time = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$time] $message\n", FILE_APPEND);
}

// Get request headers
$headers = getallheaders();
$hubSignature = $headers['X-Hub-Signature-256'] ?? '';
$event = $headers['X-GitHub-Event'] ?? '';

// Get payload
$payload = file_get_contents('php://input');

// Verify signature
$hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);
if (!hash_equals($hash, $hubSignature)) {
    writeLog('ERROR: Invalid signature');
    http_response_code(403);
    die('Invalid signature');
}

// Only process push events
if ($event !== 'push') {
    writeLog("Ignored event: $event");
    echo "Ignored event: $event";
    exit;
}

// Parse payload
$data = json_decode($payload, true);
$ref = $data['ref'] ?? '';

// Only deploy if push to main branch
if ($ref !== "refs/heads/$branch") {
    writeLog("Ignored branch: $ref");
    echo "Ignored branch: $ref";
    exit;
}

// Execute deploy
writeLog('Starting deployment...');

// Step 1: Git pull
$gitCommands = [
    "cd $projectPath",
    'git fetch origin',
    "git reset --hard origin/$branch",
];

$output = [];
$fullCommand = implode(' && ', $gitCommands) . ' 2>&1';
exec($fullCommand, $output, $returnCode);

$outputStr = implode("\n", $output);
writeLog("Git update output:\n$outputStr");

if ($returnCode !== 0) {
    writeLog("Git update failed with code: $returnCode");
    http_response_code(500);
    echo "Git update failed!\n$outputStr";
    exit;
}

// Step 2: Install dependencies and build frontend
writeLog('Building frontend...');

$buildCommands = [
    "cd $projectPath",
    'npm install --production=false',  // Install all deps including devDependencies
    'npm run build',
];

$buildOutput = [];
$buildCommand = implode(' && ', $buildCommands) . ' 2>&1';
exec($buildCommand, $buildOutput, $buildReturnCode);

$buildOutputStr = implode("\n", $buildOutput);
writeLog("Build output:\n$buildOutputStr");
writeLog("Build finished with code: $buildReturnCode");

if ($buildReturnCode === 0) {
    http_response_code(200);
    echo "Deploy successful!\nGit:\n$outputStr\n\nBuild:\n$buildOutputStr";
} else {
    http_response_code(500);
    echo "Build failed!\n$buildOutputStr";
}
