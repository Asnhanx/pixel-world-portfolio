<?php
/**
 * Settings API Handler
 * 
 * Site settings management
 */

function handleSettings($request) {
    $method = $request['method'];
    $key = $request['id']; // Using 'id' slot for setting key
    
    switch ($method) {
        case 'GET':
            if ($key) {
                getSetting($key);
            } else {
                getAllSettings();
            }
            break;
            
        case 'PUT':
            if ($key) {
                updateSetting($key);
            } else {
                jsonResponse(['error' => 'Setting key required'], 400);
            }
            break;
            
        default:
            jsonResponse(['error' => 'Method not allowed'], 405);
    }
}

/**
 * Get all settings
 */
function getAllSettings() {
    $db = getDB();
    
    $stmt = $db->query("SELECT setting_key, setting_value FROM settings");
    $rows = $stmt->fetchAll();
    
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    
    jsonResponse(['data' => $settings]);
}

/**
 * Get single setting
 */
function getSetting($key) {
    $db = getDB();
    
    $stmt = $db->prepare("SELECT setting_value FROM settings WHERE setting_key = ?");
    $stmt->execute([$key]);
    $row = $stmt->fetch();
    
    if (!$row) {
        jsonResponse(['error' => 'Setting not found'], 404);
    }
    
    jsonResponse(['data' => ['key' => $key, 'value' => $row['setting_value']]]);
}

/**
 * Update or create setting
 */
function updateSetting($key) {
    $db = getDB();
    $data = getJsonInput();
    
    if (!isset($data['value'])) {
        jsonResponse(['error' => 'Value is required'], 400);
    }
    
    // Upsert setting
    $sql = "INSERT INTO settings (setting_key, setting_value) 
            VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)";
    
    $stmt = $db->prepare($sql);
    $stmt->execute([$key, $data['value']]);
    
    jsonResponse(['message' => 'Setting updated successfully']);
}
