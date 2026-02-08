<?php
/**
 * Projects API Handler
 * 
 * CRUD operations for portfolio projects
 */

function handleProjects($request) {
    $method = $request['method'];
    $id = $request['id'];
    
    switch ($method) {
        case 'GET':
            if ($id) {
                getProject($id);
            } else {
                getProjects();
            }
            break;
            
        case 'POST':
            createProject();
            break;
            
        case 'PUT':
            if ($id) {
                updateProject($id);
            } else {
                jsonResponse(['error' => 'Project ID required'], 400);
            }
            break;
            
        case 'DELETE':
            if ($id) {
                deleteProject($id);
            } else {
                jsonResponse(['error' => 'Project ID required'], 400);
            }
            break;
            
        default:
            jsonResponse(['error' => 'Method not allowed'], 405);
    }
}

/**
 * Get all projects
 */
function getProjects() {
    $db = getDB();
    
    // Get status filter
    $status = $_GET['status'] ?? 'active';
    
    $sql = "SELECT * FROM projects";
    $params = [];
    
    if ($status !== 'all') {
        $sql .= " WHERE status = ?";
        $params[] = $status;
    }
    
    $sql .= " ORDER BY display_order ASC, created_at DESC";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $projects = $stmt->fetchAll();
    
    // Parse JSON fields
    foreach ($projects as &$project) {
        $project['tech_stack'] = json_decode($project['tech_stack'], true) ?: [];
    }
    
    jsonResponse(['data' => $projects]);
}

/**
 * Get single project by ID
 */
function getProject($id) {
    $db = getDB();
    
    $stmt = $db->prepare("SELECT * FROM projects WHERE id = ?");
    $stmt->execute([$id]);
    $project = $stmt->fetch();
    
    if (!$project) {
        jsonResponse(['error' => 'Project not found'], 404);
    }
    
    $project['tech_stack'] = json_decode($project['tech_stack'], true) ?: [];
    
    jsonResponse(['data' => $project]);
}

/**
 * Create new project
 */
function createProject() {
    $db = getDB();
    $data = getJsonInput();
    
    // Validate required fields
    if (empty($data['title'])) {
        jsonResponse(['error' => 'Title is required'], 400);
    }
    
    $sql = "INSERT INTO projects (title, subtitle, description, tech_stack, icon, link, status, display_order) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $db->prepare($sql);
    $stmt->execute([
        $data['title'],
        $data['subtitle'] ?? '',
        $data['description'] ?? '',
        json_encode($data['tech_stack'] ?? [], JSON_UNESCAPED_UNICODE),
        $data['icon'] ?? 'code',
        $data['link'] ?? '',
        $data['status'] ?? 'active',
        $data['display_order'] ?? 0
    ]);
    
    $id = $db->lastInsertId();
    
    jsonResponse([
        'message' => 'Project created successfully',
        'id' => (int)$id
    ], 201);
}

/**
 * Update existing project
 */
function updateProject($id) {
    $db = getDB();
    $data = getJsonInput();
    
    // Check if project exists
    $stmt = $db->prepare("SELECT id FROM projects WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'Project not found'], 404);
    }
    
    // Build update query dynamically
    $fields = [];
    $values = [];
    
    $allowedFields = ['title', 'subtitle', 'description', 'icon', 'link', 'status', 'display_order'];
    
    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            $fields[] = "$field = ?";
            $values[] = $data[$field];
        }
    }
    
    // Handle tech_stack separately (JSON)
    if (isset($data['tech_stack'])) {
        $fields[] = "tech_stack = ?";
        $values[] = json_encode($data['tech_stack'], JSON_UNESCAPED_UNICODE);
    }
    
    if (empty($fields)) {
        jsonResponse(['error' => 'No fields to update'], 400);
    }
    
    $values[] = $id;
    $sql = "UPDATE projects SET " . implode(', ', $fields) . " WHERE id = ?";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($values);
    
    jsonResponse(['message' => 'Project updated successfully']);
}

/**
 * Delete project
 */
function deleteProject($id) {
    $db = getDB();
    
    $stmt = $db->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'Project not found'], 404);
    }
    
    jsonResponse(['message' => 'Project deleted successfully']);
}
