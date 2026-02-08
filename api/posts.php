<?php
/**
 * Posts API Handler
 * 
 * CRUD operations for blog posts
 */

function handlePosts($request) {
    $method = $request['method'];
    $id = $request['id'];
    
    switch ($method) {
        case 'GET':
            if ($id) {
                getPost($id);
            } else {
                getPosts();
            }
            break;
            
        case 'POST':
            createPost();
            break;
            
        case 'PUT':
            if ($id) {
                updatePost($id);
            } else {
                jsonResponse(['error' => 'Post ID required'], 400);
            }
            break;
            
        case 'DELETE':
            if ($id) {
                deletePost($id);
            } else {
                jsonResponse(['error' => 'Post ID required'], 400);
            }
            break;
            
        default:
            jsonResponse(['error' => 'Method not allowed'], 405);
    }
}

/**
 * Get all posts with pagination
 */
function getPosts() {
    $db = getDB();
    $pagination = getPagination();
    
    // Get status filter (default to published for public API)
    $status = $_GET['status'] ?? 'published';
    
    // Count total posts
    $countSql = "SELECT COUNT(*) as total FROM posts";
    $params = [];
    
    if ($status !== 'all') {
        $countSql .= " WHERE status = ?";
        $params[] = $status;
    }
    
    $stmt = $db->prepare($countSql);
    $stmt->execute($params);
    $total = $stmt->fetch()['total'];
    
    // Get posts
    $sql = "SELECT id, title, excerpt, cover_image, category, tags, status, created_at, updated_at 
            FROM posts";
    
    if ($status !== 'all') {
        $sql .= " WHERE status = ?";
    }
    
    $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $params[] = $pagination['limit'];
    $params[] = $pagination['offset'];
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $posts = $stmt->fetchAll();
    
    // Parse JSON fields
    foreach ($posts as &$post) {
        $post['tags'] = json_decode($post['tags'], true) ?: [];
    }
    
    jsonResponse([
        'data' => $posts,
        'pagination' => [
            'page' => $pagination['page'],
            'limit' => $pagination['limit'],
            'total' => (int)$total,
            'totalPages' => ceil($total / $pagination['limit'])
        ]
    ]);
}

/**
 * Get single post by ID
 */
function getPost($id) {
    $db = getDB();
    
    $stmt = $db->prepare("SELECT * FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    $post = $stmt->fetch();
    
    if (!$post) {
        jsonResponse(['error' => 'Post not found'], 404);
    }
    
    $post['tags'] = json_decode($post['tags'], true) ?: [];
    
    jsonResponse(['data' => $post]);
}

/**
 * Create new post
 */
function createPost() {
    $db = getDB();
    $data = getJsonInput();
    
    // Validate required fields
    if (empty($data['title'])) {
        jsonResponse(['error' => 'Title is required'], 400);
    }
    
    $sql = "INSERT INTO posts (title, content, excerpt, cover_image, category, tags, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $db->prepare($sql);
    $stmt->execute([
        $data['title'],
        $data['content'] ?? '',
        $data['excerpt'] ?? '',
        $data['cover_image'] ?? '',
        $data['category'] ?? '',
        json_encode($data['tags'] ?? [], JSON_UNESCAPED_UNICODE),
        $data['status'] ?? 'draft'
    ]);
    
    $id = $db->lastInsertId();
    
    jsonResponse([
        'message' => 'Post created successfully',
        'id' => (int)$id
    ], 201);
}

/**
 * Update existing post
 */
function updatePost($id) {
    $db = getDB();
    $data = getJsonInput();
    
    // Check if post exists
    $stmt = $db->prepare("SELECT id FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'Post not found'], 404);
    }
    
    // Build update query dynamically
    $fields = [];
    $values = [];
    
    $allowedFields = ['title', 'content', 'excerpt', 'cover_image', 'category', 'status'];
    
    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            $fields[] = "$field = ?";
            $values[] = $data[$field];
        }
    }
    
    // Handle tags separately (JSON)
    if (isset($data['tags'])) {
        $fields[] = "tags = ?";
        $values[] = json_encode($data['tags'], JSON_UNESCAPED_UNICODE);
    }
    
    if (empty($fields)) {
        jsonResponse(['error' => 'No fields to update'], 400);
    }
    
    $values[] = $id;
    $sql = "UPDATE posts SET " . implode(', ', $fields) . " WHERE id = ?";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($values);
    
    jsonResponse(['message' => 'Post updated successfully']);
}

/**
 * Delete post
 */
function deletePost($id) {
    $db = getDB();
    
    $stmt = $db->prepare("DELETE FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'Post not found'], 404);
    }
    
    jsonResponse(['message' => 'Post deleted successfully']);
}
