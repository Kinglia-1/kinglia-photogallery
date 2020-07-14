## Server API

### Get Room's Photo Gallery
  * GET `/api/rooms/{room_id}/photos`

**Path Parameters:**
  * `room_id` room's id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "room_id": "Number",
      "room_photos": [
        {
        "photoId": "String",
        "photoUrl": "String",
        "photoName": "String",
        "description": "String"
        },
      ],
    }
```

### Add Photos To The Room's Photo Gallery
  * POST `/api/rooms/{room_id}/photos`

**Path Parameters:**
  * `room_id` room's id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    { "room_Id": "Number",
      "photos":[
        {
          "photoUrl": "String",
          "photoName": "String",
          "description": "String",
        }
      ]
    }
```


### Update/Replace One Photo
  * PUT `/api/rooms/{room_id}/photos/{photo_id}`

**Path Parameters:**
  * `room_id` room's id
  * `photo_id` Photo's Id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
        "photoUrl": "String",
        "photoName": "String",
        "description": "String"
    }
```

### Delete One Photo
  * DELETE `/api/rooms/{room_id}/photos/{photo_id}`

**Path Parameters:**
  * `room_id` room's id
  * `photo_id` photo's id
**Success Status Code:** `204`



