# Internal API - Master Admin Creation

This module provides secure internal APIs for creating and managing master admin accounts. These endpoints are protected by a master setup secret and should only be used for initial system setup or internal administration.

## Security Features

- **Master Setup Secret**: All endpoints require the `x-master-setup-secret` header
- **IP Logging**: All access attempts are logged with IP and User-Agent
- **Validation**: Comprehensive input validation using Zod schemas
- **Error Handling**: Structured error responses with appropriate HTTP status codes

## Environment Variables

Add to your `.env` file:

```env
MASTER_SECRET_KEY=your-super-secret-master-key-change-this-in-production
```

## API Endpoints

### Base URL

``` bash
POST /api/v1/internal/admin
GET /api/v1/internal/admin
DELETE /api/v1/internal/admin/:id
```

### Headers Required

``` bash
x-master-setup-secret: your-master-secret-key
Content-Type: application/json
```

## Endpoints

### 1. Create Master Admin Account

**POST** `/api/v1/internal/admin`

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "securepassword123",
  "role": "ADMIN",
  "isActive": true
}
```

**Response (201 Created):**

```json
{
  "status": 201,
  "message": "Master admin account created successfully",
  "data": {
    "id": 1,
    "email": "admin@example.com",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

- `400` - Invalid request data
- `401` - Invalid or missing master secret
- `409` - Account already exists
- `500` - Internal server error

### 2. Get All Admin Accounts

**GET** `/api/v1/internal/admin`

**Response (200 OK):**

```json
{
  "status": 200,
  "message": "Admin accounts retrieved successfully",
  "data": [
    {
      "id": 1,
      "email": "admin@example.com",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 3. Delete Admin Account

**DELETE** `/api/v1/internal/admin/:id`

**Response (200 OK):**

```json
{
  "status": 200,
  "message": "Admin account deleted successfully",
  "data": null
}
```

**Error Responses:**

- `400` - Invalid account ID or account type
- `401` - Invalid or missing master secret
- `404` - Account not found
- `500` - Internal server error

## Usage Examples

### Using curl

```bash
# Create master admin
curl -X POST http://localhost:3000/api/v1/internal/admin \
  -H "Content-Type: application/json" \
  -H "x-master-setup-secret: your-master-secret-key" \
  -d '{
    "email": "admin@example.com",
    "password": "securepassword123",
    "role": "ADMIN",
    "isActive": true
  }'

# Get all admin accounts
curl -X GET http://localhost:3000/api/v1/internal/admin \
  -H "x-master-setup-secret: your-master-secret-key"

# Delete admin account
curl -X DELETE http://localhost:3000/api/v1/internal/admin/1 \
  -H "x-master-setup-secret: your-master-secret-key"
```

### Using JavaScript/Node.js

```javascript
const axios = require('axios');

const headers = {
  'Content-Type': 'application/json',
  'x-master-setup-secret': 'your-master-secret-key'
};

// Create admin
const createAdmin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/internal/admin', {
      email: 'admin@example.com',
      password: 'securepassword123',
      role: 'ADMIN',
      isActive: true
    }, { headers });
    
    console.log('Admin created:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};

createAdmin();
```

## Security Considerations

1. **Change the default secret**: Always change `MASTER_SECRET_KEY` in production
2. **Use HTTPS**: Only use these endpoints over HTTPS in production
3. **Network isolation**: Consider restricting access to internal networks only
4. **Monitor logs**: Check server logs for unauthorized access attempts
5. **Rotate secrets**: Regularly rotate the master secret key
6. **Limit usage**: Only use these endpoints for initial setup or emergency access

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_MASTER_SECRET` | Invalid or missing master setup secret |
| `UNAUTHORIZED_INTERNAL_ACCESS` | Unauthorized access attempt |
| `INTERNAL_AUTH_ERROR` | Internal server error during authentication |
| `INVALID_REQUEST_DATA` | Invalid request body data |
| `INVALID_ACCOUNT_ID` | Invalid account ID format |
| `ACCOUNT_ALREADY_EXISTS` | Email already exists in database |
| `ACCOUNT_NOT_FOUND` | Account with specified ID not found |
| `INVALID_ACCOUNT_TYPE` | Attempted to delete non-admin account |
| `INTERNAL_SERVICE_ERROR` | Internal service operation failed |
| `INTERNAL_SERVER_ERROR` | Unexpected server error |

## Logging

All internal API access is logged with:

- HTTP method and path
- Client IP address
- User-Agent string
- Timestamp

Example log entry:

``` bash
[INTERNAL API ACCESS] POST /api/v1/internal/admin - IP: 192.168.1.100 - UA: curl/7.68.0
```
