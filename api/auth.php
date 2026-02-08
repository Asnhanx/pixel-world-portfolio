<?php
/**
 * Authentication API Handler
 * 
 * User registration and login with JWT token
 */

// Simple JWT implementation (no external dependencies)
class SimpleJWT {
    private static $secret = 'pixel-world-secret-key-change-in-production';
    
    public static function setSecret($secret) {
        self::$secret = $secret;
    }
    
    public static function encode($payload) {
        $header = self::base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload['iat'] = time();
        $payload['exp'] = time() + (60 * 60 * 24 * 7); // 7 days
        $payloadEncoded = self::base64UrlEncode(json_encode($payload));
        $signature = self::base64UrlEncode(hash_hmac('sha256', "$header.$payloadEncoded", self::$secret, true));
        return "$header.$payloadEncoded.$signature";
    }
    
    public static function decode($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return null;
        
        list($header, $payload, $signature) = $parts;
        $expectedSig = self::base64UrlEncode(hash_hmac('sha256', "$header.$payload", self::$secret, true));
        
        if (!hash_equals($expectedSig, $signature)) return null;
        
        $data = json_decode(self::base64UrlDecode($payload), true);
        if ($data['exp'] < time()) return null;
        
        return $data;
    }
    
    private static function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    
    private static function base64UrlDecode($data) {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}

// Set JWT secret from environment if available
$jwtSecret = getenv('JWT_SECRET');
if ($jwtSecret) {
    SimpleJWT::setSecret($jwtSecret);
}

function handleAuth($request) {
    $method = $request['method'];
    $action = $request['id']; // 'login', 'register', or 'me'
    
    switch ($action) {
        case 'register':
            if ($method === 'POST') {
                handleRegister();
            } else {
                jsonResponse(['error' => 'Method not allowed'], 405);
            }
            break;
            
        case 'login':
            if ($method === 'POST') {
                handleLogin();
            } else {
                jsonResponse(['error' => 'Method not allowed'], 405);
            }
            break;
            
        case 'me':
            if ($method === 'GET') {
                handleGetMe();
            } else {
                jsonResponse(['error' => 'Method not allowed'], 405);
            }
            break;
            
        default:
            jsonResponse(['error' => 'Invalid auth action'], 400);
    }
}

/**
 * Register new user
 */
function handleRegister() {
    $db = getDB();
    $data = getJsonInput();
    
    // Validate input
    if (empty($data['username']) || empty($data['password'])) {
        jsonResponse(['error' => '用户名和密码不能为空'], 400);
    }
    
    $username = trim($data['username']);
    $password = $data['password'];
    
    if (strlen($username) < 3) {
        jsonResponse(['error' => '用户名至少需要3个字符'], 400);
    }
    
    if (strlen($password) < 6) {
        jsonResponse(['error' => '密码至少需要6个字符'], 400);
    }
    
    // Check if username exists
    $stmt = $db->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        jsonResponse(['error' => '用户名已存在'], 400);
    }
    
    // Create user
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $db->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
    $stmt->execute([$username, $passwordHash]);
    
    $userId = $db->lastInsertId();
    
    jsonResponse([
        'message' => '注册成功',
        'user' => [
            'id' => (int)$userId,
            'username' => $username
        ]
    ], 201);
}

/**
 * Login user
 */
function handleLogin() {
    $db = getDB();
    $data = getJsonInput();
    
    // Validate input
    if (empty($data['username']) || empty($data['password'])) {
        jsonResponse(['error' => '用户名和密码不能为空'], 400);
    }
    
    $username = trim($data['username']);
    $password = $data['password'];
    
    // Find user
    $stmt = $db->prepare("SELECT id, username, password_hash FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password_hash'])) {
        jsonResponse(['error' => '用户名或密码错误'], 401);
    }
    
    // Generate JWT token
    $token = SimpleJWT::encode([
        'sub' => $user['id'],
        'username' => $user['username']
    ]);
    
    jsonResponse([
        'token' => $token,
        'user' => [
            'id' => (int)$user['id'],
            'username' => $user['username']
        ]
    ]);
}

/**
 * Get current user from token
 */
function handleGetMe() {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    
    if (!preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
        jsonResponse(['error' => '未提供认证令牌'], 401);
    }
    
    $token = $matches[1];
    $payload = SimpleJWT::decode($token);
    
    if (!$payload) {
        jsonResponse(['error' => '无效或过期的令牌'], 401);
    }
    
    $db = getDB();
    $stmt = $db->prepare("SELECT id, username, created_at FROM users WHERE id = ?");
    $stmt->execute([$payload['sub']]);
    $user = $stmt->fetch();
    
    if (!$user) {
        jsonResponse(['error' => '用户不存在'], 404);
    }
    
    jsonResponse([
        'user' => [
            'id' => (int)$user['id'],
            'username' => $user['username'],
            'created_at' => $user['created_at']
        ]
    ]);
}

/**
 * Helper: Verify token and return user ID
 */
function getAuthenticatedUserId() {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    
    if (!preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
        return null;
    }
    
    $payload = SimpleJWT::decode($matches[1]);
    return $payload ? $payload['sub'] : null;
}
