<?php
/**
 * Pixel World Portfolio - API Router
 * 
 * Main entry point for all API requests
 */

require_once __DIR__ . '/config.php';

// Set CORS headers
setCorsHeaders();

// Parse the request
$request = parseRequest();

// Route to appropriate handler
switch ($request['endpoint']) {
    case 'posts':
        require_once __DIR__ . '/posts.php';
        handlePosts($request);
        break;
        
    case 'projects':
        require_once __DIR__ . '/projects.php';
        handleProjects($request);
        break;
        
    case 'auth':
        require_once __DIR__ . '/auth.php';
        handleAuth($request);
        break;
        
    case 'settings':
        require_once __DIR__ . '/settings.php';
        handleSettings($request);
        break;
        
    case 'health':
        // Health check endpoint
        jsonResponse([
            'status' => 'ok',
            'timestamp' => date('c'),
            'version' => '1.0.0'
        ]);
        break;
        
    case '':
        jsonResponse([
            'name' => 'Pixel World Portfolio API',
            'version' => '1.0.0',
            'endpoints' => [
                'GET /api/posts' => 'Get all posts',
                'GET /api/posts/{id}' => 'Get single post',
                'POST /api/posts' => 'Create post',
                'PUT /api/posts/{id}' => 'Update post',
                'DELETE /api/posts/{id}' => 'Delete post',
                'GET /api/projects' => 'Get all projects',
                'GET /api/projects/{id}' => 'Get single project',
                'POST /api/projects' => 'Create project',
                'PUT /api/projects/{id}' => 'Update project',
                'DELETE /api/projects/{id}' => 'Delete project',
                'GET /api/health' => 'Health check'
            ]
        ]);
        break;
        
    default:
        jsonResponse(['error' => 'Endpoint not found'], 404);
}
